import React from 'react';

import styles from './Search.module.scss';

export interface SearchProps {
  placeholder: string;
  className?: string;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ className, placeholder, searchValue, setSearchValue }: SearchProps) => {
  const conditionalClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;

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
