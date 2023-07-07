import { IResponseUser } from '@/types/response.types';
import { ISushi } from '@/types/sushi.types';

import { api } from './api';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<ISushi[], null>({
      query: () => ({
        url: '/users/wishlist',
        credentials: 'include',
      }),
      providesTags: [
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
      invalidatesTags: [
        {
          type: 'wishlist',
        },
      ],
    }),
  }),
});

export const { useGetWishlistQuery, useToggleWishlistItemMutation } = userApi;
