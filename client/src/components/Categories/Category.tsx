import React from 'react';

import styles from './Categories.module.scss';

interface CategoryProps {
  title: string;
  className?: string;
  isActive?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Category: React.FC<CategoryProps> = ({
  title,
  className = '',
  onClick,
  isActive = false,
}) => {
  return (
    <li className={`${styles.item} ${className}`}>
      <button className={isActive ? 'active' : ''} onClick={onClick}>
        {title}
      </button>
    </li>
  );
};

export default Category;
