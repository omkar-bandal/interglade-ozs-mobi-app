import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import {AppState} from 'react-native';
import 'react-native-url-polyfill/auto';
import type {Database} from './types';

const SUPABASE_URL = 'https://wrcluqeamjnzjmpwxiet.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyY2x1cWVhbWpuemptcHd4aWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMzgwOTcsImV4cCI6MjA1MTYxNDA5N30.cVSnVo93iF5HCNNm9kQPj_eNBUHC_8FOlb_lM8VEGMQ';

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
);

AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
