import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import { setCategories, setCategory, setSortOption } from '../../store/slices/optionsSlice';
import type { ICategory, ISort, IState } from '../../types';
import { isArrayCategories } from '../../types';
import styles from './Options.module.scss';

const Options = () => {
  const { activeCategory, activeSort, categories, sortOptions } = useSelector(
    (state: IState) => state.options
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('http://localhost:3000/category')
      .then((response) => {
        if (isArrayCategories(response.data)) dispatch(setCategories(response.data));
      })
      .catch((error: string) => {
        throw new Error(error);
      });
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
