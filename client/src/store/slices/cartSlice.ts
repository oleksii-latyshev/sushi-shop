import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { SushiCart } from '../../types';
import { isSushiCart } from '../../types';
import { calcTotalCount, calcTotalPrice, getCartFromLocalStorage } from '../../utils/helpers';
import type { RootState } from '../store';

export interface InitialStateCart {
  sushi: SushiCart[];
  totalPrice: number;
  totalCount: number;
}

const { sushi, totalCount, totalPrice } = getCartFromLocalStorage();

const initialState: InitialStateCart = {
  sushi,
  totalPrice,
  totalCount,
};

const calcTotals = (state: InitialStateCart) => {
  state.totalPrice = calcTotalPrice(state.sushi);
  state.totalCount = calcTotalCount(state.sushi);

  return state;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addSushi(state, action: PayloadAction<SushiCart | Pick<SushiCart, 'id' | 'count'>>) {
      const findItem = state.sushi.find(
        (item) => item.id === action.payload.id && item.count === action.payload.count
      );

      if (findItem) findItem.inCartCount += 1;
      else if (isSushiCart(action.payload)) state.sushi.push(action.payload);

      state = calcTotals(state);
    },
    removeSushi(state, action: PayloadAction<SushiCart | Pick<SushiCart, 'id' | 'count'>>) {
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
    deleteSushi(state, action: PayloadAction<SushiCart | Pick<SushiCart, 'id' | 'count'>>) {
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartTotalCount = (state: RootState) => state.cart.totalCount;
export const selectSushiById = (id: number) => (state: RootState) =>
  state.cart.sushi.filter((item) => item.id === id);

export const { addSushi, clearCart, removeSushi, deleteSushi } = cartSlice.actions;

export default cartSlice.reducer;
