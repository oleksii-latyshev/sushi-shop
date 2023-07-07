import { QueryOptions } from '@/hooks';
import { IBadResponse, ResponseSushi } from '@/types/response.types';
import { ICreateSushiReview, ISushi } from '@/types/sushi.types';
import { sushiLimitOnPage } from '@/utils/constants';

import { api } from './api';

interface IAddReviewArg {
  _id: string;
  review: ICreateSushiReview;
}

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSushi: builder.query<ResponseSushi, QueryOptions>({
      query: ({ category, currentPage, order, search, sort }) =>
        `sushi?page=${currentPage}&limit=${sushiLimitOnPage}&sort=${sort}&order=${order}${category}${search}`,
      providesTags: [
        {
          type: 'sushi',
        },
      ],
    }),
    getSushiById: builder.query<ISushi, string>({
      query: (id) => `sushi/${id}`,
      providesTags: [
        {
          type: 'sushi',
        },
      ],
    }),
    addReview: builder.mutation<ISushi | IBadResponse, IAddReviewArg>({
      query: ({ _id, review }) => ({
        url: `/sushi/${_id}`,
        method: 'POST',
        credentials: 'include',
        body: review,
      }),
      invalidatesTags: [
        {
          type: 'sushi',
        },
      ],
    }),
  }),
});

export const { useGetAllSushiQuery, useGetSushiByIdQuery, useAddReviewMutation } =
  categoriesApi;
