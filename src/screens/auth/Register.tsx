import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Container} from '@components/ui/Container';
import Typography from '@components/ui/Typography';

import BreakerText from '@components/ui/BreakerText';
import Button from '@components/ui/Button';
import RegisterForm from '@features/auth/components/RegisterForm';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import Icon from 'react-native-vector-icons/AntDesign';

export function Register() {
  const {theme} = useTheme();

  return (
    <Container style={{backgroundColor: theme.colors.background}}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Typography variant="h1" weight="bold">
            Sign up to{' '}
            <Typography
              variant="h1"
              weight="bold"
              style={{color: theme.colors.primary}}>
              OZO
            </Typography>
          </Typography>

          <Typography variant="caption">
            Get access to your portfolio and more
          </Typography>
        </View>

        <RegisterForm />

        <BreakerText text="Or Continue with" />

        <View style={styles.socialContainer}>
          <Button
            label="Google"
            leftIcon={<Icon name="google" size={20} color="#fff" />}
            style={{backgroundColor: theme.colors.textDisabled}}
          />
          <Button
            label="Facebook"
            leftIcon={<Icon name="facebook-square" size={20} color="#fff" />}
            style={{backgroundColor: theme.colors.textDisabled}}
          />
        </View>

        <View style={styles.signUpContainer}>
          <Typography variant="body1">Have account</Typography>
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Typography
              variant="body1"
              style={[styles.signUpText, {color: theme.colors.primary}]}>
              Sign In
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <SocialLogin /> */}
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
  socialContainer: {
    gap: 2,
  },
  signUpContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  signUpText: {
    textDecorationLine: 'underline',
  },
});
