import { createSlice } from '@reduxjs/toolkit';

import type { ICategory, ISort } from '../../types';

export interface InitialStateOptions {
  activeCategory: ICategory;
  activeSort: ISort;
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
  },
});

export const { setCategory, setSort } = optionsSlice.actions;

export default optionsSlice.reducer;
