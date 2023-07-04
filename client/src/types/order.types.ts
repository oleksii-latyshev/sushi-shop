export type IStatusOrder = 'accepted' | 'completed';

export interface IProduct {
  sushiId: string;
  variant: number;
  count: number;
}

export interface IOrder {
  user: string;
  products: IProduct[];
  totalPrice: number;
  status: IStatusOrder;
  createdAt: Date;
  updatedAt: Date;
}
