import Button from '@components/ui/Button';
import Typography from '@components/ui/Typography';
import {useDeleteAddress} from '@hooks/api/address.rq';
import {useActions} from '@hooks/useActions';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {navigate} from '@utils/NavigationUtils';
import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AddressListItem = ({item}: {item: any}) => {
  const {primaryId} = useTypedSelector(state => state.address);
  const {setPrimaryAddressId, deleteAddress} = useActions();

  const {mutateAsync: deleteAddressAPI} = useDeleteAddress();

  const handleDelete = async (id: string) => {
    const response = await deleteAddressAPI(id);
    if (response.error) {
      console.error('Error deleting address:', response.error);
    } else {
      deleteAddress(id);
      console.log('Address deleted successfully');
      // Optionally, you can refresh the address list or show a success message
    }
  };

  return (
    <TouchableOpacity
      style={[styles.item, item.id === primaryId && styles.primaryItem]}
      onPress={() => setPrimaryAddressId(item.id)}>
      <View style={styles.radioCircle}>
        {item.id === primaryId && <View style={styles.selectedRb} />}
      </View>
      <View>
        <Text style={styles.addressText}>{item.address_title}</Text>
        <Typography variant="caption">{item.city}</Typography>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label="Edit"
          size="small"
          onPress={() => navigate('AddEditAddress', {addressId: item.id})}
        />
        <Button
          label="Delete"
          size="small"
          variant="destructive"
          onPress={() =>
            Alert.alert(
              'Delete Address',
              'Are you sure you want to delete this address?',
              [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => handleDelete(item.id),
                },
              ],
            )
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default AddressListItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  primaryItem: {
    backgroundColor: '#d0ebff',
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007aff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007aff',
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
  primaryLabel: {
    fontSize: 12,
    color: '#007aff',
    marginTop: 2,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'flex-end',
    flex: 1,
  },
});
