import ScreenHeader from '@components/header/ScreenHeader';
import ActivityDetails from '@features/activities/components/details/ActivityDetails';
import useTheme from '@theme/useTheme';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const ActivityDetailsScreen = ({route}: any) => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  const {reservationId} = route?.params;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Activity Details" />
      <ActivityDetails reservationId={reservationId} />
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
