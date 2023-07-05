import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Categories from '@/components/Categories/Categories';
import Sort from '@/components/Sort/Sort';
import { useAppDispatch } from '@/hooks';
import { selectOptions, setCategory, setSortOption } from '@/store/slices/options.slice';
import type { ICategory, ISort } from '@/types/options.types';

import styles from './Options.module.scss';

const Options: React.FC = () => {
  const { activeCategory, activeSort, sortOptions } = useSelector(selectOptions);
  const dispatch = useAppDispatch();

  const onClickCategory = useCallback(
    (category: ICategory) => {
      dispatch(setCategory(category));
    },
    [dispatch]
  );

  const onSelectSort = useCallback(
    (sortOption: ISort) => {
      dispatch(setSortOption(sortOption));
    },
    [dispatch]
  );

  return (
    <div className={styles.wrapper}>
      <Categories activeCategory={activeCategory} onClickCategory={onClickCategory} />
      <Sort sortOptions={sortOptions} selectedSort={activeSort} onSelectSort={onSelectSort} />
    </div>
  );
};

export default Options;
