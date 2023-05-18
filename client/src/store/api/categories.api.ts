import type { ICategory } from '../../types';
import { api } from './api';

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategory[], null>({
      query: () => '/categories',
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
