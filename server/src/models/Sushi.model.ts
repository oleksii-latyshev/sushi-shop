import { SortOrder } from 'mongoose';

import sushiSchema from '@/db/schemas/sushi.schema';
import { ISushi } from '@/types/sushi.types';

export interface IQuery {
  name?: { $regex: RegExp } | string;
  category?: string;
}

export interface IFindAllArg {
  sort: string;
  orderValue: SortOrder;
  limit: number;
  page: number;
}

export class Sushi {
  public static async findAll(
    query: IQuery,
    { sort, orderValue, limit, page }: IFindAllArg
  ): Promise<ISushi[]> {
    return sushiSchema
      .find(query)
      .sort({ [sort as string]: orderValue })
      .limit(+limit * 1)
      .skip((+page - 1) * +limit)
      .exec();
  }
  public static findById(id: Pick<ISushi, '_id'> | string): Promise<ISushi | null> | null {
    try {
      return sushiSchema.findById(id);
    } catch (error) {
      console.log('get sushi by id:', error);
      return null;
    }
  }

  public static count(query: IQuery): Promise<number> | number {
    try {
      return sushiSchema.countDocuments(query);
    } catch (error) {
      console.error('count sushi', error);
      return 0;
    }
  }
}
