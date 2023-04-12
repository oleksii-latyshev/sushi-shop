import type { Food } from './types';

export const isArrayFoods = (arg: unknown): arg is Food[] => {
  if (!Array.isArray(arg)) {
    return false;
  }

  return arg.every((item) => {
    return (
      typeof item === 'object' &&
      item !== null &&
      (item as Food).id !== undefined &&
      typeof (item as Food).id === 'number' &&
      typeof (item as Food).name === 'string'
    );
  });
};
