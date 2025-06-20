import ScreenHeader from '@components/header/ScreenHeader';
import Review from '@features/review/components/Review';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const ReviewScreen = ({route}: {route: any}) => {
  const {reservationId = null} = route.params;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Write a review" />

      <Review reservationId={reservationId} />
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
