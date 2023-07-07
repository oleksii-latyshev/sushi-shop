import type { ISort } from '@/types/options.types';

export const sortOptions: ISort[] = [
  { name: 'рейтингом', byProperty: 'rating' },
  { name: 'алфавітом', byProperty: 'name' },
  { name: 'спаданням ціни', byProperty: '-price' },
  { name: 'зростанням ціни', byProperty: 'price' },
];

export const sushiLimitOnPage = 8;

export const BASE_URL = 'http://localhost:3001/api/';
