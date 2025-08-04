// /* eslint-disable react-native/no-inline-styles */
// import {
//   useDeleteReservation,
//   useGetReservationByUserIdAndStatus,
// } from '@hooks/api/reservation-service.rq';
// import {useTypedSelector} from '@hooks/useTypedSelector';
// import {useNavigation} from '@react-navigation/native';
// import {useQueryClient} from '@tanstack/react-query';
// import React from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   FlatList,
//   StyleSheet,
// } from 'react-native';
// import BookingItem from './BookingItem';
// import EmptyBookingsList from './EmptyBookingList';

// const SCREEN_HEIGHT = Dimensions.get('window').height;

// const MyBookings = ({tabType}: any) => {
//   const {user} = useTypedSelector(state => state.auth);
//   const {data, isLoading} = useGetReservationByUserIdAndStatus(
//     user?.id as string,
//     tabType,
//   );
//   const navigation = useNavigation<any>();
//   const queryClient = useQueryClient();
//   const {mutate: deleteReservation} = useDeleteReservation();

//   const formatDate = (isoDate: string): string => {
//     const date = new Date(isoDate);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   // Handle actions

//   const handleCancel = (id: any) => {
//     deleteReservation(id, {
//       onSuccess: (response: any) => {
//         console.log('Booking cancelled successfully:', response);
//         Alert.alert('Success', 'Booking cancelled successfully.');
//         // Optional: refetch reservation list here if needed
//         queryClient.invalidateQueries({
//           queryKey: ['getReservationByUserIdAndStatus', user?.id, tabType],
//         });
//       },
//       onError: (error: any) => {
//         Alert.alert('Error', 'Failed to cancel booking. Please try again.');
//         console.error(error);
//       },
//     });
//   };

//   const handleViewDetails = (id: any) => {
//     Alert.alert(`View details for booking ${id}`);
//     navigation.navigate('ActivityDetails', {
//       reservationId: id,
//     });
//   };

//   function renderBookingItem({item}: any) {
//     return (
//       <>
//         <BookingItem
//           id={item.id}
//           title={item.services?.title}
//           provider={item.provider?.name}
//           date={formatDate(item.date)}
//           time={item.time_slot}
//           location={item.services?.location}
//           status={item.status}
//           onCancel={() => {
//             Alert.alert(
//               'Cancel Booking',
//               'Are you sure you want to cancel booking?',
//               [
//                 {text: 'No', style: 'cancel'},
//                 {
//                   text: 'Cancel',
//                   style: 'destructive',
//                   onPress: () => handleCancel(item.id),
//                 },
//               ],
//             );
//           }}
//           onViewDetails={() => handleViewDetails(item.id)}
//           type="myBooking"
//         />
//       </>
//     );
//   }

//   if (isLoading) {
//     return <ActivityIndicator size="large" color="#4D948E" />;
//   }

//   console.log('booking', data);

//   return (
//     <FlatList
//       style={styles.bookingsList}
//       data={data?.data}
//       renderItem={renderBookingItem}
//       keyExtractor={item => item.id.toString()}
//       contentContainerStyle={
//         data?.data.length === 0 ? {flex: 1} : {paddingTop: 16}
//       }
//       ListEmptyComponent={<EmptyBookingsList />}
//     />
//   );
// };

// export default MyBookings;

// const styles = StyleSheet.create({
//   bookingsList: {
//     flex: 1,
//   },
//   modalWrapper: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)', // greyish transparent overlay
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: '#E0F0F0',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 16,
//     height: SCREEN_HEIGHT * 0.5,
//     position: 'absolute',
//     width: '100%',
//     bottom: 0,
//   },
// });
