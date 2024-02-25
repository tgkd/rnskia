import { createEffect, createEvent, createStore, sample } from 'effector';
import { shuffle } from 'lodash-es';

import { Size, Variant } from '../types';
import { nonNullable, uniqueRandomArray } from '../helpers';
import { State, configData } from './appConfigData';

const fetchConfigFx = createEffect((): State => {
  return configData;
});

const resetConfig = createEvent();

const $config = createStore<State>({
  fonts: [],
  sizes: [],
  textVariants: null,
  backdropVariants: [],
  filterVariants: [],
})
  .on(fetchConfigFx.done, (_, { result }) => result)
  .on(fetchConfigFx.fail, (state, error) => {
    console.log('Failed to load config', error);
    return state;
  })
  .reset(resetConfig);

const changeSize = createEvent<Size>();
const $activeSize = createStore<Size | null>(null).on(
  changeSize,
  (_, size) => size,
);

const updateVariants = createEvent<Variant[]>();
const updateVariantsWithReset = createEvent<Variant[]>();
const updateColorFilters = createEvent<string[]>();
const resetVariants = createEvent<void>();

const $allVariants = createStore<Variant[]>([])
  .on(updateVariants, (state, variants) => [...state, ...variants])
  .on(updateVariantsWithReset, (_, variants) => variants)
  .on(updateColorFilters, (state, colors) => {
    const randomColor = uniqueRandomArray(colors);

    return state.map(v =>
      v.filter?.name === 'blendcolor'
        ? { ...v, filter: { ...v.filter, color: randomColor() } }
        : v,
    );
  });

sample({
  source: { size: $activeSize, config: $config },
  clock: changeSize,
  target: updateVariantsWithReset,
  fn: ({ config, size }) => {
    if (!config.textVariants || !size?.id) {
      return [];
    }
    const textVariantsBySize = shuffle(config.textVariants[size.id]);

    if (!textVariantsBySize) {
      return [];
    }

    const textBkgIds = textVariantsBySize
      .map(({ backId }) => backId)
      .filter(nonNullable);

    const filters = uniqueRandomArray(config.filterVariants);
    const texts = uniqueRandomArray(textVariantsBySize);
    const backdropIds = uniqueRandomArray(
      config.backdropVariants
        .map(({ id }, idx) => (textBkgIds.includes(id) ? null : idx))
        .filter(nonNullable),
    );

    const result: Variant[] = [];

    for (
      let i = 0;
      i < textVariantsBySize.length * config.filterVariants.length;
      i += 1
    ) {
      const txt = texts();
      const filter = filters();
      const backdropById = config.backdropVariants.find(
        bkg => bkg.id === txt.backId,
      );
      const backdrop = backdropById || config.backdropVariants[backdropIds()];

      result.push({
        ...txt,
        id: `${i}_${size.id}_${filter.id}`,
        filter,
        backdrop: backdrop as any,
      });
    }

    return result;
  },
});

sample({
  clock: fetchConfigFx.doneData,
  target: changeSize,
  fn: ({ sizes }) => sizes[0],
  filter: ({ sizes }) => sizes.length > 0,
}); 

export {
  $activeSize,
  changeSize,
  updateVariants,
  updateColorFilters,
  resetVariants,
  $allVariants,
  fetchConfigFx,
  resetConfig,
  $config
};
