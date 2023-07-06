import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { IResponseUser } from '@/types/user.types';

export interface InitialStateSettings {
  theme: 'dark' | 'light';
  user: IResponseUser | null;
}

const initialState: InitialStateSettings = {
  theme: 'dark',
  user: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<InitialStateSettings['theme']>) {
      state.theme = action.payload;
    },
    setUser(state, action: PayloadAction<IResponseUser | null>) {
      state.user = action.payload;
    },
  },
});

export const { setTheme, setUser } = settingsSlice.actions;

export default settingsSlice.reducer;
