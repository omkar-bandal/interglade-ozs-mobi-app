import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {Container} from '@components/ui/Container';
import Typography from '@components/ui/Typography';
import LoginForm from '@features/auth/components/LoginForm';

import BreakerText from '@components/ui/BreakerText';
import Button from '@components/ui/Button';
import FBLogin from '@features/auth/components/FBLogin';
import GoogleLogin from '@features/auth/components/GoogleLogin';
import Tab from '@features/auth/components/TabSelector';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';

export function Login() {
  const {theme} = useTheme();
  const {user} = useTypedSelector(state => state.auth);

  useEffect(() => {
    if (user?.id) {
      setTimeout(() => {
        navigate('Tab', {screen: 'Home'});
      }, 0);
    }
  }, [user]);

  return (
    <Container style={{backgroundColor: theme.colors.background}}>
      <ScrollView style={styles.container}>
        <View style={[styles.header]}>
          <Typography variant="h1" weight="bold">
            Welcome to{' '}
            <Typography
              variant="h1"
              weight="bold"
              style={{color: theme.colors.primary}}>
              OZO
            </Typography>
          </Typography>

          <Typography variant="caption">
            Login to access your account
          </Typography>
        </View>

        <View style={[styles.header]}>
          <Tab selectedTab={'Login'} onTabSelect={() => navigate('Register')} />
        </View>

        <LoginForm />

        <BreakerText text="Or Continue with" />

        <View style={styles.socialContainer}>
          <GoogleLogin />
          <FBLogin />
        </View>

        {/* <View style={styles.signUpContainer}>
          <Typography variant="body1">Don't have account</Typography>
          <TouchableOpacity onPress={() => navigate('Register')}>
            <Typography
              variant="body1"
              style={[styles.signUpText, {color: theme.colors.primary}]}>
              Sign Up
            </Typography>
          </TouchableOpacity>
        </View> */}

        <View style={styles.skipContainer}>
          <Button
            size="small"
            variant="outline"
            label="Skip"
            onPress={() => navigate('Tab', {screen: 'Home'})}
          />
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
  skipContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  socialContainer: {
    marginBottom: SPACING.md,
    gap: 5,
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
