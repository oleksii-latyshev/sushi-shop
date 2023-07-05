import { IUser } from '@/types/user.types';

export const createResponseUser = ({
  favorites,
  username,
  name,
  _id,
}: IUser): Pick<IUser, 'username' | 'name' | '_id' | 'favorites'> => {
  return { username, name, _id, favorites };
};
