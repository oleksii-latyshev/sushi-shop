import React, { useState } from 'react';

import styles from './Categories.module.scss';
import Category from './Category';

const categories: string[] = ['все', 'сеты', 'роллы'];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState('все');

  const categoriesElements = categories.map((category) => (
    <Category
      key={category}
      title={category}
      className={activeCategory === category ? styles.active : ''}
      onClick={() => setActiveCategory(category)}
    />
  ));

  return <ul className={styles.list}>{categoriesElements}</ul>;
};

export default Categories;
