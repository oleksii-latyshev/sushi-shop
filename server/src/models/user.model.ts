import { ObjectId } from 'mongoose';

import userSchema from '@/db/schemas/user.schema';
import { ISushi } from '@/types/sushi.types';
import { IUser, IUserWithSushi } from '@/types/user.types';

export class User {
  public static updateById(id: ObjectId, body: Partial<IUser>): Promise<IUser | null> {
    return userSchema.findByIdAndUpdate(id, body);
  }
  public static async getWishlist(id: ObjectId): Promise<ISushi[] | null> {
    try {
      const existedUser = (await userSchema
        .findById(id)
        .populate('favorites')) as IUserWithSushi;
      return existedUser?.favorites;
    } catch (error) {
      console.error('get wishlist: ', error);
      return null;
    }
  }
  public static async toggleWishlistById(
    userId: ObjectId,
    sushiId: string
  ): Promise<IUser | null> {
    try {
      const existedUser = await userSchema.findById(userId);

      if (!existedUser) {
        return null;
      }

      const favorites = existedUser.favorites;

      const sushiIndex = favorites.indexOf(sushiId);

      if (sushiIndex !== -1) {
        favorites.splice(sushiIndex, 1);
      } else {
        favorites.push(sushiId);
      }

      return existedUser.save();
    } catch (error) {
      console.error('update wishlist: ', error);
      return null;
    }
  }
}
