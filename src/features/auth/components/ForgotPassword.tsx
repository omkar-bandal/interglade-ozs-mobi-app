import React from 'react';
import {StyleSheet, View} from 'react-native';

import {FormInput} from '@components/auto-form/form-fields/Input';
import {Form, FormButton} from '@components/ui/Form';
import {useForgotPassword} from '@hooks/api/auth.rq';
import {useActions} from '@hooks/useActions';
import useForm from '@hooks/useForm';
import {EmailRequestParams} from '@services/auth/auth.model';
import {SPACING} from '@theme/constants';
import {navigate} from '@utils/NavigationUtils';
import {validationLoginFormSchema} from '../utils/validate';

export default function ForgotPasswordForm() {
  const {mutateAsync: forgotPassword, isPending} = useForgotPassword();
  const {setUser, setSession} = useActions();

  const formControl = useForm<any>(
    {
      email: '',
    },
    validationLoginFormSchema,
  );

  const handleLogin = async ({email}: EmailRequestParams) => {
    const {data, error} = await forgotPassword({
      email: email,
    });

    if (data.user) {
      await navigate('HomeTab');
      setUser(data.user);
      setSession(data.session);
      return;
    }

    if (error?.message) {
      console.log('error', error.message);
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

      <View style={styles.formAction}>
        <FormButton
          label="Send"
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
