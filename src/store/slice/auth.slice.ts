import {sliceConstants} from '@constants/slice.constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Session, User} from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
};

const authSlice = createSlice({
  name: sliceConstants.AUTH,
  initialState,
  reducers: {
    setUser: (state, {payload}: PayloadAction<User>) => {
      state.user = payload;
      AsyncStorage.setItem('user', JSON.stringify(payload));
    },
    setSession: (state, {payload}: PayloadAction<Session>) => {
      state.session = payload;
      AsyncStorage.setItem('session', JSON.stringify(payload));
    },
    resetAuth: state => {
      state.user = null;
      state.session = null;
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('session');
    },
  },
});

export const {setUser, setSession, resetAuth} = authSlice.actions;
export const authActionCreators = {
  setUser,
  setSession,
  resetAuth,
};
export default authSlice.reducer;
