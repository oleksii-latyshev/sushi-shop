import { model, Schema } from 'mongoose';

import { IUser } from '@/types/user.types';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model<IUser>('User', userSchema);
