import {sliceConstants} from '@constants/slice.constant';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Address {
  id: string;
  profile_id: string;
  address_title: string;
  city: string;
  created_at?: string;
  [key: string]: any;
}

export interface AddressState {
  addresses: Address[] | null;
}

const initialState: AddressState = {
  addresses: null,
};

const addressSlice = createSlice({
  name: sliceConstants.ADDRESS,
  initialState,
  reducers: {
    setAddresses: (state, {payload}: PayloadAction<Address[]>) => {
      state.addresses = payload;
    },
    addAddress: (state, {payload}: PayloadAction<Address>) => {
      if (!state.addresses) {
        state.addresses = [];
      }
      state.addresses.push(payload);
    },
    updateAddress: (state, {payload}: PayloadAction<Address>) => {
      if (!state.addresses) {
        return;
      }
      const index = state.addresses.findIndex(addr => addr.id === payload.id);
      if (index !== -1) {
        state.addresses[index] = payload;
      }
    },
    deleteAddress: (state, {payload}: PayloadAction<string>) => {
      if (!state.addresses) {
        return;
      }
      state.addresses = state.addresses.filter(addr => addr.id !== payload);
    },
    resetAddresses: state => {
      state.addresses = null;
    },
  },
});

export const {
  setAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  resetAddresses,
} = addressSlice.actions;

export const addressActionCreators = {
  setAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  resetAddresses,
};

export default addressSlice.reducer;
