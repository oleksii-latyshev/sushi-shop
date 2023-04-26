import type { ICategory, Sushi, SushiCart } from '../types/types';

export const isSushi = (arg: unknown): arg is Sushi => {
  if (arg && typeof arg === 'object') {
    return 'id' in arg && 'name' in arg;
  }
  return false;
};

export const isArraySushi = (arg: unknown): arg is Sushi[] => {
  if (!Array.isArray(arg)) {
    return false;
  }

  return arg.every((item) => {
    return (
      typeof item === 'object' &&
      item !== null &&
      (item as Sushi).id !== undefined &&
      typeof (item as Sushi).id === 'number' &&
      typeof (item as Sushi).name === 'string'
    );
  });
};

export const isArrayCategories = (arg: unknown): arg is ICategory[] => {
  if (!Array.isArray(arg)) {
    return false;
  }

  return arg.every((item) => {
    return (
      typeof item === 'object' &&
      item !== null &&
      (item as ICategory).id !== undefined &&
      typeof (item as ICategory).id === 'number' &&
      typeof (item as ICategory).name === 'string'
    );
  });
};

export const isSushiCart = (arg: unknown): arg is SushiCart => {
  if (arg && typeof arg === 'object') {
    return 'id' in arg && 'count' in arg;
  }
  return false;
};
