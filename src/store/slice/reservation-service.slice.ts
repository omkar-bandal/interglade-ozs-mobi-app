import {sliceConstants} from '@constants/slice.constant';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Service {
  id: string;
  [key: string]: any;
}

export interface ReservationServicesState {
  myServices: any[] | null;
}

const initialState: ReservationServicesState = {
  myServices: null,
};

const reservationServiceSlice = createSlice({
  name: sliceConstants.RESERVATION_SERVICE,
  initialState,
  reducers: {
    setMyServices: (state, {payload}: PayloadAction<any[]>) => {
      state.myServices = payload;
    },

    addMyService: (state, {payload}: PayloadAction<any>) => {
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
      state.myServices = state.myServices.filter(
        service => service.id !== payload,
      );
    },
  },
});

export const {setMyServices, addMyService, updateMyService, deleteMyService} =
  reservationServiceSlice.actions;

export const reservationServiceActionCreators = {
  setMyServices,
  addMyService,
  updateMyService,
  deleteMyService,
};

export default reservationServiceSlice.reducer;
