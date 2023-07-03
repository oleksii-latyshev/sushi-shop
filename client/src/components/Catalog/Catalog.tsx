import React from 'react';

import Pagination from '@/components/Pagination/Pagination';
import SushiList from '@/components/SushiList/SushiList';
import SushiListSkeleton from '@/components/SushiList/SushiListSkeleton';
import { useAppDispatch, useQueryOptions } from '@/hooks';
import { useGetAllSushiQuery } from '@/services/sushi.service';
import { setCurrentPage } from '@/store/slices/options.slice';
import { ISushi } from '@/types';

import styles from './Catalog.module.scss';

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();

  const queryOptions = useQueryOptions();
  const { isLoading, isError, data } = useGetAllSushiQuery(queryOptions, {});

  const sushi = data?.sushi as ISushi[];
  const currentPage = data?.currentPage ?? 1;
  const totalPages = data?.totalPages ?? 1;

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (isLoading) return <SushiListSkeleton />;
  if (isError) return <div>error</div>;

  return (
    <div className={styles.wrapper}>
      <SushiList sushi={sushi} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Catalog;
