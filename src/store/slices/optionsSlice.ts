import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { ICategory, ISort, QueryParams } from '../../types';
import { isArrayCategories } from '../../types';
import { sortOptions } from '../../utilities/constants';

export interface InitialStateOptions {
  categoriesStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  categories: ICategory[];
  sortOptions: ISort[];
  activeCategory: ICategory;
  activeSort: ISort;
  currentPage: number;
  searchValue: string;
}

const initialState: InitialStateOptions = {
  categoriesStatus: 'idle',
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

export const fetchCategories = createAsyncThunk('options/fetchCategories', async () => {
  const response = await axios.get('http://localhost:3000/category');

  if (isArrayCategories(response.data)) return response.data;
  throw Error('unexpected data');
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categoriesStatus = 'pending';
      state.categories = [];
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categoriesStatus = 'succeeded';
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.categoriesStatus = 'failed';
      state.categories = [];
    });
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
