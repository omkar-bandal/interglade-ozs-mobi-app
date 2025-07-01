/* eslint-disable react-native/no-inline-styles */
import {Container} from '@components/ui/Container';
import {Heading} from '@features/account/components/Heading';
import PersonalInfoForm from '@features/account/components/PersonalInfo/PersonalInfoForm';
import {View} from 'react-native';

export function PersonalInfo() {
  return (
    <Container>
      <Heading title="Personal Information" />
      <View style={{flex: 1, paddingHorizontal: 16, paddingTop: 16}}>
        <PersonalInfoForm />
      </View>
    </Container>
  );
}
