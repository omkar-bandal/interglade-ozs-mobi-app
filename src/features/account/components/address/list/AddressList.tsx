import {useGetAllAddresses} from '@hooks/api/address.rq';
import {useActions} from '@hooks/useActions';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AddressListItem from './AddressListItem';

export const AddressList = () => {
  const isFocused = useIsFocused();
  const {user} = useTypedSelector(state => state.auth);
  const {addressList, primaryId} = useTypedSelector(state => state.address);

  const {setPrimaryAddressId, setAddressList} = useActions();

  const {data, isLoading, error} = useGetAllAddresses(
    user?.id || '',
    isFocused,
  );

  // Set default primary address when data is loaded
  useEffect(() => {
    if (data && data.length > 0 && primaryId === null) {
      const primary = data.find((addr: any) => addr.isPrimary);
      setPrimaryAddressId(primary ? primary.id : data[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data) {
      setAddressList(data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <ActivityIndicator style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error loading addresses.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={addressList}
      keyExtractor={(item: any) => item.id}
      renderItem={({item}) => <AddressListItem item={item} />}
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text>No addresses found</Text>
          <Text>Add a new address to get started</Text>
        </View>
      }
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
});
