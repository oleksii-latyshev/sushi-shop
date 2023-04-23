import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { ICategory, ISort, QueryParams } from '../../types';
import { isArrayCategories } from '../../types';
import { sortOptions } from '../../utilities/constants';
import type { RootState } from '../store';

interface InitialStateOptions {
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

export const fetchCategories = createAsyncThunk<ICategory[], void>(
  'options/fetchCategories',
  async () => {
    const { data } = await axios.get<ICategory[]>('http://localhost:3000/category');

    // if (isArrayCategories(response.data)) return response.data;
    // throw Error('unexpected data');

    return data;
  }
);

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
    setCategory(state, action: PayloadAction<ICategory>) {
      state.activeCategory = action.payload;
    },
    setSortOptions(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
    setSortOption(state, action: PayloadAction<ISort>) {
      state.activeSort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setOptions(state, action: PayloadAction<QueryParams>) {
      state.currentPage = action.payload.page || initialState.currentPage;
      state.activeSort =
        state.sortOptions.find((sort) => sort.byProperty === action.payload.sortProperty) ||
        initialState.activeSort;
      state.activeCategory =
        state.categories.find((category) => category.id === action.payload.categoryId) ||
        initialState.activeCategory;
    },
    setSearchValue(state, action: PayloadAction<string>) {
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

export const selectOptions = (state: RootState) => state.options;

export const {
  setCategory,
  setSortOption,
  setCurrentPage,
  setCategories,
  setOptions,
  setSearchValue,
} = optionsSlice.actions;

export default optionsSlice.reducer;
