import axios from 'axios';
import type { IStringifyOptions } from 'qs';
import qs from 'qs';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setOptions } from '../../store/slices/optionsSlice';
import type { ICategory, ISort, QueryParams, Sushi } from '../../types';
import { isArraySushi } from '../../types';
import styles from './SushiList.module.scss';
import SushiListItem from './SushiListItem';
import SushiListItemSkeleton from './SushiListItemSkeleton';

interface SushiListProps {
  searchValue: string;
  sushi: Sushi[];
  setSushi: React.Dispatch<React.SetStateAction<Sushi[]>>;
  activeCategory: ICategory;
  selectedSort: ISort;
  currentPage: number;
}

const limitOnPage = 8;

const SushiList = ({
  searchValue,
  sushi,
  setSushi,
  activeCategory,
  selectedSort,
  currentPage,
}: SushiListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const isSearch = useRef(false);
  // const isMounted = useRef(false);

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = activeCategory.id > 0 ? `&category=${activeCategory.id}` : '';
    const order = selectedSort.byProperty.includes('-') ? 'desc' : 'asc';
    const sort = selectedSort.byProperty.replace('-', '');
    const search = searchValue ? `&name_like=${searchValue}` : '';

    axios
      .get(
        `http://localhost:3000/sushi?_page=${currentPage}&_limit=${limitOnPage}${category}&_sort=${sort}&_order=${order}${search}`
      )
      .then((response) => {
        if (isArraySushi(response.data)) setSushi(response.data);
      })
      .catch((error: string) => {
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
  };

  // FIXME в асинхронную санку нужно закинуть, чтоб после загрузки категорий эти действия выполнялись
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     dispatch(
  //       setOptions({
  //         sortProperty: params.sortProperty,
  //         categoryId: params.categoryId,
  //         page: +params.page,
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) fetchPizzas();

    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory.id, selectedSort.byProperty, searchValue, currentPage]);

  // FIXME туда же, что и выше
  // useEffect(() => {
  //   // если был первый рендер и изменился массив зависимостей, то выполняем вшивание в адресную строку
  //   if (isMounted.current) {
  //     const queryParams: QueryParams = {
  //       sortProperty: selectedSort.byProperty,
  //       categoryId: activeCategory.id,
  //       page: currentPage,
  //     };
  //     const options: IStringifyOptions = {};
  //     const queryString: string = qs.stringify(queryParams, options);

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [activeCategory.id, selectedSort.byProperty, searchValue, currentPage]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const skeletons = [...new Array(6)].map((_, i) => <SushiListItemSkeleton key={i} />);

  const sushiListItemElements = isLoading
    ? skeletons
    : sushi.map((sushi) => <SushiListItem key={sushi.id} {...sushi} />);

  return <ul className={styles.list}>{sushiListItemElements}</ul>;
};

export default SushiList;
