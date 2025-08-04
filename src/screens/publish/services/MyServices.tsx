import {useDeleteService, useGetMyServices} from '@hooks/api/service.rq';
import {useActions} from '@hooks/useActions';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {navigate} from '@utils/NavigationUtils';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ServicesListScreen} from './Services';

const MyServices: React.FC = () => {
  const {user} = useTypedSelector(state => state.auth);
  const {myServices} = useTypedSelector(state => state.services);
  const {data: services, isLoading, isError} = useGetMyServices(user?.id || '');
  const {mutateAsync: deleteService} = useDeleteService();
  const {deleteMyService, setMyServices} = useActions();

  //console.log('Services', JSON.stringify(services));

  useEffect(() => {
    if (services?.data) {
      setMyServices(services?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);

  //console.log('MyServices', JSON.stringify(MyServices));

  const handleEditService = (item: any) => {
    console.log('Edit Service', JSON.stringify(item));
    navigate('AddService', {serviceId: item.id});
  };

  const handleDeleteService = async (serviceId: string) => {
    const result = await deleteService({serviceId});
    if (result?.status === 204) {
      Alert.alert('Deleted Sucessfully!', `Service deleted sucessfully`);
      deleteMyService(serviceId);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#4D948E" />
      </View>
    );
  }

  if (!services || !services.data || services.data.length === 0) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.errorText}>No services found</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.errorText}>Failed to load service</Text>
        <TouchableOpacity style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  console.log('Services', services?.data);
  console.log('MyServices', myServices);
  return (
    <ServicesListScreen
      services={myServices}
      onEditService={handleEditService}
      onDeleteService={handleDeleteService}
    />
  );
};

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  errorText: {
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyServices;
