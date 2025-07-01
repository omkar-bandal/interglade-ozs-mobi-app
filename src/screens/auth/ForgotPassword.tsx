import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Container} from '@components/ui/Container';

import Button from '@components/ui/Button';
import ForgotPasswordForm from '@features/auth/components/ForgotPassword';
import {FONT_SIZE, SPACING} from '@theme/constants';
import lightTheme from '@theme/light';
import useTheme from '@theme/useTheme';
import {goBack} from '@utils/NavigationUtils';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function ForgotPassword() {
  const {theme} = useTheme();

  return (
    <Container style={{backgroundColor: theme.colors.background}}>
      <View style={styles.headerRow}>
        <Button
          variant="ghost"
          leftIcon={<Icon name="arrow-back" size={24} color={'#C49E00'} />}
          onPress={goBack}
        />
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>

      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Typography variant="h1" weight="bold">
            Forgot Password
          </Typography>

          <Typography variant="caption">Please enter your email</Typography>
        </View> */}

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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: SPACING.md,
    marginTop: 16,
  },
  headerText: {
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.lg,
    color: lightTheme.colors.primary,
    fontWeight: '800',
  },
});
