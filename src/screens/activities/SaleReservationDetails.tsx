import ScreenHeader from '@components/header/ScreenHeader';
import SaleReservationDetails from '@features/activities/components/details/SaleReservationDetails';
import useTheme from '@theme/useTheme';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const SaleReservationDetailsScreen = ({route}: any) => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  const {reservationId} = route?.params;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Activity Details" />
      <SaleReservationDetails reservationId={reservationId} />
    </View>
  );
};

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
