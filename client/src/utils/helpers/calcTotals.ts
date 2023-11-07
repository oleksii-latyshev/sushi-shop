import { SushiCart } from '@/types/sushi.types';

export const calcTotalPrice = (items: SushiCart[]) => {
  return items.reduce(
    (sumPrice, item) => item.variants[item.variant].price * item.inCartCount + sumPrice,
    0
  );
};

export const calcTotalCount = (items: SushiCart[]) => {
  return items.reduce((sumCount, item) => sumCount + item.inCartCount, 0);
};
