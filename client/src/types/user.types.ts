export interface IUser {
  _id: string;
  username: string;
  password: string;
  name: string;
}

export type ILoginUser = Pick<IUser, 'username' | 'password'>;
