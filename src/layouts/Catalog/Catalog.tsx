import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from '../../components/Pagination/Pagination';
import SushiList from '../../components/SushiList/SushiList';
import { selectOptions, setCurrentPage } from '../../store/slices/optionsSlice';
import type { QueryOptions } from '../../store/slices/sushiSlice';
import { fetchSushi, selectSushi } from '../../store/slices/sushiSlice';
import styles from './Catalog.module.scss';

const Catalog: React.FC = () => {
  const { activeCategory, activeSort, currentPage, searchValue } = useSelector(selectOptions);
  const { items, status } = useSelector(selectSushi);
  const dispatch = useDispatch();

  const isSearch = useRef(false);

  const fetchPizzas = () => {
    const category = activeCategory.id > 0 ? `&category=${activeCategory.id}` : '';
    const order = activeSort.byProperty.includes('-') ? 'desc' : 'asc';
    const sort = activeSort.byProperty.replace('-', '');
    const search = searchValue ? `&name_like=${searchValue}` : '';

    const queryOptions: QueryOptions = { category, order, sort, search, currentPage };

    dispatch(fetchSushi(queryOptions));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) fetchPizzas();

    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory.id, activeSort.byProperty, searchValue, currentPage]);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.wrapper}>
      <SushiList sushi={items} status={status} />
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Catalog;
