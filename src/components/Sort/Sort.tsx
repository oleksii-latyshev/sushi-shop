import React from 'react';

import styles from './Sort.module.scss';
import SortItem from './SortItem';

interface SortOption {
  id: number;
  title: string;
}

const sortOptions: SortOption[] = [
  { id: 1, title: 'по популярности' },
  { id: 2, title: 'по новизне' },
  { id: 3, title: 'по убыванию цены' },
  { id: 4, title: 'по возрастанию цены' },
];

const Sort = () => {
  const sortItems = sortOptions.map(({ id, title }) => (
    <SortItem key={id} value={id} title={title} />
  ));

  return (
    <div className={styles.wrapper}>
      <select className={styles.select}>{sortItems}</select>
    </div>
  );
};

export default Sort;
