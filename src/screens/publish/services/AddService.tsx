import ScreenHeader from '@components/header/ScreenHeader';
import SuccessScreen from '@components/Success';
import AddServiceForm from '@features/services/components/AddServiceForm';
import {useGetServiceById} from '@hooks/api/service.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function AddService({route}: any) {
  const {theme} = useTheme();
  const {isSuccess} = useTypedSelector(state => state.success);
  // Safely extract serviceId with a default value
  const {serviceId = null} = route.params || {};

  // Conditionally fetch sale data only if serviceId exists
  const {data, isLoading} = useGetServiceById(serviceId);

  // Use useMemo to create initial data based on the fetched data
  const initialData = useMemo(() => {
    if (data?.data) {
      return {
        category: data.data.category.id || '',
        subcategory: data.data.subcategory.id || '',
        services: data.data.title ? data.data.title.split(', ') : [],
        description: data.data.description || '',
        price: data.data.price ? data.data.price.toString() : '',
        billing_type: data.data.billing_type || 'hourly',
        availability: data.data.availability || [],
        photos: data.data.photos || [],
        service_area: data.data.location || '',
        spoken_languages: data.data.spoken_languages || [],
      };
    }

    // Default empty state for new sale
    return {
      category: '',
      subcategory: '',
      services: [],
      description: '',
      price: '',
      billing_type: 'hourly',
      availability: [],
      photos: [],
      service_area: '',
      spoken_languages: [],
    };
  }, [data]);

  // Handle loading state when fetching existing sale
  if (isLoading && serviceId) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleRedirect = () => {
    navigate('Tab', {screen: 'Publish'});
  };

  if (isSuccess) {
    return <SuccessScreen onRedirect={handleRedirect} />;
  }

  // Render AddSaleForm with initial data
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScreenHeader title={serviceId ? 'Edit Service' : 'Add New Service'} />
      <AddServiceForm initialData={initialData} serviceId={serviceId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
});
