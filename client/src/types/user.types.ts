export interface IUser {
  _id: string;
  username: string;
  password: string;
  name: string;
  favorites: string[];
}

export type ILoginUser = Pick<IUser, 'username' | 'password'>;
export type IRegisterUser = Pick<IUser, 'username' | 'name' | 'password'>;
