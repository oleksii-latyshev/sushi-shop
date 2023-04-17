import debounce from 'lodash.debounce';
import React, { useCallback, useContext, useRef, useState } from 'react';

import { SearchContext } from '../../store/context';
import styles from './Search.module.scss';

export interface SearchProps {
  placeholder: string;
  className?: string;
}

const Search = ({ className, placeholder }: SearchProps) => {
  const conditionalClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;

  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const { searchValue, setSearchValue } = useContext(SearchContext);

  const onClickClose = () => {
    setSearchValue('');
    setValue('');
    inputRef.current?.focus();
  };

  // ! нужно найти ошибку в debounceUpdateSearchValue, но предполагаю, что беда в реализации debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceUpdateSearchValue = useCallback(
    debounce((inputText: string) => {
      setSearchValue(inputText);
    }, 200),
    [setSearchValue]
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    debounceUpdateSearchValue(event.target.value);
  };

  return (
    <label htmlFor='search' className={conditionalClass}>
      <i className='fa-solid fa-magnifying-glass' />
      <input
        id='search'
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        placeholder={placeholder}
        className={styles.input}
      />
      {searchValue && (
        <button onClick={onClickClose} className={styles.clearIcon}>
          <i className='fa-solid fa-xmark' />
        </button>
      )}
    </label>
  );
};

export default Search;
