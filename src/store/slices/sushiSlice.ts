import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Sushi } from '../../types';
import { isArraySushi } from '../../types';
import { sushiLimitOnPage } from '../../utilities/constants';

export interface QueryOptions {
  category: string;
  order: 'desc' | 'asc';
  sort: string;
  search: string;
  currentPage: number;
}

export const fetchSushi = createAsyncThunk(
  'sushi/fetchSushi',
  async ({ category, order, sort, search, currentPage }: QueryOptions) => {
    const response = await axios.get(
      `http://localhost:3000/sushi?_page=${currentPage}&_limit=${sushiLimitOnPage}${category}&_sort=${sort}&_order=${order}${search}`
    );

    if (isArraySushi(response.data)) return response.data;
    throw Error('unexpected data');
  }
);

export interface InitialStateSushi {
  items: Sushi[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: InitialStateSushi = {
  items: [],
  status: 'idle',
};

export const sushiSlice = createSlice({
  name: 'sushi',
  initialState,
  reducers: {
    setItems: (state, action: { payload: Sushi[] }) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSushi.pending, (state) => {
      state.status = 'pending';
      state.items = [];
    });
    builder.addCase(fetchSushi.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchSushi.rejected, (state) => {
      state.status = 'failed';
      state.items = [];
    });
  },
});

export const { setItems } = sushiSlice.actions;

export default sushiSlice.reducer;
