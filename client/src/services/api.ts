import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/utils/constants';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['order', 'wishlist', 'sushi'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    instance: builder.query({
      query: () => '/',
    }),
  }),
});
