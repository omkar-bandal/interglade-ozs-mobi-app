import {sliceConstants} from '@constants/slice.constant';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Cart {
  cartItem: any;
}

export interface CartState {
  cartItem: any;
}

const initialState: CartState = {
  cartItem: {},
};

const cartSlice = createSlice({
  name: sliceConstants.CART,
  initialState,
  reducers: {
    addCart: (state, {payload}: PayloadAction<any>) => {
      state.cartItem = payload;
    },
    deleteCart: state => {
      if (!state.cartItem) {
        return;
      }
      state.cartItem = {};
    },
  },
});

export const {addCart, deleteCart} = cartSlice.actions;

export const cartActionCreators = {
  addCart,
  deleteCart,
};

export default cartSlice.reducer;
