import orderSchema from '@/db/schemas/order.schema';
import { ICreateOrder, IOrder } from '@/types/order.types';

export class Order {
  public static create(data: ICreateOrder): Promise<IOrder> | null {
    try {
      return orderSchema.create({ ...data });
    } catch (error) {
      return null;
    }
  }
}
