import { ICategoryResponse } from '@/types/response.types';

import { api } from './api';

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategoryResponse[], null>({
      query: () => '/categories',
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
