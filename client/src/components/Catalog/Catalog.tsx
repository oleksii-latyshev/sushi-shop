import { FC, useState } from 'react';

import ErrorBlock from '@/components/ErrorBlock/ErrorBlock';
import Pagination from '@/components/Pagination/Pagination';
import SushiList from '@/components/SushiList/SushiList';
import SushiListSkeleton from '@/components/SushiList/SushiListSkeleton';
import { useQueryOptions } from '@/hooks';
import { useGetAllSushiQuery } from '@/services/sushi.service';
import { ISushi } from '@/types/sushi.types';

import styles from './Catalog.module.scss';

const Catalog: FC = () => {
  const [localCurrentPage, setCurrentPage] = useState(1);

  const queryOptions = useQueryOptions(localCurrentPage);
  const { isLoading, isError, data } = useGetAllSushiQuery(queryOptions);

  const sushi = data?.sushi as ISushi[];

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <SushiListSkeleton />;
  if (isError) return <ErrorBlock>Помилка при завантаженні каталогу</ErrorBlock>;

  return (
    <div className={styles.wrapper}>
      <SushiList sushi={sushi} />
      <Pagination
        currentPage={localCurrentPage}
        totalPages={data?.totalPages ?? 1}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Catalog;
