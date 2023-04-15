import React, { useEffect, useState } from 'react';

import type { HomeProps } from '../../pages/Home';
import type { ICategory, Sushi } from '../../types';
import { isArraySushi } from '../../types';
import type { SortOption } from '../Sort/Sort';
import styles from './SushiList.module.scss';
import SushiListItem from './SushiListItem';
import SushiListItemSkeleton from './SushiListItemSkeleton';

interface SushiListProps extends Pick<HomeProps, 'searchValue'> {
  sushi: Sushi[];
  setSushi: React.Dispatch<React.SetStateAction<Sushi[]>>;
  activeCategory: ICategory;
  selectedSort: SortOption;
  currentPage: number;
}

// ! http://localhost:3000/sushi
// ! ?_sort=price&_order=asc

const limitOnPage = 8;

const SushiList = ({
  sushi,
  setSushi,
  activeCategory,
  selectedSort,
  searchValue,
  currentPage,
}: SushiListProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const category = activeCategory.id > 0 ? `category=${activeCategory.id}` : '';
    const order = selectedSort.byProperty.includes('-') ? 'desc' : 'asc';
    const sort = selectedSort.byProperty.replace('-', '');
    const search = searchValue ? `&name_like=${searchValue}` : '';

    fetch(
      `http://localhost:3000/sushi?_page=${currentPage}&_limit=${limitOnPage}&${category}&_sort=${sort}&_order=${order}${search}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (isArraySushi(json)) setSushi(json);
      })
      .catch((error: string) => {
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));

    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory.id, selectedSort.byProperty, searchValue, currentPage]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const skeletons = [...new Array(6)].map((_, i) => <SushiListItemSkeleton key={i} />);

  const sushiListItemElements = isLoading
    ? skeletons
    : sushi.map((sushi) => <SushiListItem key={sushi.id} {...sushi} />);

  return <ul className={styles.list}>{sushiListItemElements}</ul>;
};

export default SushiList;
