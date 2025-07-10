/* eslint-disable react-native/no-inline-styles */
import {Container} from '@components/ui/Container';
import {Heading} from '@features/account/components/Heading';
import PersonalInfoForm from '@features/account/components/PersonalInfo/PersonalInfoForm';
import darkTheme from '@theme/dark';
import {View} from 'react-native';

export function PersonalInfo() {
  return (
    <Container>
      <Heading title="Personal Information" />
      <View style={{flex: 1, paddingHorizontal: 16, paddingTop: 16, backgroundColor: darkTheme.colors.background}}>
        <PersonalInfoForm />
      </View>
    </Container>
  );
}
