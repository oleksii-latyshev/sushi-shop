import type { InitialStateCart } from '../store/slices/cartSlice';
import type { InitialStateOptions } from '../store/slices/optionsSlice';
import type { InitialStateSushi } from '../store/slices/sushiSlice';

export interface Sushi {
  id: number;
  name: string;
  price: number;
  counts: number[];
  weight: number;
  img: string;
  category: number;
  rating: number;
}

export interface SushiCart extends Pick<Sushi, 'id' | 'name' | 'price' | 'img' | 'category'> {
  count: number;
  inCartCount: number;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ISort {
  name: string;
  byProperty: string;
}

export interface IState {
  options: InitialStateOptions;
  cart: InitialStateCart;
  sushi: InitialStateSushi;
}

export interface QueryParams {
  sortProperty: string;
  categoryId: number;
  page: number;
}
