import { createSlice } from '@reduxjs/toolkit';

import type { IState, SushiCart } from '../../types';
import { isSushiCart } from '../../types';

export interface InitialStateCart {
  sushi: SushiCart[];
  totalPrice: number;
  totalCount: number;
}

const initialState: InitialStateCart = {
  sushi: [],
  totalPrice: 0,
  totalCount: 0,
};

const calcTotals = (state: InitialStateCart) => {
  state.totalPrice = state.sushi.reduce(
    (sumPrice, item) => item.price * item.inCartCount + sumPrice,
    0
  );

  state.totalCount = state.sushi.reduce((sumCount, item) => sumCount + item.inCartCount, 0);

  return state;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addSushi(state, action: { payload: SushiCart | Pick<SushiCart, 'id' | 'count'> }) {
      const findItem = state.sushi.find(
        (item) => item.id === action.payload.id && item.count === action.payload.count
      );

      if (findItem) findItem.inCartCount += 1;
      else if (isSushiCart(action.payload)) state.sushi.push(action.payload);

      state = calcTotals(state);
    },
    removeSushi(state, action: { payload: Pick<SushiCart, 'id' | 'count'> }) {
      const findItem = state.sushi.find(
        (item) => item.id === action.payload.id && item.count === action.payload.count
      );

      if (findItem) {
        if (findItem.inCartCount > 1) findItem.inCartCount -= 1;
        else
          state.sushi = state.sushi.filter(
            (item) => item.id !== action.payload.id && item.count !== action.payload.count
          );
      }

      state = calcTotals(state);
    },
    deleteSushi(state, action: { payload: Pick<SushiCart, 'id' | 'count'> }) {
      state.sushi = state.sushi.filter(
        (item) => item.id !== action.payload.id || item.count !== action.payload.count
      );

      state = calcTotals(state);
    },
    clearCart(state) {
      state.sushi = [];
    },
  },
});

export const selectCart = (state: IState) => state.cart;
export const selectCartTotalCount = (state: IState) => state.cart.totalCount;

export const { addSushi, clearCart, removeSushi, deleteSushi } = cartSlice.actions;

export default cartSlice.reducer;
