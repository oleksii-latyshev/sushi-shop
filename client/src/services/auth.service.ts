import { ILoginUser, IUser } from '@/types/user.types';

import { api } from './api';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUser, ILoginUser>({
      query: ({ ...body }) => ({ url: 'auth/signIn', method: 'POST', body }),
      // transformResponse: (response: { data: IUser }) => response.data,
    }),
  }),
});

export const { useLoginMutation } = authApi;
