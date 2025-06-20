import {authActionCreators} from '@store/slice/auth.slice';
import {cartActionCreators} from '@store/slice/cart.slice';
import {salesActionCreators} from '@store/slice/sales.slice';
import {servicesActionCreators} from '@store/slice/services.slice';
import {successActionCreators} from '@store/slice/success.slice';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...authActionCreators,
      ...successActionCreators,
      ...salesActionCreators,
      ...servicesActionCreators,
      ...cartActionCreators,
    },
    dispatch,
  );
};
