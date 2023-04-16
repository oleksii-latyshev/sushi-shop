import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const sushiSlice = createSlice({
  name: 'sushi',
  initialState,
  reducers: {
    change: (state) => {},
  },
});

export const { change } = sushiSlice.actions;

export default sushiSlice.reducer;
