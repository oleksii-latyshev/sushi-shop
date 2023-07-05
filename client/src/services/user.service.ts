import { ISushi } from '@/types/sushi.types';
import { IResponseUser } from '@/types/user.types';

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
    toggleWishlistItem: builder.mutation<IResponseUser, string>({
      query: (id) => ({
        url: '/users/wishlist',
        method: 'PATCH',
        credentials: 'include',
        body: {
          sushiId: id,
        },
      }),
      invalidatesTags: () => [
        {
          type: 'wishlist',
        },
      ],
    }),
  }),
});

export const { useGetWishlistQuery, useToggleWishlistItemMutation } = userApi;
