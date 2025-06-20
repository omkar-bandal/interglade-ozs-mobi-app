import {useDeleteSale, useGetMySales} from '@hooks/api/sales.rq';
import {useActions} from '@hooks/useActions';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {navigate} from '@utils/NavigationUtils';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SalesListScreen} from './SalesListScreen';

const MySales: React.FC = () => {
  const {user} = useTypedSelector(state => state.auth);
  const {mySales} = useTypedSelector(state => state.sales);
  const {data: sales, isLoading, isError} = useGetMySales(user?.id || '');
  const {mutateAsync: deleteSale} = useDeleteSale();
  const {deleteMySale, setMySales} = useActions();

  useEffect(() => {
    if (sales?.data) {
      setMySales(sales?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sales]);

  const handleEditSale = (item: any) => {
    navigate('AddSale', {saleId: item.id});
  };

  const handleDeleteSale = async (saleId: string) => {
    const result = await deleteSale({saleId});
    if (result?.status === 204) {
      deleteMySale(saleId);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.errorText}>Failed to load sales</Text>
        <TouchableOpacity style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SalesListScreen
      sales={mySales}
      onEditSale={handleEditSale}
      onDeleteSale={handleDeleteSale}
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

export default MySales;
