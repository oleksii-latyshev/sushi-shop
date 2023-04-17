import type { InitialStateOptions } from '../store/slices/optionsSlice';

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
}
