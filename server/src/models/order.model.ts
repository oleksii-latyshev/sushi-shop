import orderSchema from '@/db/schemas/order.schema';
import { ICreateOrder, IOrder, IStatusOrder } from '@/types/order.types';
import { IUser } from '@/types/user.types';

interface IOptionAllOrders {
  page: number;
  limit: number;
  sort?: string | 'createdAt' | 'updatedAt' | 'totalPrice';
  order?: string | 'asc' | 'desc';
  status?: string | IStatusOrder;
}

interface Query {
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
  public static findAllByUserId(
    user: Pick<IUser, '_id'>,
    options: IOptionAllOrders
  ): Promise<IOrder[]> | null {
    const { page, limit, sort, order, status } = options;
    try {
      const orderValue = order === 'asc' ? 1 : order === 'desc' ? -1 : -1;
      const query: Query = {};
      if (status) {
        query.status = status;
      }

      return orderSchema
        .find({ user })
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

  public static totalCount(): Promise<number> | number {
    try {
      return orderSchema.countDocuments();
    } catch (error) {
      console.error('get total order', error);
      return 0;
    }
  }
}
