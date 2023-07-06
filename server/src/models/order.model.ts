import { ObjectId, SortOrder } from 'mongoose';

import orderSchema from '@/db/schemas/order.schema';
import { ICreateOrder, IOrder } from '@/types/order.types';

interface IOptionAllOrders {
  page: number;
  limit: number;
  sort: string | 'createdAt' | 'updatedAt' | 'totalPrice';
  orderValue: SortOrder;
}

export interface IQuery {
  status?: string;
  category?: string;
}

export class Order {
  public static create(data: ICreateOrder): Promise<IOrder> | null {
    try {
      return orderSchema.create({ ...data });
    } catch (error) {
      return null;
    }
  }
  public static async deleteById(id: string): Promise<IOrder | null> {
    try {
      const existedOrder = await Order.findById(id);
      return existedOrder && (await existedOrder.deleteOne());
    } catch (error) {
      return null;
    }
  }
  public static findAllByUserId(
    user: ObjectId,
    query: IQuery,
    options: IOptionAllOrders
  ): Promise<IOrder[]> | null {
    const { page, limit, sort, orderValue } = options;
    try {
      return orderSchema
        .find({ user, ...query })
        .populate('products.sushiId')
        .sort({ [sort as string]: orderValue })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
    } catch (error) {
      console.error('get all order by user id', error);
      return null;
    }
  }
  public static findById(id: string): Promise<IOrder | null> | null {
    try {
      return orderSchema.findById(id);
    } catch (error) {
      console.error('get order by id', error);
      return null;
    }
  }
  public static findByIdAndUpdate(
    id: string,
    updatedData: IOrder
  ): Promise<Order | null> | null {
    try {
      return orderSchema.findByIdAndUpdate(id, updatedData, { new: true });
    } catch (error) {
      console.error(`find by id and update, id=${id}`, error);
      return null;
    }
  }

  public static count(query: IQuery): Promise<number> | number {
    try {
      return orderSchema.countDocuments(query);
    } catch (error) {
      console.error('get total order', error);
      return 0;
    }
  }
}
