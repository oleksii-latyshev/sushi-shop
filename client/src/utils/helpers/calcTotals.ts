import type { SushiCart } from '../../types';

export const calcTotalPrice = (items: SushiCart[]) => {
  return items.reduce((sumPrice, item) => item.price * item.inCartCount + sumPrice, 0);
};

export const calcTotalCount = (items: SushiCart[]) => {
  return items.reduce((sumCount, item) => sumCount + item.inCartCount, 0);
};
