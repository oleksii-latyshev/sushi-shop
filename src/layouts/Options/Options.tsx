import type { CategoriesProps } from '../../components/Categories/Categories';
import Categories from '../../components/Categories/Categories';
import type { SortProps } from '../../components/Sort/Sort';
import Sort from '../../components/Sort/Sort';
import styles from './Options.module.scss';

interface OptionsProps extends SortProps, CategoriesProps {}

const Options = ({
  categories,
  setCategories,
  selectedSort,
  onSelectSort,
  activeCategory,
  onClickCategory,
}: OptionsProps) => {
  return (
    <div className={styles.wrapper}>
      <Categories
        categories={categories}
        setCategories={setCategories}
        activeCategory={activeCategory}
        onClickCategory={onClickCategory}
      />
      <Sort selectedSort={selectedSort} onSelectSort={onSelectSort} />
    </div>
  );
};

export default Options;
