import { QueryOptions } from '@/hooks';
import { ResponseSushi, Sushi } from '@/types';
import { sushiLimitOnPage } from '@/utils/constants';

import { api } from './api';

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSushi: builder.query<ResponseSushi, QueryOptions>({
      query: ({ category, currentPage, order, search, sort }) =>
        `sushi?page=${currentPage}&limit=${sushiLimitOnPage}&sort=${sort}&order=${order}${category}${search}`,
    }),
    getSushiById: builder.query<Sushi, string>({
      query: (id) => `sushi/${id}`,
    }),
  }),
});

export const { useGetAllSushiQuery, useGetSushiByIdQuery } = categoriesApi;