import React from 'react';

import Pagination from '../../components/Pagination/Pagination';
import SushiList from '../../components/SushiList/SushiList';
import SushiListSkeleton from '../../components/SushiList/SushiListSkeleton';
import { useAppDispatch, useQueryOptions } from '../../hooks';
import { useGetAllSushiQuery } from '../../store/api/api';
import { setCurrentPage } from '../../store/slices/optionsSlice';
import type { SushiFromServer } from '../../types';
import styles from './Catalog.module.scss';

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();

  const queryOptions = useQueryOptions();
  const { isLoading, isError, isSuccess, data } = useGetAllSushiQuery(queryOptions, {});

  const status = { isLoading, isError, isSuccess };
  const sushi = data?.sushi as SushiFromServer[];
  const currentPage = data?.currentPage ?? 1;
  const totalPages = data?.totalPages ?? 1;

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (isLoading) return <SushiListSkeleton />;

  if (isError) return <div>error</div>;

  return (
    <div className={styles.wrapper}>
      <SushiList sushi={sushi} status={status} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Catalog;
