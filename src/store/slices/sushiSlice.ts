import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { IState, Sushi } from '../../types';
import { isArraySushi, isSushi } from '../../types';
import { sushiLimitOnPage } from '../../utilities/constants';

export interface InitialStateSushi {
  selectedSushi: Sushi | null;
  items: Sushi[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: InitialStateSushi = {
  selectedSushi: null,
  items: [],
  status: 'idle',
};

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
    throw Error('unexpected data when fetching list of sushi');
  }
);

export const fetchSushiById = createAsyncThunk('sushi/fetchSushiById', async (id: number) => {
  const response = await axios.get(`http://localhost:3000/sushi/${id}`);

  if (isSushi(response.data)) return response.data;
  throw Error('unexpected data when fetching sushi by id');
});

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
    builder.addCase(fetchSushiById.pending, (state) => {
      state.status = 'pending';
      state.selectedSushi = null;
    });
    builder.addCase(fetchSushiById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.selectedSushi = action.payload;
    });
    builder.addCase(fetchSushiById.rejected, (state) => {
      state.status = 'failed';
      state.selectedSushi = null;
    });
  },
});

export const selectSushi = (state: IState) => state.sushi;
export const selectSushiById = (id: number) => (state: IState) =>
  state.cart.sushi.filter((item) => item.id === id);

export const { setItems } = sushiSlice.actions;

export default sushiSlice.reducer;
