import type { ISort } from '../types';

export const sortOptions: ISort[] = [
  { name: 'рейтингу', byProperty: 'rating' },
  { name: 'алфавиту', byProperty: 'name' },
  { name: 'убыванию цены', byProperty: '-price' },
  { name: 'возрастанию цены', byProperty: 'price' },
];

export const sushiLimitOnPage = 8;

export const BASE_URL = 'http://localhost:3000';
