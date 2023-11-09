import { ICategory } from './options.types';
import { IOrder } from './order.types';
import { ISushi } from './sushi.types';
import { IUser } from './user.types';

export interface IResponseSushi {
  sushi: ISushi[];
  totalPages: number;
  currentPage: number;
}

export type IResponseUser = Omit<IUser, 'password'>;

export type ICategoryResponse = Omit<ICategory, 'id'> & { _id: string };

export interface IBadResponse {
  message: string;
}

export interface IResponseError {
  data: IBadResponse;
  status: number;
}

export interface IResponseAllOrderRequest {
  orders: IOrder[];
  totalPages: number;
  currentPage: number;
}

export const isBadResponse = (arg: unknown): arg is IBadResponse => {
  if (arg && typeof arg === 'object') {
    return 'message' in arg;
  }
  return false;
};

export const isResponseError = (error: unknown): error is IResponseError => {
  return (
    error !== null &&
    typeof error === 'object' &&
    'data' in error &&
    error.data !== null &&
    typeof error.data === 'object' &&
    'message' in error.data &&
    typeof error.data.message === 'string'
  );
};
