
export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function uniqueRandom(min: number, max: number): () => number {
  let previousValue: number;

  return function random(): number {
    const number = Math.floor(Math.random() * (max - min + 1) + min);
    previousValue = number === previousValue && min !== max ? random() : number;
    return previousValue;
  };
}

export function uniqueRandomArray<T = string[]>(array: T[]): () => T {
  const random = uniqueRandom(0, array.length - 1);
  return () => array[random()];
}

export function clamp(val: number, low: number, up: number): number {
  return Math.max(low, Math.min(val, up));
}

export function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export function getFileExt(file: string): string {
  return file.substring(file.lastIndexOf('.') + 1, file.length);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export function blobToBase64(blob: Blob): Promise<string> {
  return blobToDataUrl(blob).then(text => text.slice(text.indexOf(',')));
}