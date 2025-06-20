import AppNavigation from '@navigation/AppNavigation';
import {persistor, store} from '@store/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from './src/theme/ThemeProvider';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     SplashScreen.hide();
  //   }
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <ThemeProvider>
              {/* <RootNavigation /> */}
              <AppNavigation />
            </ThemeProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
