import React from 'react';
import { Image, Skia, useImage } from '@shopify/react-native-skia';

interface Props {
  base64: string;
  canvasSize: { width: number; height: number };
}

export function ImageView({ base64, canvasSize }: Props) {
  const data = Skia.Data.fromBase64(
    base64.replace('data:image/png;base64,', ''),
  );
  const image = Skia.Image.MakeImageFromEncoded(data);

  if (!image) {
    return null;
  }

  return (
    <Image
      image={image}
      fit="cover"
      x={0}
      y={0}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  );
}
