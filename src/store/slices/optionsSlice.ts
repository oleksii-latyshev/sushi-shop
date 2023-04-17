import { createSlice } from '@reduxjs/toolkit';

import type { ICategory, ISort } from '../../types';

export interface InitialStateOptions {
  activeCategory: ICategory;
  activeSort: ISort;
  currentPage: number;
}

const initialState: InitialStateOptions = {
  activeCategory: {
    id: 0,
    name: 'все',
  },
  activeSort: {
    name: 'рейтингу',
    byProperty: 'rating',
  },
  currentPage: 1,
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setCategory(state, action: { payload: ICategory }) {
      state.activeCategory = action.payload;
    },
    setSort(state, action: { payload: ISort }) {
      state.activeSort = action.payload;
    },
    setCurrentPage(state, action: { payload: number }) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategory, setSort, setCurrentPage } = optionsSlice.actions;

export default optionsSlice.reducer;
