import {sliceConstants} from '@constants/slice.constant';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Sale {
  id: string;
  // Add other sale properties here
  // For example:
  // amount: number;
  // date: string;
  // customerId: string;
  [key: string]: any;
}

export interface SalesState {
  mySales: any[] | null;
}

const initialState: SalesState = {
  mySales: null,
};

const salesSlice = createSlice({
  name: sliceConstants.SALES,
  initialState,
  reducers: {
    setMySales: (state, {payload}: PayloadAction<any[]>) => {
      state.mySales = payload;
    },
    addSale: (state, {payload}: PayloadAction<any>) => {
      if (!state.mySales) {
        state.mySales = [];
      }
      state.mySales.push(payload);
    },
    updateMySale: (state, {payload}: PayloadAction<any>) => {
      if (!state.mySales) {
        return;
      }
      const index = state.mySales.findIndex(sale => sale.id === payload.id);
      if (index !== -1) {
        state.mySales[index] = payload;
      }
    },
    deleteMySale: (state, {payload}: PayloadAction<string>) => {
      if (!state.mySales) {
        return;
      }
      state.mySales = state.mySales.filter(sale => sale.id !== payload);
    },
    resetMySales: state => {
      state.mySales = null;
    },
  },
});

export const {setMySales, addSale, updateMySale, deleteMySale, resetMySales} =
  salesSlice.actions;

export const salesActionCreators = {
  setMySales,
  addSale,
  updateMySale,
  deleteMySale,
  resetMySales,
};

export default salesSlice.reducer;
