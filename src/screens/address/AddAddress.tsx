import ScreenHeader from '@components/header/ScreenHeader';
import AddEditAddress from '@features/account/components/address/form/AddEditAddress';
import useTheme from '@theme/useTheme';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';

const AddEditAddressScreen = ({route}: any) => {
  const {addressId} = route.params || {};
  const isEditMode = !!addressId;
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  console.log('AddEditAddressScreen addressId:', addressId);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScreenHeader title={isEditMode ? 'Edit Address' : 'Add New Address'} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <AddEditAddress addressId={addressId} />
        </ScrollView>
      </KeyboardAvoidingView>
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
