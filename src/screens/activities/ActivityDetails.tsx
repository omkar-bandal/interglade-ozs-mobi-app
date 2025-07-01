import ScreenHeader from '@components/header/ScreenHeader';
import ActivityDetails from '@features/activities/components/details/ActivityDetails';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const ActivityDetailsScreen = ({route}: any) => {
  const {reservationId} = route?.params;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Activity Details" />
      <ActivityDetails reservationId={reservationId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
