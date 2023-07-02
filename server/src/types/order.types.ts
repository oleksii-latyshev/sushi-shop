import { ISushi } from './sushi.types';
import { IUser } from './user.types';

export type IStatusOrder = 'accepted' | 'completed';

export interface IOrder {
  user: Pick<IUser, '_id'>;
  products: [_id: Pick<ISushi, '_id'>];
  totalPrice: number;
  status: IStatusOrder;
  createdAt: Date;
  updatedAt: Date;
}

export type ICreateOrder = Pick<IOrder, 'user' | 'products' | 'totalPrice'>;
