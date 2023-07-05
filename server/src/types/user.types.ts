import { Document, ObjectId } from 'mongoose';

import { ISushi } from './sushi.types';

export interface IUser extends Document {
  _id: ObjectId;
  username: string;
  password: string;
  name: string;
  favorites: string[];
}

export interface IUserWithSushi extends Omit<IUser, 'favorites'> {
  favorites: ISushi[];
}
