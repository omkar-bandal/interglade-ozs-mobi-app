/* eslint-disable react-native/no-inline-styles */
import {Heading} from '@features/account/components/Heading';
import PersonalInfoForm from '@features/account/components/PersonalInfo/PersonalInfoForm';
import useTheme from '@theme/useTheme';
import {SafeAreaView, StatusBar, View} from 'react-native';

export function PersonalInfo() {
  const {theme, themeType} = useTheme();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Heading title="Personal Information" />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 16,
          backgroundColor: theme.colors.background,
        }}>
        <PersonalInfoForm />
      </View>
    </SafeAreaView>
  );
}
