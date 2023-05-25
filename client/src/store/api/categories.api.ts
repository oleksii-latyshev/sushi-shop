import type { CategoryFromServer } from '../../types';
import { api } from './api';

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryFromServer[], null>({
      query: () => '/categories',
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
