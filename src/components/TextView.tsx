import React, { useEffect, useMemo } from 'react';
import {
  Paragraph,
  Skia,
  TextHeightBehavior,
  SkTypefaceFontProvider,
  TextBaseline,
} from '@shopify/react-native-skia';

import { TextProps } from '../types';

export function TextView({
  params,
  canvasSize,
  text,
  font,
}: {
  params: TextProps;
  text: string;
  canvasSize: { width: number; height: number };
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
          textBaseline: TextBaseline.Alphabetic,
          backgroundColor: Skia.Color('rgba(0, 0, 0, 0.3)'),
        },
        textHeightBehavior: TextHeightBehavior.All,
      },
      font,
    )
      .addText(text)
      .build();

    p.layout(params.width);

    return p;
  }, [font, params, text]);

  const x = Math.max(0, Math.min(params.left, canvasSize.width - params.width));
  const y = Math.max(
    0,
    Math.min(params.top, canvasSize.height - params.height),
  );

  return <Paragraph x={x} y={y} paragraph={paragraph} width={params.width} />;
}
