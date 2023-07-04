import { IOrder, IProduct } from '@/types';

import { api } from './api';

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<IOrder, IProduct[]>({
      query: (products) => ({
        url: '/orders',
        method: 'POST',
        credentials: 'include',
        body: {
          products,
        },
      }),
      invalidatesTags: () => [
        {
          type: 'order',
        },
      ],
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
