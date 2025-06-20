import {sliceConstants} from '@constants/slice.constant';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Service {
  id: string;
  // Add other sale properties here
  // For example:
  // amount: number;
  // date: string;
  // customerId: string;
  [key: string]: any;
}

export interface ServicesState {
  myServices: any[] | null;
}

const initialState: ServicesState = {
  myServices: null,
};

const servicesSlice = createSlice({
  name: sliceConstants.SERVICES,
  initialState,
  reducers: {
    setMyServices: (state, {payload}: PayloadAction<any[]>) => {
      state.myServices = payload;
    },
    addService: (state, {payload}: PayloadAction<any>) => {
      if (!state.myServices) {
        state.myServices = [];
      }
      state.myServices.push(payload);
    },
    updateMyService: (state, {payload}: PayloadAction<any>) => {
      if (!state.myServices) {
        return;
      }
      const index = state.myServices.findIndex(
        service => service.id === payload.id,
      );
      if (index !== -1) {
        state.myServices[index] = payload;
      }
    },
    deleteMyService: (state, {payload}: PayloadAction<string>) => {
      if (!state.myServices) {
        return;
      }
      state.myServices = state.myServices.filter(sale => sale.id !== payload);
    },
    resetMyServices: state => {
      state.myServices = null;
    },
  },
});

export const {
  setMyServices,
  addService,
  updateMyService,
  deleteMyService,
  resetMyServices,
} = servicesSlice.actions;

export const servicesActionCreators = {
  setMyServices,
  addService,
  updateMyService,
  deleteMyService,
  resetMyServices,
};

export default servicesSlice.reducer;
