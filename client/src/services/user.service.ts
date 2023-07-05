import { ISushi } from '@/types/sushi.types';

import { api } from './api';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<ISushi[], null>({
      query: () => ({
        url: '/users/wishlist',
        credentials: 'include',
      }),
      providesTags: (result, error) => [
        {
          type: 'wishlist',
        },
      ],
    }),
  }),
});

export const { useGetWishlistQuery } = userApi;
