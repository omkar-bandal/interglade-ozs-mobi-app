import {FormInput} from '@components/auto-form/form-fields/Input';
import {Form, FormButton} from '@components/ui/Form';
import useForm from '@hooks/useForm';
import {SPACING} from '@theme/constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const PersonalInfoForm = () => {
  const formControl = useForm<any>(
    {
      surname: '',
      name: '',
      email: '',
      mobileNo: '',
    },
    //validationLoginFormSchema,
  );

  const handleRegister = () => {};
  return (
    <Form style={styles.form}>
      <View style={styles.input}>
        <FormInput
          label="Surname"
          placeholder="Add your surname"
          name="surname"
          formControl={formControl}
          isRequired={true}
        />
      </View>
      <View style={styles.input}>
        <FormInput
          label="Name"
          placeholder="Add your name"
          name="name"
          formControl={formControl}
          isRequired={true}
        />
      </View>

      <View style={styles.input}>
        <FormInput
          label="Email Address"
          placeholder="Add your email"
          name="email"
          formControl={formControl}
          isRequired={true}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.input}>
        <FormInput
          label="Mobile Number"
          placeholder="Enter your mobile number"
          name="mobileNo"
          formControl={formControl}
          isRequired={true}
          keyboardType="phone-pad"
        />
      </View>

      <View style={[styles.formAction, {paddingTop: SPACING.md}]}>
        <FormButton
          label="Save Changes"
          //disabled={isPending}
          //loading={isPending}
          formControl={formControl}
          onPress={handleRegister}
        />
      </View>
    </Form>
  );
};

export default PersonalInfoForm;

const styles = StyleSheet.create({
  form: {
    paddingVertical: SPACING.md,
  },
  formAction: {
    marginBottom: SPACING.md,
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
