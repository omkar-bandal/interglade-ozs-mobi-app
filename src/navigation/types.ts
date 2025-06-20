import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Account Stack Navigation
export type AccountStackParamList = {
  Account: undefined;
  PersonalInfo: undefined;
  PaymentMethods: undefined;
  Notifications: undefined;
  Privacy: undefined;
  Settings: undefined;
};

// Auth Stack Navigation
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  SocialLogin: undefined;
};

// Messaging Stack Navigation
export type MessagingStackParamList = {
  Messages: undefined;
  Conversation: {id: string};
};

export type PublishStackParamList = {
  Publish: undefined;
  AddSale: undefined;
  AddService: undefined;
  SaleDetails: {id: string};
  ServiceDetails: {id: string};
};

// Sales Stack Navigation
export type SalesStackParamList = {
  Sales: undefined;
  AddSale: undefined;
  MySales: undefined;
  SaleDetails: {id: string};
};

// Services Stack Navigation
export type ServicesStackParamList = {
  Services: undefined;
  AddService: undefined;
  MyServices: undefined;
  ServiceDetails: {id: string};
};

// Bottom Tab Navigation
export type BottomTabParamList = {
  Home: undefined;
  Publish: NavigatorScreenParams<PublishStackParamList>;
  Messaging: NavigatorScreenParams<MessagingStackParamList>;
  Activity: NavigatorScreenParams<SalesStackParamList>;
  Account: NavigatorScreenParams<AccountStackParamList>;
};

// Screen Props Types
export type AccountScreenProps<T extends keyof AccountStackParamList> =
  NativeStackScreenProps<AccountStackParamList, T>;

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type MessagingScreenProps<T extends keyof MessagingStackParamList> =
  NativeStackScreenProps<MessagingStackParamList, T>;

export type PublishScreenProps<T extends keyof PublishStackParamList> =
  NativeStackScreenProps<PublishStackParamList, T>;

export type SalesScreenProps<T extends keyof SalesStackParamList> =
  NativeStackScreenProps<SalesStackParamList, T>;

export type ServicesScreenProps<T extends keyof ServicesStackParamList> =
  NativeStackScreenProps<ServicesStackParamList, T>;

export type CustomBottomTabScreenProps<T extends keyof BottomTabParamList> =
  BottomTabScreenProps<BottomTabParamList, T>;
