import ScreenHeader from '@components/header/ScreenHeader';
import Button from '@components/ui/Button';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Sample data for addresses
const SAMPLE_ADDRESSES = [
  {
    id: '1',
    title: 'Home',
    address: '123 Maple Street, Apartment 4B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107',
    isDefault: true,
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: '2',
    title: 'Work',
    address: '456 Market Street, Suite 200',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    isDefault: false,
    latitude: 37.7899,
    longitude: -122.3995,
  },
  {
    id: '3',
    title: "Parent's House",
    address: '789 Oak Avenue',
    city: 'Oakland',
    state: 'CA',
    zipCode: '94610',
    isDefault: false,
    latitude: 37.8044,
    longitude: -122.2712,
  },
];

export interface Address {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}

interface AddressItemProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const AddressItem = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressItemProps) => {
  const confirmDelete = () => {
    Alert.alert(
      'Delete Address',
      `Are you sure you want to delete "${address.title}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => onDelete(address.id),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.addressItem}>
      <View style={styles.addressHeader}>
        <View style={styles.addressTitleContainer}>
          <Text style={styles.addressTitle}>{address.title}</Text>
          {address.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
        </View>
        <View style={styles.actionButtons}>
          <Button
            variant="outline"
            size="small"
            label="Edit"
            onPress={() => onEdit(address)}
          />
          <Button
            variant="destructive"
            size="small"
            label="Delete"
            onPress={confirmDelete}
          />
        </View>
      </View>

      <Text style={styles.addressText}>{address.address}</Text>
      <Text style={styles.addressText}>
        {address.city}, {address.state} {address.zipCode}
      </Text>

      {!address.isDefault && (
        <TouchableOpacity
          onPress={() => onSetDefault(address.id)}
          style={styles.setDefaultButton}>
          <Text style={styles.setDefaultText}>Set as default</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

interface AddressListScreenProps {
  navigation: any;
}

const AddressListScreen = ({navigation}: AddressListScreenProps) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data loading
  useEffect(() => {
    setTimeout(() => {
      setAddresses(SAMPLE_ADDRESSES);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleEditAddress = (address: Address) => {
    navigation.navigate('AddEditAddress', {address, mode: 'edit'});
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map(address => ({
        ...address,
        isDefault: address.id === id,
      })),
    );
  };

  const handleAddNewAddress = () => {
    navigation.navigate('AddEditAddress', {mode: 'add'});
  };

  // Simulated add/update handler that would be called from the add/edit screen
  const handleAddressUpdate = (address: Address, mode: 'add' | 'edit') => {
    if (mode === 'add') {
      const newAddress = {
        ...address,
        id: (addresses.length + 1).toString(),
        isDefault: addresses.length === 0 ? true : address.isDefault,
      };

      if (newAddress.isDefault) {
        // Make sure only one address is default
        setAddresses(prevAddresses => [
          ...prevAddresses.map(a => ({...a, isDefault: false})),
          newAddress,
        ]);
      } else {
        setAddresses(prevAddresses => [...prevAddresses, newAddress]);
      }
    } else {
      // Edit mode
      setAddresses(prevAddresses => {
        const newAddresses = prevAddresses.map(a =>
          a.id === address.id
            ? address
            : address.isDefault
            ? {...a, isDefault: false}
            : a,
        );
        return newAddresses;
      });
    }
  };

  // This would typically be registered through navigation
  useEffect(() => {
    // Simulate navigation params for testing
    if (navigation.addListener) {
      const unsubscribe = navigation.addListener('focus', () => {
        // Check for params that would be passed back from the add/edit screen
        const params =
          navigation.getParam && navigation.getParam('updatedAddress');
        const mode = navigation.getParam && navigation.getParam('mode');

        if (params && mode) {
          handleAddressUpdate(params, mode);
        }
      });

      return unsubscribe;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FFC163" />
        <Text style={styles.loadingText}>Loading addresses...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <ScreenHeader title="My Addresses" />

      {/* Address List */}
      <ScrollView
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
      </ScrollView>

      {/* Add New Address Button */}
      <View style={styles.buttonContainer}>
        <Button
          label="Add New Address"
          onPress={handleAddNewAddress}
          leftIcon={<Icon name="add" size={16} color="#fff" />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    color: '#333333',
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: {
    fontSize: 12,
    color: '#FFC163',
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
    color: '#666666',
    marginBottom: 4,
    lineHeight: 20,
  },
  setDefaultButton: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderRadius: 6,
    backgroundColor: '#F0F7FF',
  },
  setDefaultText: {
    fontSize: 14,
    color: '#FFC163',
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
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
