import { PropsWithChildren } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useElementsContext } from '../contexts/EditorElementsContext';

interface GestureHandlerProps {
  debug?: boolean;
}

export const GestureHandler = ({
  children,
}: PropsWithChildren<GestureHandlerProps>) => {
  const { setNextVariant } = useElementsContext();
  const shiftHorizontal = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange(event => {
      shiftHorizontal.value = event.translationX;
    })
    .onEnd(event => {
      if (event.translationX < -100) {
        runOnJS(setNextVariant)();
        shiftHorizontal.value = withSequence(
          withTiming(-500, { duration: 100 }),
          withTiming(500, { duration: 0 }),
          withTiming(0, { duration: 100 }),
        );
      } else {
        shiftHorizontal.value = withTiming(0, { duration: 100 });
      }
    });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shiftHorizontal.value,
        },
        {
          rotate: `${shiftHorizontal.value / 5000}rad`,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={style}>{children}</Animated.View>
    </GestureDetector>
  );
};
