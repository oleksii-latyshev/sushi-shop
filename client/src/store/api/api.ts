import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { QueryOptions } from '../../hooks';
import type { Sushi } from '../../types';
import { BASE_URL, sushiLimitOnPage } from '../../utils/constants';

// ? я не могу оставить пустым endpoints, чтоб раздельно инжектить их...

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Sushi'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllSushi: builder.query<Sushi[], QueryOptions>({
      query: ({ category, currentPage, order, search, sort }) =>
        `sushi?_page=${currentPage}&_limit=${sushiLimitOnPage}${category}&_sort=${sort}&_order=${order}${search}`,
    }),
    getSushiById: builder.query<Sushi, string>({
      query: (id) => `sushi/${id}`,
    }),
  }),
});

export const { useGetAllSushiQuery, useGetSushiByIdQuery } = api;
