import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from '../../components/Pagination/Pagination';
import SushiList from '../../components/SushiList/SushiList';
import { setCurrentPage } from '../../store/slices/optionsSlice';
import type { IState, Sushi } from '../../types';
import styles from './Catalog.module.scss';

interface CatalogProps {
  sushi: Sushi[];
  setSushi: React.Dispatch<React.SetStateAction<Sushi[]>>;
}

const Catalog = ({ sushi, setSushi }: CatalogProps) => {
  const { activeCategory, activeSort, currentPage } = useSelector(
    (state: IState) => state.options
  );
  const dispatch = useDispatch();

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.wrapper}>
      <SushiList
        currentPage={currentPage}
        sushi={sushi}
        setSushi={setSushi}
        activeCategory={activeCategory}
        selectedSort={activeSort}
      />
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Catalog;
