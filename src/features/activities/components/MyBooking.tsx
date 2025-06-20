import {useGetReservationByUserIdAndStatus} from '@hooks/api/reservation.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import BookingItem from './BookingItem';
import EmptyBookingsList from './EmptyBookingList';

const MyBookings = ({tabType}: any) => {
  const {user} = useTypedSelector(state => state.auth);
  const {data, isLoading} = useGetReservationByUserIdAndStatus(
    user?.id as string,
    tabType,
  );

  // Handle actions
  const handleViewDetails = (id: any) => {
    console.log(`View details for booking ${id}`);
  };

  const renderBookingItem = ({item}: any) => (
    <BookingItem
      id={item.id}
      title={item.services?.title}
      provider={item.provider}
      date={item.date}
      location={item.services?.location}
      status={item.status}
      onViewDetails={() => handleViewDetails(item.id)}
      type="myBooking"
    />
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFC163" />;
  }

  console.log('booking', data);

  return (
    <FlatList
      style={styles.bookingsList}
      data={data?.data}
      renderItem={renderBookingItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={
        data?.data.length === 0 ? {flex: 1} : {paddingTop: 16}
      }
      ListEmptyComponent={<EmptyBookingsList />}
    />
  );
};

const styles = StyleSheet.create({
  bookingsList: {
    flex: 1,
  },
});

export default MyBookings;
