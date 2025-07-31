import {sliceConstants} from '@constants/slice.constant';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Address {
  primaryId: string | null;
  addressList: any[]; // Adjust type as needed
}

export interface AddressState {
  primaryId: string | null;
  addressList: any[];
}

const initialState: AddressState = {
  primaryId: null,
  addressList: [],
};

const addressSlice = createSlice({
  name: sliceConstants.ADDRESS,
  initialState,
  reducers: {
    setPrimaryAddressId: (state, {payload}: PayloadAction<string | null>) => {
      state.primaryId = payload;
    },
    setAddressList: (state, {payload}: PayloadAction<any[]>) => {
      // Assuming payload is an array of addresses
      state.addressList = payload;
    },
    updateAddress: (
      state,
      {payload}: PayloadAction<{id: string; data: any}>,
    ) => {
      const {id, data} = payload;
      const index = state.addressList.findIndex(address => address.id === id);
      if (index !== -1) {
        state.addressList[index] = {...state.addressList[index], ...data};
      }
    },
    deleteAddress: (state, {payload}: PayloadAction<string>) => {
      state.addressList = state.addressList.filter(
        address => address.id !== payload,
      );
      if (state.primaryId === payload) {
        state.primaryId = null; // Reset primaryId if deleted address was primary
      }
    },
  },
});

export const {
  setPrimaryAddressId,
  setAddressList,
  updateAddress,
  deleteAddress,
} = addressSlice.actions;

export const addressActionCreators = {
  setPrimaryAddressId,
  setAddressList,
  updateAddress,
  deleteAddress,
};

export default addressSlice.reducer;

// import {sliceConstants} from '@constants/slice.constant';
// import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// export interface Address {
//   id: string;
//   profile_id: string;
//   address_title: string;
//   city: string;
//   created_at?: string;
//   isDefault: boolean;
//   [key: string]: any;
// }

// export interface AddressState {
//   myAddress: Address[] | null;
// }

// const initialState: AddressState = {
//   myAddress: null,
// };

// const addressSlice = createSlice({
//   name: sliceConstants.ADDRESS,
//   initialState,
//   reducers: {
//     setMyAddresses: (state, {payload}: PayloadAction<Address[]>) => {
//       state.myAddress = payload;
//     },
//     addMyAddress: (state, {payload}: PayloadAction<Address>) => {
//       if (!state.myAddress) {
//         state.myAddress = [];
//       }
//       state.myAddress.push(payload);
//     },
//     updateMyAddress: (state, {payload}: PayloadAction<Address>) => {
//       if (!state.myAddress) {
//         return;
//       }
//       const index = state.myAddress.findIndex(addr => addr.id === payload.id);
//       if (index !== -1) {
//         state.myAddress[index] = payload;
//       }
//     },
//     deleteMyAddress: (state, {payload}: PayloadAction<string>) => {
//       if (!state.myAddress) {
//         return;
//       }
//       state.myAddress = state.myAddress.filter(addr => addr.id !== payload);
//     },
//     resetMyAddresses: state => {
//       state.myAddress = null;
//     },
//     setDefaultAddress: (state, {payload}: PayloadAction<string>) => {
//       if (!state.myAddress) {
//         return;
//       }

//       state.myAddress = state.myAddress.map(addr => ({
//         ...addr,
//         isDefault: addr.id === payload, // Set only the selected one as default
//       }));
//     },
//   },
// });

// export const {
//   setMyAddresses,
//   addMyAddress,
//   updateMyAddress,
//   deleteMyAddress,
//   resetMyAddresses,
//   setDefaultAddress,
// } = addressSlice.actions;

// export const addressActionCreators = {
//   setMyAddresses,
//   addMyAddress,
//   updateMyAddress,
//   deleteMyAddress,
//   resetMyAddresses,
//   setDefaultAddress,
// };

// export default addressSlice.reducer;
