import {FormCheckbox} from '@components/auto-form/form-fields/Checkbox';
import {FormInput} from '@components/auto-form/form-fields/Input';
import ScreenHeader from '@components/header/ScreenHeader';
import {Form, FormButton, FormError} from '@components/ui/Form';
import {useCreateAddress, useUpdateAddress} from '@hooks/api/address.rq';
import useForm from '@hooks/useForm';
import {useTypedSelector} from '@hooks/useTypedSelector';
import useTheme from '@theme/useTheme';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Address} from './AddressList';

interface AddEditAddressScreenProps {
  navigation: any;
  route: {
    params: {
      address?: Address;
      mode: 'add' | 'edit';
    };
  };
}

const AddEditAddressScreen = ({navigation, route}: any) => {
  const {theme, themeType} = useTheme();
  const styles = themeStyles(theme);
  const {mode, address} = route.params || {mode: 'add'};
  //Alert.alert('Address data to edit', JSON.stringify(address, mode));
  const isEditMode = mode === 'edit';

  const [formError, setFormError] = useState('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [addressFromLocation, setAddressFromLocation] = useState<string>('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const {user} = useTypedSelector(state => state.auth);
  const {mutateAsync: createAddress, isPending} = useCreateAddress();
  const {mutateAsync: updateAddress} = useUpdateAddress();

  //const {mutateAsync: updateAddress, isPending} = useUpdateAddress();
  // Validation schema
  const validationSchema = {
    address_title: {
      required: {value: true, message: 'Address title is required'},
    },
    // address: {
    //   required: {value: true, message: 'Address line is required'},
    // },
    city: {
      required: {value: true, message: 'City is required'},
    },
    // state: {
    //   required: {value: true, message: 'State is required'},
    // },
    // zipCode: {
    //   required: {value: true, message: 'ZIP code is required'},
    //   pattern: {
    //     value: /^\d{5}(-\d{4})?$/,
    //     message: 'Please enter a valid ZIP code',
    //   },
    // },
  };

  // Initialize form with default values or existing address
  const formControl = useForm(
    {
      address_title: isEditMode ? address?.address_title || '' : '',
      // address: isEditMode ? address?.address || '' : '',
      city: isEditMode ? address?.city || '' : '',
      // state: isEditMode ? address?.state || '' : '',
      // zipCode: isEditMode ? address?.zipCode || '' : '',
      isDefault: isEditMode ? address?.isDefault || false : false,
    },
    validationSchema,
  );

  // Function to get current location
  const getCurrentLocation = () => {
    setIsLocationLoading(true);
    setFormError('');

    // Simulating geolocation API
    setTimeout(() => {
      try {
        // Mock successful location detection
        const mockLocation = {
          latitude: 37.7858,
          longitude: -122.4064,
        };
        setCurrentLocation(mockLocation);

        // Show modal to confirm location
        setShowLocationModal(true);

        // This would normally be a reverse geocoding call
        // Mock reverse geocoding result
        const mockAddress = {
          address: '123 Market Street',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94103',
        };

        setAddressFromLocation(
          `${mockAddress.address}, ${mockAddress.city}, ${mockAddress.state} ${mockAddress.zipCode}`,
        );

        // Update form values with detected address
        //formControl.setValue('address', mockAddress.address);
        formControl.setValue('city', mockAddress.city);
        //formControl.setValue('state', mockAddress.state);
        //formControl.setValue('zipCode', mockAddress.zipCode);
      } catch (error) {
        setFormError(
          'Failed to detect location. Please enter address manually.',
        );
        console.error('Location error:', error);
      } finally {
        setIsLocationLoading(false);
      }
    }, 2000);
  };

  // Apply detected location
  const applyDetectedLocation = () => {
    setShowLocationModal(false);
  };

  // Enter manually
  const enterManually = () => {
    //formControl.setValue('address', '');
    formControl.setValue('city', '');
    // formControl.setValue('state', '');
    // formControl.setValue('zipCode', '');
    setShowLocationModal(false);
  };

  // Form submission handler
  // const onSubmit = async (data: any) => {
  //   Alert.alert('Form Data', JSON.stringify(data, null, 2));
  //   try {
  //     setFormError('');

  //     const updatedAddress: Address = {
  //       //id: isEditMode ? address?.id || '0' : '0',
  //       profile_id: user?.id,
  //       address_title: data.address_title,
  //       city: data.city, // Make sure this matches your interface
  //       // address: data.address,
  //       // state: data.state,
  //       // zipCode: data.zipCode,
  //       // isDefault: data.isDefault,
  //       // latitude: currentLocation?.latitude || address?.latitude,
  //       // longitude: currentLocation?.longitude || address?.longitude,
  //     };

  //     const result = await createAddress(updatedAddress);

  //     if (isEditMode) {
  //       await updateAddress({id: address.id, ...updatedAddress});
  //     } else {
  //       await createAddress(updatedAddress);
  //     }
  //   } catch (error) {
  //     // Pass back the updated address to the list screen
  //     setFormError(
  //       'An error occurred. Please check your information and try again.',
  //     );
  //     console.error('Submission error:', error);
  //   }
  // };

  const onSubmit = async (data: any) => {
    try {
      setFormError('');

      const payload = {
        profile_id: user?.id,
        address_title: data.address_title,
        city: data.city,
      };

      if (isEditMode && address?.id) {
        const response = await updateAddress({
          address: payload,
          addressId: address.id,
        });
        if (response?.status === 204) {
          Alert.alert('Address updated successfully');
        }
        navigation.navigate('AddressList', {
          updatedAddress: {
            id: address.id,
            ...payload,
            isDefault: data.isDefault, // Include if you're managing this in local state
          },
        });
      } else {
        const response = await createAddress(payload);
        navigation.navigate('AddressList', {
          updatedAddress: {
            ...response.data,
            isDefault: data.isDefault,
          },
        });
      }

      //navigation.navigate('AddressList');
    } catch (error: any) {
      console.error('Submission error:', error);

      Alert.alert(
        'Error',
        error?.message || 'Something went wrong. Please try again.',
      );

      setFormError('Something went wrong. Please try again.');
    }
  };

  // Handle validation errors
  const onError = (errors: any) => {
    console.log('Validation errors:', errors);
    setFormError('Please fix the errors in the form and try again.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
      />

      <ScreenHeader title={isEditMode ? 'Edit Address' : 'Add New Address'} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Location Button */}
          {!isEditMode && (
            <TouchableOpacity
              style={styles.locationButton}
              onPress={getCurrentLocation}
              disabled={isLocationLoading}>
              {isLocationLoading ? (
                <View style={styles.locationButtonContent}>
                  <ActivityIndicator size="small" color="#4D948E" />
                  <Text style={styles.locationButtonText}>
                    Detecting location...
                  </Text>
                </View>
              ) : (
                <View style={styles.locationButtonContent}>
                  <Text style={styles.locationButtonText}>
                    Use Current Location
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {/* Form */}
          <Form formControl={formControl} style={styles.form}>
            <FormError message={formError} />

            <View style={styles.formGroup}>
              <Text style={styles.sectionTitle}>Address Details</Text>

              <FormInput
                label="Address Title"
                placeholder="Home, Work, etc."
                name="address_title"
                formControl={formControl}
                isRequired={true}
                autoCapitalize="words"
              />

              {/* <FormInput
                label="Address Line"
                placeholder="Street address, building, etc."
                name="address"
                formControl={formControl}
                isRequired={false}
                autoCapitalize="words"
              /> */}

              <View style={styles.row}>
                <View style={styles.column}>
                  <FormInput
                    label="City"
                    placeholder="City"
                    name="city"
                    formControl={formControl}
                    isRequired={true}
                    autoCapitalize="words"
                  />
                </View>

                {/* <View style={styles.halfColumn}>
                  <FormInput
                    label="State"
                    placeholder="State"
                    name="state"
                    formControl={formControl}
                    isRequired={false}
                    autoCapitalize="characters"
                    maxLength={2}
                  />
                </View> */}

                {/* <View style={styles.halfColumn}>
                  <FormInput
                    label="ZIP Code"
                    placeholder="ZIP"
                    name="zipCode"
                    formControl={formControl}
                    isRequired={false}
                    keyboardType="numeric"
                    maxLength={10}
                  />
                </View> */}
              </View>

              <FormCheckbox
                label="Set as default address"
                name="isDefault"
                formControl={formControl}
              />
            </View>

            {/* Save Button */}
            <FormButton
              label="Save Address"
              loading={isPending}
              onPress={formControl.handleSubmit(onSubmit, onError)}
            />
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Location Confirmation Modal */}
      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Location Detected</Text>
            <Text style={styles.modalText}>
              We've detected your current location:
            </Text>
            <Text style={styles.detectedAddress}>{addressFromLocation}</Text>

            <TouchableOpacity
              style={styles.modalPrimaryButton}
              onPress={applyDetectedLocation}>
              <Text style={styles.modalPrimaryButtonText}>
                Use This Address
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={enterManually}>
              <Text style={styles.modalSecondaryButtonText}>
                Enter Manually
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    keyboardContainer: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      elevation: 2,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    backButton: {
      padding: 4,
    },
    backButtonText: {
      fontSize: 16,
      color: '#4A90E2',
    },
    headerRight: {
      width: 60, // For layout balance
    },
    scrollView: {
      flex: 1,
      padding: 16,
    },
    locationButton: {
      backgroundColor: '#4A90E2',
      borderRadius: 10,
      padding: 14,
      marginBottom: 20,
      alignItems: 'center',
      shadowColor: '#4A90E2',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 3,
    },
    locationButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    locationIcon: {
      fontSize: 18,
      marginRight: 8,
    },
    locationButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
    },
    form: {
      flex: 1,
    },
    formGroup: {
      padding: 16,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.primary,
      marginBottom: 16,
    },
    row: {
      flexDirection: 'row',
      marginLeft: -8,
      marginRight: -8,
    },
    column: {
      flex: 2,
      paddingHorizontal: 8,
    },
    halfColumn: {
      flex: 1,
      paddingHorizontal: 8,
    },
    saveButton: {
      backgroundColor: '#4CAF50',
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
      shadowColor: '#4CAF50',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
      marginBottom: 12,
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    cancelButton: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
      marginBottom: 20,
    },
    cancelButtonText: {
      color: '#555555',
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    modalContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 24,
      width: '90%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 12,
    },
    modalText: {
      fontSize: 14,
      color: '#666666',
      marginBottom: 8,
      textAlign: 'center',
    },
    detectedAddress: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333333',
      marginBottom: 20,
      textAlign: 'center',
    },
    modalPrimaryButton: {
      backgroundColor: '#4A90E2',
      borderRadius: 8,
      padding: 14,
      width: '100%',
      alignItems: 'center',
      marginBottom: 12,
    },
    modalPrimaryButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
    },
    modalSecondaryButton: {
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
      padding: 14,
      width: '100%',
      alignItems: 'center',
    },
    modalSecondaryButtonText: {
      color: '#555555',
      fontSize: 16,
    },
  });

export default AddEditAddressScreen;
