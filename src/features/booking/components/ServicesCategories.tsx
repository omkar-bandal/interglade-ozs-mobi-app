import Typography from '@components/ui/Typography';
import {useGetCategoriesByType} from '@hooks/api/category.rq';
import {SPACING} from '@theme/constants';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {ServiceCategoriesCard} from './card/ServiceCategoriesCard';

export const ServicesCategories = () => {
  const {data, isLoading} = useGetCategoriesByType('service');

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFC163" />;
  }

  return (
    <View style={styles.container}>
      <Typography variant="h5" weight="bold">
        Service Categories
      </Typography>

      <View style={styles.services}>
        <ServiceCategoriesCard items={data?.data} />
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
