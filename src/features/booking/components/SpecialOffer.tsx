import Button from '@components/ui/Button';
import Typography from '@components/ui/Typography';
import {useGetMySales} from '@hooks/api/sales.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {darkTheme} from '@theme/constants';
import {navigate} from '@utils/NavigationUtils';
import React, {useCallback} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import OfferCard from './card/SalesOfferCard';

// export const SaleOffer = [
//   {
//     id: 1,
//     // image: require('../../assets/bag.png'),
//     title: 'Designer Handbag',
//     description: 'Authentic designer handbag',
//   },
//   {
//     id: 2,
//     // image: require('../../assets/bag.png'),
//     title: 'Designer Handbag',
//     description: 'Authentic designer handbag',
//   },
//   {
//     id: 2,
//     // image: require('../../assets/bag.png'),
//     title: 'Designer Handbag',
//     description: 'Authentic designer handbag',
//   },
//   {
//     id: 2,
//     //  image: require('../../assets/bag.png'),
//     title: 'Designer Handbag',
//     description: 'Authentic designer handbag',
//   },
// ];

export const SpecialOffer = () => {
  const {user} = useTypedSelector(state => state.auth);
  const {data: salesData, isLoading: isSalesLoading} = useGetMySales(
    user?.id || '',
  );

  const handleReserveClick = useCallback((saleId: string): void => {
    navigate('SaerviceDetails', {
      saleId,
    });
    Alert.alert('Sale data', JSON.stringify(saleId));
  }, []);

  if (isSalesLoading) {
    return <ActivityIndicator size="large" color="#4D948E" />;
  }

  if (!salesData?.data?.length) {
    return (
      <View style={styles.container}>
        <Typography variant="h5" weight="bold">
          No Sales Available
        </Typography>
      </View>
    );
  }

  return (
    <>
      <View style={styles.sectionHeader}>
        <Typography variant="h5" weight="bold">
          Popular Sales
        </Typography>

        <Button label="See All" size="small" variant="ghost" />
      </View>
      <View style={styles.offercontainer}>
        {salesData?.data?.map((sale: any) => (
          <View style={styles.offerCardWrapper}>
            <OfferCard
              key={sale.id}
              sale={sale}
              onReserveClick={handleReserveClick}
            />
          </View>
        ))}
      </View>
    </>
  );
};

export default SpecialOffer;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  offercontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  offerCardWrapper: {
    width: '48%',
  },
  title: {
    fontSize: 17,
    fontWeight: 700,
    color: darkTheme.colors.text,
  },
});
