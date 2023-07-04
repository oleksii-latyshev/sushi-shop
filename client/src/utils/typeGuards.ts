import type { ISushi, SushiCart } from '@/types';
import type { ICategory } from '@/types/options.types';

export const isSushi = (arg: unknown): arg is ISushi => {
  if (arg && typeof arg === 'object') {
    return 'id' in arg && 'name' in arg;
  }
  return false;
};

export const isArraySushi = (arg: unknown): arg is ISushi[] => {
  if (!Array.isArray(arg)) {
    return false;
  }

  return arg.every((item) => {
    return (
      typeof item === 'object' &&
      item !== null &&
      (item as ISushi)._id !== undefined &&
      typeof (item as ISushi)._id === 'number' &&
      typeof (item as ISushi).name === 'string'
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
    return '_id' in arg;
  }
  return false;
};
