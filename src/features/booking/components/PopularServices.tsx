import Button from '@components/ui/Button';
import Typography from '@components/ui/Typography';
import {useGetAllServicesExpectUser} from '@hooks/api/service.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {navigate} from '@utils/NavigationUtils';
import {JSX, useCallback} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {ServicesCard} from './card/ServicesCard';

export const PopularServices = (): JSX.Element => {
  const {user} = useTypedSelector(state => state.auth);
  const {data: servicesData, isLoading: isServicesLoading} =
    useGetAllServicesExpectUser(user?.id || '');

  const handleReserveClick = useCallback((serviceId: string): void => {
    navigate('ServiceDetails', {
      serviceId,
    });
    // Implement reservation logic here
  }, []);

  if (isServicesLoading) {
    return <ActivityIndicator size="large" color="#4D948E" />;
  }

  if (!servicesData?.data?.length) {
    return (
      <View style={styles.container}>
        <Typography variant="h5" weight="bold">
          No Services Available
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Typography variant="h5" weight="bold">
          Popular Services
        </Typography>

        <Button
          label="See All"
          size="small"
          variant="ghost"
          onPress={() => {
            navigate('SearchAndFilter');
          }}
        />
      </View>

      <ScrollView
        //   horizontal
        //   showsHorizontalScrollIndicator={false}
        style={styles.horizontalScrollView}>
        {servicesData?.data?.slice(0, 10).map((service: any) => (
          <ServicesCard
            key={service.id}
            service={service}
            onReserveClick={handleReserveClick}
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
