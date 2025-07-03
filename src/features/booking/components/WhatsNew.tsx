import Button from '@components/ui/Button';
import Typography from '@components/ui/Typography';
import {useGetAllServicesExpectUser} from '@hooks/api/service.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {SPACING} from '@theme/constants';
import {navigate} from '@utils/NavigationUtils';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {NewCards} from './card/NewCard';

const WhatsNew = () => {
  const {user} = useTypedSelector(state => state.auth);
  const {data: servicesData, isLoading: isServicesLoading} =
    useGetAllServicesExpectUser(user?.id || '');

  const handleCardDetails = useCallback((serviceId: string): void => {
    navigate('ServiceDetails', {
      serviceId,
    });
    // Implement reservation logic here
  }, []);

  if (isServicesLoading) {
    return <ActivityIndicator size="large" color="#4D948E" />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Typography variant="h5" weight="bold">
          Whats New?
        </Typography>

        <Button label="See All" size="small" variant="ghost" />
      </View>
      <View style={styles.cardsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => handleCardDetails}>
            <View style={styles.cardRow}>
              {servicesData?.data?.map((service: any) => (
                <View key={service.id}>
                  <NewCards service={service} />
                </View>
              ))}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default WhatsNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: SPACING.md,
    // backgroundColor: lightTheme.colors.background,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  cardsContainer: {
    //marginTop: SPACING.sm,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    padding: SPACING.md,
    borderBlockColor: 'red',
  },
  cardRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
