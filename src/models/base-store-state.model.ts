import {AuthState} from '@store/slice/auth.slice';
import {CartState} from '@store/slice/cart.slice';
import {SalesState} from '@store/slice/sales.slice';
import {ServicesState} from '@store/slice/services.slice';
import {SuccessState} from '@store/slice/success.slice';

export interface BaseStoreState {
  auth: AuthState;
  success: SuccessState;
  sales: SalesState;
  services: ServicesState;
  cart: CartState;
}
