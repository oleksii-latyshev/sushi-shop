import { useWhyDidYouUpdate } from 'ahooks';
import React from 'react';

import { useGetAllCategoriesQuery } from '../../store/api/categories.api';
import type { ICategory } from '../../types';
import styles from './Categories.module.scss';
import Category from './Category';

export interface CategoriesProps {
  activeCategory: ICategory;
  onClickCategory: (category: ICategory) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ activeCategory, onClickCategory }) => {
    const { isLoading, isError, isSuccess, data } = useGetAllCategoriesQuery(null);

    const categoriesElements = data
      ? data.map(({ _id, name }) => (
          <Category
            key={_id}
            title={name}
            className={activeCategory._id === _id ? styles.active : ''}
            onClick={() => onClickCategory({ _id, name })}
          />
        ))
      : [];

    const loading = isLoading && <div>загрузка</div>;
    const error = isError && <div>не удалось получить остальные категории 😱</div>;
    const success = isSuccess && categoriesElements;

    const content = !isLoading && (
      <ul className={styles.list}>
        <Category
          key={0}
          title='все'
          className={activeCategory._id === 0 ? styles.active : ''}
          onClick={() => onClickCategory({ _id: 0, name: 'все' })}
        />
        {error}
        {success}
      </ul>
    );

    return (
      <>
        {loading}
        {content}
      </>
    );
  }
);

Categories.displayName = 'Categories';

export default Categories;
