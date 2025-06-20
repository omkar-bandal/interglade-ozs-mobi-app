import {BaseStoreState} from '@models/base-store-state.model';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

export const useTypedSelector: TypedUseSelectorHook<BaseStoreState> =
  useSelector;
