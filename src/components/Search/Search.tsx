import debounce from 'lodash.debounce';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchValue } from '../../store/slices/optionsSlice';
import type { IState } from '../../types';
import styles from './Search.module.scss';

export interface SearchProps {
  placeholder: string;
  className?: string;
}

const Search = ({ className, placeholder }: SearchProps) => {
  const searchValue = useSelector((state: IState) => state.options.searchValue);
  const dispatch = useDispatch();

  const conditionalClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;

  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClose = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  // ! нужно найти ошибку в debounceUpdateSearchValue, но предполагаю, что беда в реализации debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceUpdateSearchValue = useCallback(
    debounce((inputText: string) => {
      dispatch(setSearchValue(inputText));
      setValue(inputText);
    }, 200),
    []
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
