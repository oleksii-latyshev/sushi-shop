export type IStatusOrder = 'accepted' | 'completed';

export interface IProduct {
  sushiId: string;
  variant: number;
  count: number;
}

export interface IOrder {
  _id: string;
  user: string;
  products: IProduct[];
  totalPrice: number;
  status: IStatusOrder;
  createdAt: string;
  updatedAt: string;
}

export interface IResponseAllOrderRequest {
  orders: IOrder[];
  totalPages: number;
  currentPage: number;
}

export interface IRequestAllOrder {
  page?: number;
  limit?: number;
  sort?: 'createdAt' | 'totalPrice';
  order?: 'asc' | 'desc';
}
