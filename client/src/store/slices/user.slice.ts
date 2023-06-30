import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IResponseUser } from '@/types/user.types';

interface IUserSlice {
  user: IResponseUser | null;
}

const initialState: IUserSlice = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IResponseUser>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
