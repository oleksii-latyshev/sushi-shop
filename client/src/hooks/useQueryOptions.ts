import { useAppSelector } from './hooks';

export interface QueryOptions {
  category: string;
  order: 'desc' | 'asc';
  sort: string;
  search: string;
  currentPage: number;
}

type IUseQueryOptions = (currentPage: number) => QueryOptions;

export const useQueryOptions: IUseQueryOptions = (currentPage: number) => {
  const { activeCategory, activeSort, searchValue } = useAppSelector((state) => state.options);

  const category = activeCategory.id.length > 1 ? `&category=${activeCategory.id}` : '';
  const order = activeSort.byProperty.includes('-') ? 'desc' : 'asc';
  const sort = activeSort.byProperty.replace('-', '');
  const search = searchValue ? `&name=${searchValue}` : '';

  return { category, order, sort, search, currentPage };
};
