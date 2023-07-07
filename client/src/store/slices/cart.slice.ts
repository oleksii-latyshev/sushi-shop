import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import { isSushiCart, SushiCart } from '@/types/sushi.types';
import { calcTotalCount, calcTotalPrice, getCartFromLocalStorage } from '@/utils/helpers';

export interface InitialStateCart {
  cartSushi: SushiCart[];
  totalPrice: number;
  totalCount: number;
}

const { cartSushi, totalCount, totalPrice } = getCartFromLocalStorage();

const initialState: InitialStateCart = {
  cartSushi,
  totalPrice,
  totalCount,
};

const calcTotals = (state: InitialStateCart) => {
  state.totalPrice = calcTotalPrice(state.cartSushi);
  state.totalCount = calcTotalCount(state.cartSushi);

  return state;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addSushi(state, action: PayloadAction<SushiCart | Pick<SushiCart, '_id' | 'variant'>>) {
      const findItem = state.cartSushi.find(
        (item) => item._id === action.payload._id && item.variant === action.payload.variant
      );

      if (findItem) {
        findItem.inCartCount += 1;
      } else if (isSushiCart(action.payload)) {
        state.cartSushi.push(action.payload);
      }

      state = calcTotals(state);
    },
    removeSushi(state, action: PayloadAction<SushiCart | Pick<SushiCart, '_id' | 'variant'>>) {
      const findItem = state.cartSushi.find(
        (item) => item._id === action.payload._id && item.variant === action.payload.variant
      );

      if (findItem && findItem.inCartCount > 1) {
        findItem.inCartCount -= 1;
      }

      state = calcTotals(state);
    },
    deleteSushi(state, action: PayloadAction<SushiCart | Pick<SushiCart, '_id' | 'variant'>>) {
      state.cartSushi = state.cartSushi.filter(
        (item) => item._id !== action.payload._id || item.variant !== action.payload.variant
      );
      state = calcTotals(state);
    },
    clearCart(state) {
      state.cartSushi = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartTotalCount = (state: RootState) => state.cart.totalCount;
export const selectSushiById = (id: string) => (state: RootState) =>
  state.cart.cartSushi.filter((item) => item._id === id);

export const { addSushi, clearCart, removeSushi, deleteSushi } = cartSlice.actions;

export default cartSlice.reducer;
