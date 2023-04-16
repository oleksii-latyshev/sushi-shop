import React, { useContext } from 'react';

import { SearchContext } from '../../store/context';
import styles from './Search.module.scss';

export interface SearchProps {
  placeholder: string;
  className?: string;
}

const Search = ({ className, placeholder }: SearchProps) => {
  const conditionalClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;

  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <label htmlFor='search' className={conditionalClass}>
      <i className='fa-solid fa-magnifying-glass' />
      <input
        id='search'
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      {searchValue && (
        <button onClick={() => setSearchValue('')} className={styles.clearIcon}>
          <i className='fa-solid fa-xmark' />
        </button>
      )}
    </label>
  );
};

export default Search;
