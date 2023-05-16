import React from 'react';

import styles from './Categories.module.scss';

interface CategoryProps {
  title: string;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Category: React.FC<CategoryProps> = ({ title, className, onClick }) => {
  return (
    <li className={`${styles.item} ${className}`}>
      <button onClick={onClick}>{title}</button>
    </li>
  );
};

export default Category;
