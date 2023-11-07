import type { InitialStateCart } from '@/store/slices/cart.slice';
import { SushiCart } from '@/types/sushi.types';

import { calcTotalCount, calcTotalPrice } from './calcTotals';

export const getCartFromLocalStorage: () => InitialStateCart = () => {
  const data = localStorage.getItem('cart');

  const cartSushi = (data ? JSON.parse(data) : []) as SushiCart[];
  const totalCount = calcTotalCount(cartSushi);
  const totalPrice = calcTotalPrice(cartSushi);

  return {
    cartSushi,
    totalCount,
    totalPrice,
  };
};
