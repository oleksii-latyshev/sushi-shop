import { useDispatch, useSelector } from 'react-redux';

import type { CategoriesProps } from '../../components/Categories/Categories';
import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import { setCategory, setSort } from '../../store/slices/optionsSlice';
import type { ICategory, ISort, IState } from '../../types';
import styles from './Options.module.scss';

type OptionsProps = Pick<CategoriesProps, 'categories' | 'setCategories'>;

const sortOptions: ISort[] = [
  { name: 'рейтингу', byProperty: 'rating' },
  { name: 'алфавиту', byProperty: 'name' },
  { name: 'убыванию цены', byProperty: '-price' },
  { name: 'возрастанию цены', byProperty: 'price' },
];

const Options = ({ categories, setCategories }: OptionsProps) => {
  const { activeCategory, activeSort } = useSelector((state: IState) => state.options);
  const dispatch = useDispatch();

  const onClickCategory = (category: ICategory) => {
    dispatch(setCategory(category));
  };

  const onSelectSort = (sortOption: ISort) => {
    dispatch(setSort(sortOption));
  };

  return (
    <div className={styles.wrapper}>
      <Categories
        categories={categories}
        setCategories={setCategories}
        activeCategory={activeCategory}
        onClickCategory={onClickCategory}
      />
      <Sort sortOptions={sortOptions} selectedSort={activeSort} onSelectSort={onSelectSort} />
    </div>
  );
};

export default Options;
