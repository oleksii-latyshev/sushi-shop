import React from 'react';

import styles from './Categories.module.scss';
import Category from './Category';

const categories: string[] = ['все', 'сеты', 'роллы'];

const Categories = () => {
  const categoriesElements = categories.map((category) => (
    <Category key={category} title={category} />
  ));

  return <ul className={styles.list}>{categoriesElements}</ul>;
};

export default Categories;
