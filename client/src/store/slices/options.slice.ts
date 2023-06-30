import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ICategory, ISort, QueryParams } from '../../types';
import { sortOptions } from '../../utils/constants';
import type { RootState } from '../store';

interface InitialStateOptions {
  sortOptions: ISort[];
  activeCategory: ICategory;
  activeSort: ISort;
  currentPage: number;
  totalPages: number;
  searchValue: string;
}

const initialState: InitialStateOptions = {
  sortOptions,
  activeCategory: {
    id: '0',
    name: 'все',
  },
  activeSort: {
    name: 'рейтингу',
    byProperty: 'rating',
  },
  currentPage: 1,
  totalPages: 1,
  searchValue: '',
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<ICategory>) {
      state.activeCategory = action.payload;
    },
    setSortOption(state, action: PayloadAction<ISort>) {
      state.activeSort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<InitialStateOptions['currentPage']>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<InitialStateOptions['totalPages']>) {
      state.totalPages = action.payload;
    },
    setOptions(state, action: PayloadAction<QueryParams>) {
      state.currentPage = action.payload.page || initialState.currentPage;
      state.activeSort =
        state.sortOptions.find((sort) => sort.byProperty === action.payload.sortProperty) ||
        initialState.activeSort;
      // FIXME нужно подумать как лучше теперь изменить, раз я не храню категории, то на каком этапе мне получать обьект активной
      // state.activeCategory =
      //   state.categories.find((category) => category.id === action.payload.categoryId) ||
      //   initialState.activeCategory;
      state.activeCategory = initialState.activeCategory;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const selectOptions = (state: RootState) => state.options;

export const {
  setCategory,
  setSortOption,
  setCurrentPage,
  setTotalPages,
  setOptions,
  setSearchValue,
} = optionsSlice.actions;

export default optionsSlice.reducer;
