import {sliceConstants} from '@constants/slice.constant';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Sale {
  id: string;
  [key: string]: any;
}

export interface ReservationSalesState {
  mySales: any[] | null;
}

const initialState: ReservationSalesState = {
  mySales: null,
};

const reservationSalesSlice = createSlice({
  name: sliceConstants.RESERVATION_SALES,
  initialState,
  reducers: {
    setMySales: (state, {payload}: PayloadAction<any[]>) => {
      state.mySales = payload;
    },

    addMySale: (state, {payload}: PayloadAction<any>) => {
      if (!state.mySales) {
        state.mySales = [];
      }
      state.mySales.push(payload);
    },

    updateMySale: (state, {payload}: PayloadAction<any>) => {
      if (!state.mySales) {
        return;
      }
      const index = state.mySales.findIndex(Sale => Sale.id === payload.id);
      if (index !== -1) {
        state.mySales[index] = payload;
      }
    },
    deleteMySale: (state, {payload}: PayloadAction<string>) => {
      if (!state.mySales) {
        return;
      }
      state.mySales = state.mySales.filter(Sale => Sale.id !== payload);
    },
  },
});

export const {setMySales, addMySale, updateMySale, deleteMySale} =
  reservationSalesSlice.actions;

export const reservationSalesActionCreators = {
  setMySales,
  addMySale,
  updateMySale,
  deleteMySale,
};

export default reservationSalesSlice.reducer;
