import { Document } from 'mongoose';

import { ISushi } from './sushi.types';
import { IUser } from './user.types';

export type IStatusOrder = 'accepted' | 'completed';

export interface IProduct {
  sushiId: Pick<ISushi, '_id'>;
  count: number;
}

export interface IOrder extends Document {
  user: Pick<IUser, '_id'>;
  products: IProduct[];
  totalPrice: number;
  status: IStatusOrder;
  createdAt: Date;
  updatedAt: Date;
}

export type ICreateOrder = Pick<IOrder, 'user' | 'products' | 'totalPrice'>;
