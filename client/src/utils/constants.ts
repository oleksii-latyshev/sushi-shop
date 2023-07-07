import type { ISort } from '@/types/options.types';

export const sortOptions: ISort[] = [
  { name: 'рейтингу', byProperty: 'rating' },
  { name: 'алфавіту', byProperty: 'name' },
  { name: 'спадання ціни', byProperty: '-price' },
  { name: 'зростання ціни', byProperty: 'price' },
];

export const sushiLimitOnPage = 8;

export const BASE_URL = 'http://localhost:3001/api/';
