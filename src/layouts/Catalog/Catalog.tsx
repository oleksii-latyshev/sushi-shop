import React from 'react';
import { useSelector } from 'react-redux';

import Pagination from '../../components/Pagination/Pagination';
import SushiList from '../../components/SushiList/SushiList';
import type { IState, Sushi } from '../../types';
import styles from './Catalog.module.scss';

interface CatalogProps {
  sushi: Sushi[];
  setSushi: React.Dispatch<React.SetStateAction<Sushi[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Catalog = ({ sushi, setSushi, currentPage, setCurrentPage }: CatalogProps) => {
  const { activeCategory, activeSort } = useSelector((state: IState) => state.options);

  return (
    <div className={styles.wrapper}>
      <SushiList
        currentPage={currentPage}
        sushi={sushi}
        setSushi={setSushi}
        activeCategory={activeCategory}
        selectedSort={activeSort}
      />
      <Pagination onChangePage={(page: number) => setCurrentPage(page)} />
    </div>
  );
};

export default Catalog;
