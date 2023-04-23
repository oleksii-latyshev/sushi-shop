import { useWhyDidYouUpdate } from 'ahooks';
import React, { useState } from 'react';

import type { ICategory } from '../../types';
import styles from './Categories.module.scss';
import Category from './Category';

export interface CategoriesProps {
  categories: ICategory[];
  activeCategory: ICategory;
  onClickCategory: (category: ICategory) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categories, activeCategory, onClickCategory }) => {
    const [isLoading, setIsLoading] = useState(true); // TODO сделать заглушку для загрузки

    useWhyDidYouUpdate('Categories', {
      categories,
      activeCategory,
      onClickCategory,
    });

    const categoriesElements = categories.map(({ id, name }) => (
      <Category
        key={id}
        title={name}
        className={activeCategory.id === id ? styles.active : ''}
        onClick={() => onClickCategory({ id, name })}
      />
    ));

    return (
      <ul className={styles.list}>
        <Category
          key={0}
          title='все'
          className={activeCategory.id === 0 ? styles.active : ''}
          onClick={() => onClickCategory({ id: 0, name: 'все' })}
        />
        {categoriesElements}
      </ul>
    );
  }
);

Categories.displayName = 'Categories';

export default Categories;
