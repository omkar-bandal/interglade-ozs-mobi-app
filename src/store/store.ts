import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import addressReducer from './slice/address.slice';
import authReducer from './slice/auth.slice';
import cartReducer from './slice/cart.slice';
import reservationSalesReducer from './slice/reservation-sales.slice';
import reservationServiceReducer from './slice/reservation-service.slice';
import salesReducer from './slice/sales.slice';
import servicesReducer from './slice/services.slice';
import successReducer from './slice/success.slice';

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  //   whitelist: ['auth'], // Reducers you want to persist
};

const rootReducer = combineReducers({
  auth: authReducer,
  success: successReducer,
  sales: salesReducer,
  services: servicesReducer,
  cart: cartReducer,
  reservationService: reservationServiceReducer,
  reservationSales: reservationSalesReducer,
  address: addressReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
