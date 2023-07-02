import { Document, ObjectId } from 'mongoose';

import { ISushi } from './sushi.types';

export type IStatusOrder = 'accepted' | 'completed';

export interface IProduct {
  sushiId: Pick<ISushi, '_id'>;
  count: number;
}

export interface IOrder extends Document {
  user: ObjectId; // ? почему при сравнении ид настоящего пользователя с Pick<IUser, '_id'> ошибка типизации...
  products: IProduct[];
  totalPrice: number;
  status: IStatusOrder;
  createdAt: Date;
  updatedAt: Date;
}

export type ICreateOrder = Pick<IOrder, 'user' | 'products' | 'totalPrice'>;
