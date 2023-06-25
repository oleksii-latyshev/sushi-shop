import { IUser } from '@/types/user.types';

export const createResponseUser = ({
  username,
  name,
  _id,
}: IUser): Pick<IUser, 'username' | 'name' | '_id'> => {
  return { username, name, _id };
};
