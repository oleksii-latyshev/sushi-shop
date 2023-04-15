import React, { useEffect, useState } from 'react';

import type { ICategory, Sushi } from '../../types';
import { isArraySushi } from '../../types';
import type { SortOption } from '../Sort/Sort';
import styles from './SushiList.module.scss';
import SushiListItem from './SushiListItem';
import SushiListItemSkeleton from './SushiListItemSkeleton';

interface SushiListProps {
  sushi: Sushi[];
  setSushi: React.Dispatch<React.SetStateAction<Sushi[]>>;
  activeCategory: ICategory;
  selectedSort: SortOption;
}

// ! http://localhost:3000/sushi
// ! ?_sort=price&_order=asc

const SushiList = ({ sushi, setSushi, activeCategory, selectedSort }: SushiListProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const category = activeCategory.id > 0 ? `category=${activeCategory.id}` : '';
    const order = selectedSort.byProperty.includes('-') ? 'desc' : 'asc';
    const sort = selectedSort.byProperty.replace('-', '');

    fetch(`http://localhost:3000/sushi?${category}&_sort=${sort}&_order=${order}`)
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
  }, [activeCategory.id, selectedSort.byProperty]);

  const sushiListItemElements = isLoading
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [...new Array(6)].map((_, i) => <SushiListItemSkeleton key={i} />)
    : sushi.map((sushi) => <SushiListItem key={sushi.id} {...sushi} />);

  return <ul className={styles.list}>{sushiListItemElements}</ul>;
};

export default SushiList;
