import type { ReactNode, FC } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  fitbox,
  processTransform2d,
  rect,
  type SkSize,
} from '@shopify/react-native-skia';
import { useUnit } from 'effector-react';

import { $activeSize, $allVariants } from '../state/variants';
import { Size, Variant } from '../types';

export interface ElementProps {}

export interface Element {
  Component: FC<ElementProps>;
  size: SkSize;
}

const ElementsContext = createContext<{
  size: Size | null;
  variant: Variant | null;
  setNextVariant: () => void;
} | null>(null);

interface ProviderProps {
  children: ReactNode | ReactNode[];
}

export const ElementsProvider = ({ children }: ProviderProps) => {
  const size = useUnit($activeSize);
  const variants = useUnit($allVariants);
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (variants.length > 0 && size && variant === null) {
      setVariant(variants[0]);
    }
  }, [variants, size]);

  const setNextVariant = () => {
    const nextIdx =
      variants.findIndex(v => variant?.id && v?.id === variant?.id) + 1;
    setVariant(variants[nextIdx] ?? variants[0]);
  };

  return (
    <ElementsContext.Provider
      value={{
        size,
        variant,
        setNextVariant,
      }}>
      {children}
    </ElementsContext.Provider>
  );
};

export const useElementsContext = () => {
  const ctx = useContext(ElementsContext);
  if (ctx === null) {
    throw new Error('useElementsContext must be used within ElementsProvider');
  }
  return ctx;
};
