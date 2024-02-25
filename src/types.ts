import { Color, GradientProps, TextAlign } from '@shopify/react-native-skia';

export interface Position {
  x: number;
  y: number;
}

export interface TextStyle {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  fontWeight: number;
  color: string;
  position: Position;
}

export const sizes = [
  '735_1102',
  '1200_1200',
  '1200_628',
  '1024_768',
  '1080_1920',
] as const;
export type SizeId = (typeof sizes)[number];

export type Size = {
  label: {
    title: string;
    desc: string;
  };
  height: number;
  width: number;
  ratio: number;
  id: SizeId;
};

export const filterName = [
  'blendcolor',
  'grayscale',
  'sepia',
  'brightness',
  'contrast',
  'saturation',
  'pixelate',
  'blur',
] as const;

export type FilterName = (typeof filterName)[number];

export type FilterVariant = {
  id: string;
  name: FilterName;
  value?: number;
  color?: string;
};

export interface TextProps {
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: number;
  fontFamily: string;
  width: number;
  height: number;
  top: number;
  left: number;
  textAlign: TextAlign;
  fill: Color;
}

export interface Variant {
  id: string;
  title: TextProps;
  description: TextProps;
  backdrop?: { color: Color } | GradientProps;
  filter?: FilterVariant;
}

export type TextVariants = {
  [key in SizeId]: Array<{
    title: TextProps;
    description: TextProps;
    backId?: string;
  }>;
};

export interface ImageItem {
  name: string;
  img: HTMLImageElement;
}

export type FindObjParams = { type?: string; id: string };
