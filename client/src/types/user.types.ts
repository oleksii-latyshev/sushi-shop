export interface IUser {
  _id: string;
  username: string;
  password: string;
  name: string;
}

export type IResponseUser = Omit<IUser, 'password'>;

export type ILoginUser = Pick<IUser, 'username' | 'password'>;
