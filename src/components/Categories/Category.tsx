import React from 'react';

import styles from './Categories.module.scss';

interface CategoryInstance {
  title: string;
}

const Category = ({ title }: CategoryInstance) => {
  return <li className={styles.item}>{title}</li>;
};

export default Category;
