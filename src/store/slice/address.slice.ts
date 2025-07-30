import {sliceConstants} from '@constants/slice.constant';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Address {
  id: string;
  profile_id: string;
  address_title: string;
  city: string;
  created_at?: string;
  isDefault: boolean;
  [key: string]: any;
}

export interface AddressState {
  myAddress: Address[] | null;
}

const initialState: AddressState = {
  myAddress: null,
};

const addressSlice = createSlice({
  name: sliceConstants.ADDRESS,
  initialState,
  reducers: {
    setMyAddresses: (state, {payload}: PayloadAction<Address[]>) => {
      state.myAddress = payload;
    },
    addMyAddress: (state, {payload}: PayloadAction<Address>) => {
      if (!state.myAddress) {
        state.myAddress = [];
      }
      state.myAddress.push(payload);
    },
    updateMyAddress: (state, {payload}: PayloadAction<Address>) => {
      if (!state.myAddress) {
        return;
      }
      const index = state.myAddress.findIndex(addr => addr.id === payload.id);
      if (index !== -1) {
        state.myAddress[index] = payload;
      }
    },
    deleteMyAddress: (state, {payload}: PayloadAction<string>) => {
      if (!state.myAddress) {
        return;
      }
      state.myAddress = state.myAddress.filter(addr => addr.id !== payload);
    },
    resetMyAddresses: state => {
      state.myAddress = null;
    },
    setDefaultAddress: (state, {payload}: PayloadAction<string>) => {
      if (!state.myAddress) {
        return;
      }

      state.myAddress = state.myAddress.map(addr => ({
        ...addr,
        isDefault: addr.id === payload, // Set only the selected one as default
      }));
    },
  },
});

export const {
  setMyAddresses,
  addMyAddress,
  updateMyAddress,
  deleteMyAddress,
  resetMyAddresses,
  setDefaultAddress,
} = addressSlice.actions;

export const addressActionCreators = {
  setMyAddresses,
  addMyAddress,
  updateMyAddress,
  deleteMyAddress,
  resetMyAddresses,
  setDefaultAddress,
};

export default addressSlice.reducer;
