import { useAppSelector } from './hooks';

export interface QueryOptions {
  category: string;
  order: 'desc' | 'asc';
  sort: string;
  search: string;
  currentPage: number;
}

export const useQueryOptions: () => QueryOptions = () => {
  const { activeCategory, activeSort, searchValue, currentPage } = useAppSelector(
    (state) => state.options
  );

  const category = activeCategory._id.length > 0 ? `&category=${activeCategory._id}` : '';
  const order = activeSort.byProperty.includes('-') ? 'desc' : 'asc';
  const sort = activeSort.byProperty.replace('-', '');
  const search = searchValue ? `&name=${searchValue}` : '';

  return { category, order, sort, search, currentPage };
};
