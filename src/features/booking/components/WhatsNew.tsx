import Button from '@components/ui/Button';
import Typography from '@components/ui/Typography';
import {useGetAllServicesExpectUser} from '@hooks/api/service.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import React, {useCallback} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {NewCards} from './card/NewCard';

const WhatsNew = () => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  const {user} = useTypedSelector(state => state.auth);
  const {data: servicesData, isLoading: isServicesLoading} =
    useGetAllServicesExpectUser(user?.id || '');

  const handleCardDetails = useCallback((serviceId: string): void => {
    navigate('ServiceDetails', {
      serviceId,
    });
    // Implement reservation logic here
    //Alert.alert('Service data', JSON.stringify(serviceId));
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

        <Button
          label="See All"
          size="small"
          variant="ghost"
          onPress={() => {
            navigate('SearchAndFilter');
          }}
        />
      </View>
      <View style={styles.cardsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.cardRow}>
            {servicesData?.data?.map((service: any) => (
              <View>
                <NewCards
                  key={service.id}
                  service={service}
                  onReserveClick={handleCardDetails}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default WhatsNew;

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: SPACING.md,
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
      backgroundColor: theme.colors.background,
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
