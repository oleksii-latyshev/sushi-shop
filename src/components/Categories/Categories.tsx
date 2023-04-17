import axios from 'axios';
import React, { useEffect, useState } from 'react';

import type { ICategory } from '../../types';
import { isArrayCategories } from '../../types';
import styles from './Categories.module.scss';
import Category from './Category';

export interface CategoriesProps {
  categories: ICategory[];
  activeCategory: ICategory;
  onClickCategory: (category: ICategory) => void;
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

// const categories: string[] = ['все', 'сеты', 'роллы'];

const Categories = ({
  categories,
  setCategories,
  activeCategory,
  onClickCategory,
}: CategoriesProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/category')
      .then((response) => {
        if (isArrayCategories(response.data)) setCategories(response.data);
      })
      .catch((error: string) => {
        throw new Error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
};

export default Categories;
