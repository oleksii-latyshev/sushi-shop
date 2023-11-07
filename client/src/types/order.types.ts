import { ISushi } from './sushi.types';

export type IStatusOrder = 'accepted' | 'completed';

export interface IProduct {
  sushiId: string;
  variant: number;
  count: number;
}

export interface IResponseProduct extends Omit<IProduct, 'sushiId'> {
  sushiId: ISushi;
}

export interface IOrder {
  _id: string;
  user: string;
  products: IResponseProduct[];
  totalPrice: number;
  status: IStatusOrder;
  createdAt: string;
  updatedAt: string;
}

export interface IRequestAllOrder {
  page?: number;
  limit?: number;
  sort?: 'createdAt' | 'totalPrice';
  order?: 'asc' | 'desc';
}
