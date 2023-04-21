import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import {
  fetchCategories,
  selectOptions,
  setCategory,
  setSortOption,
} from '../../store/slices/optionsSlice';
import type { ICategory, ISort } from '../../types';
import styles from './Options.module.scss';

const Options = () => {
  const { activeCategory, activeSort, categories, sortOptions } = useSelector(selectOptions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const onClickCategory = (category: ICategory) => {
    dispatch(setCategory(category));
  };

  const onSelectSort = (sortOption: ISort) => {
    dispatch(setSortOption(sortOption));
  };

  return (
    <div className={styles.wrapper}>
      <Categories
        categories={categories}
        activeCategory={activeCategory}
        onClickCategory={onClickCategory}
      />
      <Sort sortOptions={sortOptions} selectedSort={activeSort} onSelectSort={onSelectSort} />
    </div>
  );
};

export default Options;
