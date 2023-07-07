export interface ICategory {
  id: string;
  name: string;
}

export interface ISort {
  name: string;
  byProperty: 'rating' | 'name' | '-price' | 'price';
}

export interface QueryParams {
  sortProperty: string;
  categoryId: ICategory['id'];
  page: number;
}
