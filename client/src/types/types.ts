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
  byProperty: 'rating' | 'name' | '-price' | 'price';
}

export interface QueryParams {
  sortProperty: string;
  categoryId: number;
  page: number;
}
