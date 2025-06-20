import {sliceConstants} from '@constants/slice.constant';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SuccessState {
  isSuccess: boolean;
}

const initialState: SuccessState = {
  isSuccess: false,
};

const successSlice = createSlice({
  name: sliceConstants.SUCCESS,
  initialState,
  reducers: {
    setSuccess: (state, {payload}: PayloadAction<boolean>) => {
      state.isSuccess = payload;
    },
  },
});

export const {setSuccess} = successSlice.actions;
export const successActionCreators = {
  setSuccess,
};
export default successSlice.reducer;
