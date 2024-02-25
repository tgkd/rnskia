import React from 'react';
import { Canvas, Image, useImage } from '@shopify/react-native-skia';

export function EditorBackground() {
  const bgImage = false;

  if (bgImage) {
    return (
      <ImageBackgorund
        path={require('../../assets/images/bg.png')}
        width={375}
        height={812}
      />
    );
  }

  return 
}

function ImageBackgorund({
  path,
  width,
  height,
}: {
  path: string;
  width: number;
  height: number;
}) {
  const image = useImage(require(path));

  if (!image) {
    return null;
  }

  return (
    <Image
      image={image}
      x={0}
      y={0}
      width={width}
      height={height}
      fit="cover"
    />
  );
}
