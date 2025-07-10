/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {useGetAllReservations} from '@hooks/api/reservation.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, Alert, FlatList, StyleSheet} from 'react-native';
import BookingItem from './BookingItem';
import EmptyBookingsList from './EmptyBookingList';

// const data = {
//   data: [
//     {
//       id: '1',
//       services: {
//         title: 'Hair Spa Treatment',
//         location: 'Bella Salon, Mumbai',
//       },
//       provider: {
//         name: 'Ritika Sharma',
//       },
//       date: '2025-07-05T15:30:00',
//       status: 'confirmed',
//     },
//     {
//       id: '2',
//       services: {
//         title: 'Full Body Massage',
//         location: 'Urban Wellness, Pune',
//       },
//       provider: {
//         name: 'Karan Mehta',
//       },
//       date: '2025-07-08T11:00:00',
//       status: 'pending',
//     },
//     {
//       id: '3',
//       services: {
//         title: 'Manicure & Pedicure',
//         location: 'Nail Spa, Delhi',
//       },
//       provider: {
//         name: 'Ayesha Khan',
//       },
//       date: '2025-07-12T17:45:00',
//       status: 'completed',
//     },
//   ],
// };

const MyBookings = ({tabType}: any) => {
  const {user} = useTypedSelector(state => state.auth);
  // const {data, isLoading} = useGetReservationByUserIdAndStatus(
  //   user?.id as string,
  //   tabType,
  // );

  const {data, isLoading} = useGetAllReservations();
  //const {data, isLoading} = useGetAllReservations();
  const navigation = useNavigation<any>();

  //const isLoading = false;

  // Handle actions
  const handleCancel = (id: any) => {
    // useDeleteReservation(id, {
    //   onSuccess: data => {
    //     Alert.alert('Deleted', 'Reservation deleted successfully.');
    //   },
    //   onError: (error: any) => {
    //     Alert.alert('Error', error?.message || 'Failed to delete reservation.');
    //   },
    // });
  };

  const handleViewDetails = (id: any) => {
    //Alert.alert(`View details for booking ${id}`);
    navigation.navigate('ActivityDetails', {
      reservationId: id,
    });
  };

  function renderBookingItem({item}: any) {
    return (
      <>
        <BookingItem
          id={item.id}
          title={item.services?.title}
          provider={item.provider?.name}
          date={item.date}
          location={item.services?.location}
          status={item.status}
          onCancel={() => {
            Alert.alert(
              'Cancel Booking',
              'Are you sure you want to cancel booking?',
              [
                {text: 'No', style: 'cancel'},
                {
                  text: 'Cancel',
                  style: 'destructive',
                  onPress: () => handleCancel(item.id),
                },
              ],
            );
          }}
          onViewDetails={() => handleViewDetails(item.id)}
          type="myBooking"
        />
      </>
    );
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4D948E" />;
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

export default MyBookings;

const styles = StyleSheet.create({
  bookingsList: {
    flex: 1,
  },
});
