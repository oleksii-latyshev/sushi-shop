import type { InitialStateCart } from '../../store/slices/cartSlice';
import type { SushiCart } from '../../types';
import { calcTotalCount, calcTotalPrice } from './calcTotals';

export const getCartFromLocalStorage: () => InitialStateCart = () => {
  const data = localStorage.getItem('cart');
  const sushi = (data ? JSON.parse(data) : []) as SushiCart[];
  const totalCount = calcTotalCount(sushi);
  const totalPrice = calcTotalPrice(sushi);

  return {
    sushi,
    totalCount,
    totalPrice,
  };
};
