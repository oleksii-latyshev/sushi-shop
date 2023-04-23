import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import { useAppDispatch } from '../../hooks';
import {
  fetchCategories,
  selectOptions,
  setCategory,
  setSortOption,
} from '../../store/slices/optionsSlice';
import type { ICategory, ISort } from '../../types';
import styles from './Options.module.scss';

const Options: React.FC = () => {
  const { activeCategory, activeSort, categories, sortOptions } = useSelector(selectOptions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories()).catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
