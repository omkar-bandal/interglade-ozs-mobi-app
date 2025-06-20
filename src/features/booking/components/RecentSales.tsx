import Button from '@components/ui/Button';
import Typography from '@components/ui/Typography';
import {useGetAllSales} from '@hooks/api/sales.rq';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {SalesCard} from './card/SalesCard';

export const RecentSales = () => {
  const {data, isLoading} = useGetAllSales();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Typography variant="h5" weight="bold">
          Recent Sales
        </Typography>

        <Button label="See All" size="small" variant="ghost" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScrollView}>
        {data?.data?.map((sale: any) => (
          <SalesCard
            key={sale.id}
            sale={sale}
            selectedProviderId={''}
            onContactClick={console.log}
            onReserveClick={console.log}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  horizontalScrollView: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
