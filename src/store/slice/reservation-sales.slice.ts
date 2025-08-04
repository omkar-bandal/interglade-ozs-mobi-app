import {sliceConstants} from '@constants/slice.constant';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Sale {
  id: string;
  [key: string]: any;
}

export interface ReservationSalesState {
  myReservationSales: any[] | null;
}

const initialState: ReservationSalesState = {
  myReservationSales: null,
};

const reservationSalesSlice = createSlice({
  name: sliceConstants.RESERVATION_SALES,
  initialState,
  reducers: {
    setMyReservationSales: (state, {payload}: PayloadAction<any[]>) => {
      state.myReservationSales = payload;
    },

    addMyReservationSale: (state, {payload}: PayloadAction<any>) => {
      if (!state.myReservationSales) {
        state.myReservationSales = [];
      }
      state.myReservationSales.push(payload);
    },

    updateMyReservationSale: (state, {payload}: PayloadAction<any>) => {
      if (!state.myReservationSales) {
        return;
      }
      const index = state.myReservationSales.findIndex(
        Sale => Sale.id === payload.id,
      );
      if (index !== -1) {
        state.myReservationSales[index] = payload;
      }
    },
    deleteMyReservationSale: (state, {payload}: PayloadAction<string>) => {
      if (!state.myReservationSales) {
        return;
      }
      state.myReservationSales = state.myReservationSales.filter(
        Sale => Sale.id !== payload,
      );
    },
  },
});

export const {
  setMyReservationSales,
  addMyReservationSale,
  updateMyReservationSale,
  deleteMyReservationSale,
} = reservationSalesSlice.actions;

export const reservationSalesActionCreators = {
  setMyReservationSales,
  addMyReservationSale,
  updateMyReservationSale,
  deleteMyReservationSale,
};

export default reservationSalesSlice.reducer;
