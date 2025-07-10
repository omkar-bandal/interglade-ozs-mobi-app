/* eslint-disable react-native/no-inline-styles */
import {FormCheckbox} from '@components/auto-form/form-fields/Checkbox';
import {FormInput} from '@components/auto-form/form-fields/Input';
import {Form, FormButton} from '@components/ui/Form';
import {useRegister} from '@hooks/api/auth.rq';
import {useActions} from '@hooks/useActions';
import useForm from '@hooks/useForm';
import {RegisterRequestParams} from '@services/auth/auth.model';
import {navigate} from '@utils/NavigationUtils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {validationLoginFormSchema} from '../utils/validate';

export default function RegisterForm() {
  const {mutateAsync: register, isPending} = useRegister();
  const {setUser, setSession} = useActions();

  const formControl = useForm<any>(
    {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    validationLoginFormSchema,
  );

  const handleRegister = async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterRequestParams) => {
    const {data, error} = await register({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    if (data.user) {
      formControl.reset();
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
      <View style={styles.nameContainer}>
        <View style={[styles.input, {flex: 1}]}>
          <FormInput
            label="First Name"
            placeholder="Enter First Name"
            name="firstName"
            formControl={formControl}
            isRequired={true}
          />
        </View>
        <View style={[styles.input, {flex: 1}]}>
          <FormInput
            label="Last Name"
            placeholder="Enter Last Name"
            name="lastName"
            formControl={formControl}
            isRequired={true}
          />
        </View>
      </View>

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

      <View style={styles.input}>
        <FormCheckbox
          label="Accept Terms and Conditions"
          name="terms"
          formControl={formControl}
        />
      </View>

      <View style={styles.formAction}>
        <FormButton
          label="Create Account"
          disabled={isPending}
          loading={isPending}
          formControl={formControl}
          onPress={handleRegister}
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
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
});
