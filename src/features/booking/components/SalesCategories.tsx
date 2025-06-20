import Typography from '@components/ui/Typography';
import {useGetCategoriesByType} from '@hooks/api/category.rq';
import {SPACING} from '@theme/constants';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {SalesCategoriesCard} from './card/SalesCategoriesCard';

export const SalesCategories = () => {
  const {data, isLoading} = useGetCategoriesByType('sales');

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFC163" />;
  }

  return (
    <View style={styles.container}>
      <Typography variant="h5" weight="bold">
        Sales Categories
      </Typography>

      <View style={styles.services}>
        <SalesCategoriesCard items={data?.data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
});
