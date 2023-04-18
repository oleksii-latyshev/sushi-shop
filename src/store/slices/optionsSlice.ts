import { createSlice } from '@reduxjs/toolkit';

import type { ICategory, ISort, QueryParams } from '../../types';
import { sortOptions } from '../../utilities/constants';

export interface InitialStateOptions {
  categories: ICategory[];
  sortOptions: ISort[];
  activeCategory: ICategory;
  activeSort: ISort;
  currentPage: number;
  searchValue: string;
}

const initialState: InitialStateOptions = {
  categories: [],
  sortOptions,
  activeCategory: {
    id: 0,
    name: 'все',
  },
  activeSort: {
    name: 'рейтингу',
    byProperty: 'rating',
  },
  currentPage: 1,
  searchValue: '',
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setCategories(state, action: { payload: ICategory[] }) {
      state.categories = action.payload;
    },
    setCategory(state, action: { payload: ICategory }) {
      state.activeCategory = action.payload;
    },
    setSortOptions(state, action: { payload: ICategory[] }) {
      state.categories = action.payload;
    },
    setSortOption(state, action: { payload: ISort }) {
      state.activeSort = action.payload;
    },
    setCurrentPage(state, action: { payload: number }) {
      state.currentPage = action.payload;
    },
    setOptions(state, action: { payload: QueryParams }) {
      state.currentPage = action.payload.page || initialState.currentPage;
      state.activeSort =
        state.sortOptions.find((sort) => sort.byProperty === action.payload.sortProperty) ||
        initialState.activeSort;
      state.activeCategory =
        state.categories.find((category) => category.id === action.payload.categoryId) ||
        initialState.activeCategory;
    },
    setSearchValue(state, action: { payload: string }) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setCategory,
  setSortOption,
  setCurrentPage,
  setCategories,
  setOptions,
  setSearchValue,
} = optionsSlice.actions;

export default optionsSlice.reducer;
