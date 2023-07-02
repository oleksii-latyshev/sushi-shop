import sushiSchema from '@/db/schemas/sushi.schema';
import { ISushi } from '@/types/sushi.types';

export class Sushi {
  public static findById(id: Pick<ISushi, '_id'> | string): Promise<ISushi | null> | null {
    try {
      return sushiSchema.findById(id);
    } catch (error) {
      console.log('get sushi by id:', error);
      return null;
    }
  }
}
