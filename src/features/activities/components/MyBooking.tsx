/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, Alert, FlatList, StyleSheet} from 'react-native';
import BookingItem from './BookingItem';
import EmptyBookingsList from './EmptyBookingList';

const data = {
  data: [
    {
      id: '1',
      services: {
        title: 'Hair Spa Treatment',
        location: 'Bella Salon, Mumbai',
      },
      provider: {
        name: 'Ritika Sharma',
      },
      date: '2025-07-05T15:30:00',
      status: 'confirmed',
    },
    {
      id: '2',
      services: {
        title: 'Full Body Massage',
        location: 'Urban Wellness, Pune',
      },
      provider: {
        name: 'Karan Mehta',
      },
      date: '2025-07-08T11:00:00',
      status: 'pending',
    },
    {
      id: '3',
      services: {
        title: 'Manicure & Pedicure',
        location: 'Nail Spa, Delhi',
      },
      provider: {
        name: 'Ayesha Khan',
      },
      date: '2025-07-12T17:45:00',
      status: 'completed',
    },
  ],
};

const MyBookings = ({_tabType}: any) => {
  // const {user} = useTypedSelector(state => state.auth);
  // const {data, isLoading} = useGetReservationByUserIdAndStatus(
  //   user?.id as string,
  //   tabType,
  // );

  const navigation = useNavigation<any>();

  const isLoading = false;

  // Handle actions
  const handleViewDetails = (id: any) => {
    Alert.alert(`View details for booking ${id}`);
    navigation.navigate('ActivityDetails', {
      reservationId: id,
    });
  };

  function renderBookingItem({item}: any) {
    return (
      <BookingItem
        id={item.id}
        title={item.services?.title}
        provider={item.provider?.name}
        date={item.date}
        location={item.services?.location}
        status={item.status}
        onViewDetails={() => handleViewDetails(item.id)}
        type="myBooking"
      />
    );
  }

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
