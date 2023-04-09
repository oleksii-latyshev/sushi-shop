import React from 'react';

import styles from './Search.module.scss';

interface SearchInstance {
  placeholder: string;
  className?: string;
}

const Search = ({ className, placeholder }: SearchInstance) => {
  const conditionalClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;

  return <input placeholder={placeholder} className={conditionalClass} />;
};

export default Search;
