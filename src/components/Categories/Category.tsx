import React from 'react';

import styles from './Categories.module.scss';

interface CategoryInstance {
  title: string;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Category = ({ title, className, onClick }: CategoryInstance) => {
  return (
    <li className={`${styles.item} ${className}`}>
      <button onClick={onClick}>{title}</button>
    </li>
  );
};

export default Category;
