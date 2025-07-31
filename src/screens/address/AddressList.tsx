import ScreenHeader from '@components/header/ScreenHeader';
import Button from '@components/ui/Button';
import {AddressList} from '@features/account/components/address/list/AddressList';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddressListScreen = () => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScreenHeader title="My Addresses" />

      {/* <ScrollView
        style={styles.scrollView}
        contentContainerStyle={
          addresses.length === 0 ? styles.emptyScrollContent : {}
        }
        showsVerticalScrollIndicator={false}>
        {addresses.length > 0 ? (
          addresses.map(address => (
            <AddressItem
              key={address.id}
              address={address}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetDefaultAddress}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No addresses found</Text>
            <Text style={styles.emptyStateSubText}>
              Add a new address to get started
            </Text>
          </View>
        )}
      </ScrollView> */}
      <AddressList />

      <View style={styles.buttonContainer}>
        <Button
          label="Add New Address"
          onPress={() => navigate('AddEditAddress')}
          leftIcon={<Icon name="add" size={16} color="#fff" />}
        />
      </View>
    </SafeAreaView>
  );
};

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: '#555555',
    },
    header: {
      padding: 16,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
      elevation: 2,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333333',
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
    },
    emptyScrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    addressItem: {
      backgroundColor: theme.components.card.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 1,
      padding: 16,
      marginBottom: 16,
      // shadowColor: '#000',
      // shadowOffset: {width: 0, height: 2},
      // shadowOpacity: 0.1,
      // shadowRadius: 4,
      elevation: 0.1,
    },
    addressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    addressTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 1,
    },
    addressTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginRight: 8,
    },
    defaultBadge: {
      backgroundColor: '#F0F7FF',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
    defaultBadgeText: {
      fontSize: 12,
      color: theme.colors.primary,
      fontWeight: '500',
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 2,
    },
    actionButton: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: '#F5F5F5',
    },
    editButtonText: {
      fontSize: 14,
      color: '#FFC163',
      fontWeight: '500',
    },
    deleteButton: {
      marginLeft: 8,
      backgroundColor: '#FFF2F2',
    },
    deleteButtonText: {
      fontSize: 14,
      color: '#FF5252',
      fontWeight: '500',
    },
    addressText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 4,
      lineHeight: 20,
    },
    setDefaultButton: {
      marginTop: 12,
      paddingVertical: 6,
      paddingHorizontal: 12,
      alignSelf: 'flex-start',
      borderRadius: 6,
      backgroundColor: theme.colors.card,
    },
    setDefaultText: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: '500',
    },
    buttonContainer: {
      padding: 16,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    addButton: {
      backgroundColor: '#FFC163',
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
      shadowColor: '#FFC163',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    },
    emptyStateText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333333',
      marginBottom: 8,
    },
    emptyStateSubText: {
      fontSize: 14,
      color: '#666666',
      textAlign: 'center',
    },
  });

export default AddressListScreen;
