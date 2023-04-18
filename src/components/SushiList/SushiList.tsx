import axios from 'axios';
import type { IStringifyOptions } from 'qs';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      // dispatch(
      //   setOptions({
      //     ...params,
      //   })
      // );
    }
  }, []);

  useEffect(() => {
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

    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory.id, selectedSort.byProperty, searchValue, currentPage]);

  useEffect(() => {
    const queryParams: QueryParams = {
      sortProperty: selectedSort.byProperty,
      categoryId: activeCategory.id,
      page: currentPage,
    };
    const options: IStringifyOptions = {};
    const queryString: string = qs.stringify(queryParams, options);

    navigate(`?${queryString}`);
  }, [activeCategory.id, selectedSort.byProperty, searchValue, currentPage]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const skeletons = [...new Array(6)].map((_, i) => <SushiListItemSkeleton key={i} />);

  const sushiListItemElements = isLoading
    ? skeletons
    : sushi.map((sushi) => <SushiListItem key={sushi.id} {...sushi} />);

  return <ul className={styles.list}>{sushiListItemElements}</ul>;
};

export default SushiList;
