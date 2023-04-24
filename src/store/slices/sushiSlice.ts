import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Sushi } from '../../types';
import { isArraySushi, isSushi } from '../../types';
import { sushiLimitOnPage } from '../../utilities/constants';
import type { RootState } from '../store';

interface InitialStateSushi {
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

export const fetchSushi = createAsyncThunk<Sushi[], QueryOptions>(
  'sushi/fetchSushi',
  async ({ category, order, sort, search, currentPage }) => {
    const { data } = await axios.get<Sushi[]>(
      `http://localhost:3000/sushi?_page=${currentPage}&_limit=${sushiLimitOnPage}${category}&_sort=${sort}&_order=${order}${search}`
    );

    // if (isArraySushi(response.data)) return response.data;
    // throw Error('unexpected data when fetching list of sushi');

    return data;
  }
);

export const fetchSushiById = createAsyncThunk<Sushi, string | undefined>(
  'sushi/fetchSushiById',
  async (id) => {
    const { data } = await axios.get<Sushi>(`http://localhost:3000/sushi/${id || 0}`);

    // if (isSushi(response.data)) return response.data;
    // throw Error('unexpected data when fetching sushi by id');

    return data;
  }
);

export const sushiSlice = createSlice({
  name: 'sushi',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Sushi[]>) => {
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

export const selectSushi = (state: RootState) => state.sushi;
export const selectSushiById = (id: number) => (state: RootState) =>
  state.cart.sushi.filter((item) => item.id === id);

export const { setItems } = sushiSlice.actions;

export default sushiSlice.reducer;
