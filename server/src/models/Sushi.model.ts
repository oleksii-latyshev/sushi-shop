import sushiSchema from '@/db/schemas/sushi.schema';
import { ISushi, ISushiReview } from '@/types/sushi.types';

export interface IQuery {
  name?: { $regex: RegExp } | string;
  category?: string;
}

export interface IFindAllArg {
  query: IQuery;
  sort: ISortSushi;
  limit: number;
  page: number;
}

export interface ISortSushi {
  [key: string]: 1 | -1;
}

export class Sushi {
  public static async findAll({ query, sort, limit, page }: IFindAllArg): Promise<ISushi[]> {
    return await sushiSchema.aggregate([
      {
        $match: query,
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
          averagePrice: { $avg: '$variants.price' },
        },
      },
      {
        $sort: sort,
      },
      {
        $skip: (+page - 1) * +limit,
      },
      {
        $limit: +limit * 1,
      },
    ]);
  }
  public static findById(id: Pick<ISushi, '_id'> | string): Promise<ISushi | null> | null {
    try {
      return sushiSchema.findById(id).populate('reviews.userId', 'name');
    } catch (error) {
      console.log('get sushi by id:', error);
      return null;
    }
  }
  public static async addReviewById(
    id: Pick<ISushi, '_id'> | string,
    review: ISushiReview
  ): Promise<ISushi | null> {
    try {
      const existedSushi = (await Sushi.findById(id)) as ISushi;

      existedSushi.reviews.push(review);

      return existedSushi.save();
    } catch (error) {
      console.error('add review model: ', error);
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
