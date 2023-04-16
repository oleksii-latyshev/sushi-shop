import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    change: (state) => {},
  },
});

export const { change } = categoriesSlice.actions;

export default categoriesSlice.reducer;
