import SocialLogin from '@features/auth/components/SocialLogin';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotPassword} from '@screens/auth/ForgotPassword';
import {Login} from '@screens/auth/Login';
import {Register} from '@screens/auth/Register';
import {ResetPassword} from '@screens/auth/ResetPassword';
import React from 'react';
import {AuthStackParamList} from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SocialLogin" component={SocialLogin} />
    </Stack.Navigator>
  );
};

export default AuthStack;
