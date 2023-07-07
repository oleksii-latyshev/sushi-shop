import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import type { ICategory, ISort } from '@/types/options.types';
import { sortOptions } from '@/utils/constants';

interface InitialStateOptions {
  sortOptions: ISort[];
  activeCategory: ICategory;
  activeSort: ISort;
  searchValue: string;
}

const initialState: InitialStateOptions = {
  sortOptions,
  activeCategory: {
    id: '0',
    name: 'все',
  },
  activeSort: {
    name: sortOptions[0].name,
    byProperty: sortOptions[0].byProperty,
  },
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
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const selectOptions = (state: RootState) => state.options;

export const { setCategory, setSortOption, setSearchValue } = optionsSlice.actions;

export default optionsSlice.reducer;
