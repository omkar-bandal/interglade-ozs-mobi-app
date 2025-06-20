import BookingSummary from '@features/booking-details/components/BookingSummary';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityDetailsScreen} from '@screens/activities/ActivityDetails';
import AddEditAddressScreen from '@screens/address/AddAddress';
import AddressList from '@screens/address/AddressList';
import {ForgotPassword} from '@screens/auth/ForgotPassword';
import {Login} from '@screens/auth/Login';
import {Register} from '@screens/auth/Register';
import {ResetPassword} from '@screens/auth/ResetPassword';
import ServiceDetailsScreen from '@screens/booking/ServiceDetails';
import LocationScreen from '@screens/location/Location';
import ConversationScreen from '@screens/messages/ConversationScreen';
import AddSale from '@screens/publish/sales/AddSale';
import SaleDetails from '@screens/publish/sales/SaleDetails';
import AddService from '@screens/publish/services/AddService';
import ServicesDetailsScreen from '@screens/publish/services/ServiceDetails';
import ReviewScreen from '@screens/review/Review';
import SearchAndFilterScreen from '@screens/SearchAndFilter';
import {focusManager} from '@tanstack/react-query';
import {navigationRef} from '@utils/NavigationUtils';
import React, {useEffect} from 'react';
import type {AppStateStatus} from 'react-native';
import {AppState, Platform} from 'react-native';
import {TabNavigator} from './TabNavigator';

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const Stack = createNativeStackNavigator();

const AppNavigation: React.FC = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name="Location" component={LocationScreen} />

        <Stack.Screen name="AddSale" component={AddSale} />
        <Stack.Screen name="MySaleDetails" component={SaleDetails} />

        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen
          name="MyServiceDetails"
          component={ServicesDetailsScreen}
        />

        <Stack.Screen
          name="ConversationScreen"
          component={ConversationScreen}
        />

        <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
        <Stack.Screen name="BookingSummary" component={BookingSummary} />

        <Stack.Screen
          name="ActivityDetails"
          component={ActivityDetailsScreen}
        />

        <Stack.Screen name="Review" component={ReviewScreen} />

        <Stack.Screen name="AddressList" component={AddressList} />
        <Stack.Screen name="AddEditAddress" component={AddEditAddressScreen} />

        <Stack.Screen
          name="SearchAndFilter"
          component={SearchAndFilterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
