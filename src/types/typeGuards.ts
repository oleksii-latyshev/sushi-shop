import type { ICategory, Sushi } from './types';

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
