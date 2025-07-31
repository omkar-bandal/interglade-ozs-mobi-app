import {FormInput} from '@components/auto-form/form-fields/Input';
import Button from '@components/ui/Button';
import {Form, FormError, FormSuccess} from '@components/ui/Form';
import {validationAddressSchema} from '@features/account/utils/validate';
import {
  useCreateAddress,
  useGetAddressById,
  useUpdateAddress,
} from '@hooks/api/address.rq';
import useForm from '@hooks/useForm';
import {useTypedSelector} from '@hooks/useTypedSelector';
import React, {useState} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';

const AddEditAddress = ({addressId}: {addressId: string | undefined}) => {
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const {user} = useTypedSelector(state => state.auth);

  const {data: addressData, isLoading} = useGetAddressById(addressId || '');

  const formControl = useForm<any>(
    {
      address_title: addressData?.data.address_title || '',
      city: addressData?.data.city || '',
      //   zipCode: addressData?.data.zipCode || '',
    },
    validationAddressSchema,
  );

  const {mutateAsync: createAddress, isPending} = useCreateAddress(
    user?.id || '',
  );
  const {mutateAsync: updateAddress, isPending: isUpdating} =
    useUpdateAddress();

  const onSubmit = async (data: any) => {
    try {
      setFormError('');

      let result;
      if (addressId) {
        result = await updateAddress({...data, id: addressId});
      } else {
        result = await createAddress(data);
      }

      if (result.error) {
        setFormError(result.error.message);
        return;
      }

      setFormSuccess(
        'Your message has been sent successfully! We will contact you soon.',
      );

      // Reset form after successful submission
      formControl.reset();
    } catch (error) {
      setFormError('An error occurred. Please try again later.');
      console.error('Submission error:', error);
    }
  };

  const onError = (errors: any) => {
    console.log('Validation errors:', errors);
    setFormError('Please fix the errors in the form and try again.');
  };

  if (isLoading && addressId) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Form
        formControl={formControl}
        onSubmit={(data: any) => Alert.prompt(data)}>
        {/* Display form-level error or success message */}
        <FormError message={formError} />
        <FormSuccess message={formSuccess} />

        <FormInput
          label="Address Title"
          placeholder="Enter your Address Title"
          name="address_title"
          formControl={formControl}
          isRequired={true}
        />

        <FormInput
          label="City"
          placeholder="Enter your City"
          name="city"
          formControl={formControl}
          isRequired={true}
        />

        {/* <FormInput
          label="Zip Code"
          placeholder="Enter your Zip Code"
          name="zipCode"
          formControl={formControl}
          isRequired={true}
          keyboardType="numeric"
        /> */}

        {/* <FormCheckbox
          label="Is Default Address"
          name="isDefault"
          formControl={formControl}
        /> */}

        <Button
          label="Submit Address"
          onPress={formControl.handleSubmit(onSubmit, onError)}
          loading={isPending || isUpdating}
          disabled={isPending || isUpdating}
        />
      </Form>
    </View>
  );
};

export default AddEditAddress;

// const styles = StyleSheet.create({});
