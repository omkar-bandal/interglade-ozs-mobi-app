import {sliceConstants} from '@constants/slice.constant';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Service {
  id: string;
  [key: string]: any;
}

export interface ReservationServicesState {
  myReservationServices: any[] | null;
}

const initialState: ReservationServicesState = {
  myReservationServices: null,
};

const reservationServiceSlice = createSlice({
  name: sliceConstants.RESERVATION_SERVICE,
  initialState,
  reducers: {
    setMyReservationServices: (state, {payload}: PayloadAction<any[]>) => {
      state.myReservationServices = payload;
    },

    addMyReservationService: (state, {payload}: PayloadAction<any>) => {
      if (!state.myReservationServices) {
        state.myReservationServices = [];
      }
      state.myReservationServices.push(payload);
    },

    updateMyReservationService: (state, {payload}: PayloadAction<any>) => {
      if (!state.myReservationServices) {
        return;
      }
      const index = state.myReservationServices.findIndex(
        service => service.id === payload.id,
      );
      if (index !== -1) {
        state.myReservationServices[index] = payload;
      }
    },
    deleteMyReservationService: (state, {payload}: PayloadAction<string>) => {
      if (!state.myReservationServices) {
        return;
      }
      state.myReservationServices = state.myReservationServices.filter(
        service => service.id !== payload,
      );
    },
  },
});

export const {
  setMyReservationServices,
  addMyReservationService,
  updateMyReservationService,
  deleteMyReservationService,
} = reservationServiceSlice.actions;

export const reservationServiceActionCreators = {
  setMyReservationServices,
  addMyReservationService,
  updateMyReservationService,
  deleteMyReservationService,
};

export default reservationServiceSlice.reducer;
