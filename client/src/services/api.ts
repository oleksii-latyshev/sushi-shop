import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['order', 'wishlist', 'sushi'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    instance: builder.query({
      query: () => '/',
    }),
  }),
});
