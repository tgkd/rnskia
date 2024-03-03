import React from 'react';
import {
  Color,
  Fill,
  GradientProps,
  LinearGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';

import { Variant } from '../types';

const isGradientProps = (value: any): value is GradientProps => {
  return value.colors !== undefined;
};

export function ColorBackdropView({
  params,
  canvasSize: { width, height },
}: {
  canvasSize: { width: number; height: number };
  params: Variant['backdrop'];
}) {
  if (!params) {
    return null;
  }

  if (isGradientProps(params)) {
    return (
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={params.colors}
        />
      </Rect>
    );
  }

  return <Fill color={params.color} />;
}
