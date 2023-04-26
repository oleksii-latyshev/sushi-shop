import React from 'react';
import { useSelector } from 'react-redux';

import Pagination from '../../components/Pagination/Pagination';
import SushiList from '../../components/SushiList/SushiList';
import { useAppDispatch } from '../../hooks';
import { selectOptions, setCurrentPage } from '../../store/slices/optionsSlice';
import styles from './Catalog.module.scss';

const Catalog: React.FC = () => {
  const { currentPage } = useSelector(selectOptions);
  const dispatch = useAppDispatch();

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.wrapper}>
      <SushiList />
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Catalog;
