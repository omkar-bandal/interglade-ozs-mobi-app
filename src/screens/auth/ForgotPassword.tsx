import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Container} from '@components/ui/Container';
import Typography from '@components/ui/Typography';

import Button from '@components/ui/Button';
import ForgotPasswordForm from '@features/auth/components/ForgotPassword';
import useTheme from '@theme/useTheme';
import {goBack} from '@utils/NavigationUtils';
import Icon from 'react-native-vector-icons/Ionicons';

export function ForgotPassword() {
  const {theme} = useTheme();

  return (
    <Container style={{backgroundColor: theme.colors.background}}>
      <View>
        <Button
          variant="ghost"
          leftIcon={<Icon name="arrow-back" size={24} />}
          onPress={goBack}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Typography variant="h1" weight="bold">
            Forgot Password
          </Typography>

          <Typography variant="caption">Please enter your email</Typography>
        </View>

        <ForgotPasswordForm />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingHorizontal: 10,
    gap: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
});
