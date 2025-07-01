import ScreenHeader from '@components/header/ScreenHeader';
import SuccessScreen from '@components/Success';
import AddSaleForm from '@features/sales/components/AddSaleForm';
import {useGetSaleByID} from '@hooks/api/sales.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function AddSale({route}: any) {
  const {theme} = useTheme();
  const {isSuccess} = useTypedSelector(state => state.success);
  // Safely extract saleId with a default value
  const {saleId = null} = route.params || {};

  // Conditionally fetch sale data only if saleId exists
  const {data, isLoading} = useGetSaleByID(saleId);

  // Use useMemo to create initial data based on the fetched data
  const initialData = useMemo(() => {
    if (data?.data) {
      return {
        title: data.data.title || '',
        category: data.data.category_id?.toString() || '',
        subcategory: data.data.subcategory_id || '',
        description: data.data.description || '',
        photos: data.data.photos || [],
        price: data.data.price ? data.data.price.toString() : '',
        condition: data.data.condition || '',
        location: data.data.location || '',
        items: data.data.items || [],
      };
    }

    // Default empty state for new sale
    return {
      title: '',
      category: '',
      subcategory: '',
      description: '',
      photos: [],
      price: '',
      condition: '',
      location: '',
      items: [],
    };
  }, [data]);

  // Handle loading state when fetching existing sale
  if (isLoading && saleId) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleRedirect = () => {
    navigate('Tab-', {screen: 'Publish'});
  };

  if (isSuccess) {
    return (
      <SuccessScreen
        message="Sales added successfully!"
        onRedirect={handleRedirect}
      />
    );
  }

  // Render AddSaleForm with initial data
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScreenHeader title={saleId ? 'Edit Sale' : 'Add New Sale'} />

      <AddSaleForm initialData={initialData} saleId={saleId} />
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
