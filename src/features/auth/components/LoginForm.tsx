import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import {FormInput} from '@components/auto-form/form-fields/Input';
import Button from '@components/ui/Button';
import {Form, FormButton} from '@components/ui/Form';
import {useLogin} from '@hooks/api/auth.rq';
import {useActions} from '@hooks/useActions';
import useForm from '@hooks/useForm';
import {LoginRequestParams} from '@services/auth/auth.model';
import {SPACING} from '@theme/constants';
import {navigate} from '@utils/NavigationUtils';
import {validationLoginFormSchema} from '../utils/validate';

export default function Login() {
  const {mutateAsync: login, isPending} = useLogin();
  const {setUser, setSession} = useActions();

  const formControl = useForm<any>(
    {
      email: '',
      password: '',
    },
    validationLoginFormSchema,
  );

  const handleLogin = async ({email, password}: LoginRequestParams) => {
    const {data, error} = await login({
      email: email,
      password: password,
    });

    if (data.user) {
      await navigate('Tab', {screen: 'Home'});
      setUser(data.user);
      Alert.alert('Error', JSON.stringify(data));
      setSession(data.session);
      return;
    }

    if (error?.message) {
      console.log('error', error.message);
      Alert.alert('Error', JSON.stringify(error.message));
    }
  };

  return (
    <Form style={styles.form}>
      <View style={styles.input}>
        <FormInput
          label="Email Address"
          placeholder="Enter your email"
          name="email"
          formControl={formControl}
          isRequired={true}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.input}>
        <FormInput
          label="Password"
          placeholder="Enter your password"
          name="password"
          formControl={formControl}
          isRequired={true}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.forgotPasswordContainer}>
        <Button
          size="small"
          variant="link"
          label="Forgot Password ?"
          onPress={() => navigate('ForgotPassword')}
        />
      </View>

      <View style={styles.formAction}>
        <FormButton
          label="Sign in"
          disabled={isPending}
          loading={isPending}
          formControl={formControl}
          onPress={handleLogin}
        />
      </View>
    </Form>
  );
}

const styles = StyleSheet.create({
  form: {},
  formAction: {
    marginBottom: 4,
  },
  input: {
    marginBottom: 1,
  },
  forgotPasswordContainer: {
    marginBottom: SPACING.md,
    alignItems: 'flex-end',
  },
});
