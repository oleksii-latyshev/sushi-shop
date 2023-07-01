import React from 'react';

import { useGetAllCategoriesQuery } from '@/services/categories.service';
import { ICategory } from '@/types';
import { convertCategoryId } from '@/utils/helpers/convertCategoryId';

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
      ? data.map((categoryFromServer) => {
          const { id, name } = convertCategoryId(categoryFromServer);
          return (
            <Category
              key={id}
              title={name}
              isActive={activeCategory.id === id}
              onClick={() => onClickCategory({ id, name })}
            />
          );
        })
      : [];

    const loading = isLoading && <div>загрузка</div>;
    const error = isError && <div>не удалось получить остальные категории 😱</div>;
    const success = isSuccess && categoriesElements;

    const content = !isLoading && (
      <ul className={styles.list}>
        <Category
          key={0}
          title='все'
          isActive={activeCategory.id === '0'}
          onClick={() => onClickCategory({ id: '0', name: 'все' })}
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
