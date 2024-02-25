import React, { useMemo } from 'react';
import {
  Paragraph,
  Skia,
  TextHeightBehavior,
  SkTypefaceFontProvider,
} from '@shopify/react-native-skia';

import { Size, TextProps } from '../types';

export function TextView({
  params,
  text,
  font,
}: {
  params: TextProps;
  text: string;
  size: Size;
  font: SkTypefaceFontProvider | null;
}) {
  const paragraph = useMemo(() => {
    if (!font) {
      return null;
    }

    const p = Skia.ParagraphBuilder.Make(
      {
        textAlign: params.textAlign,
        textStyle: {
          color: Skia.Color(params.fill),
          fontFamilies: [params.fontFamily],
          fontSize: params.fontSize,
        },
        textHeightBehavior: TextHeightBehavior.All,
      },
      font,
    )
      .addText(text)
      .build();

    p.layout(params.width);

    return p;
  }, [font, params]);

  return (
    <Paragraph
      paragraph={paragraph}
      x={params.left}
      y={params.top}
      width={params.width}
    />
  );
}
