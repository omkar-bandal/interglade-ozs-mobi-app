import {useGetSalesReservationByUserIdAndStatus} from '@hooks/api/reservation-sales.rq';
import {useActions} from '@hooks/useActions';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {supabase} from '@lib/supabase/supabase';
import {navigate} from '@utils/NavigationUtils';
import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import BookingItem from '../BookingItem';
import EmptyBookingsList from '../EmptyBookingList';

const MySalesBookings = ({tabType}: any) => {
  const {user} = useTypedSelector(state => state.auth);
  const {myReservationSales} = useTypedSelector(
    state => state.reservationSales,
  );
  const {setMyReservationSales, addMyReservationSale, updateMyReservationSale} =
    useActions();
  const {data, isLoading} = useGetSalesReservationByUserIdAndStatus(
    user?.id as string,
    tabType,
  );

  useEffect(() => {
    if (data?.data) {
      setMyReservationSales(data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const channels = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        {event: '*', schema: 'public', table: 'reservations_ventes'},
        payload => {
          if (payload.eventType === 'UPDATE') {
            updateMyReservationSale(payload.new);
          } else if (payload.eventType === 'INSERT') {
            addMyReservationSale(payload.new);
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channels);
    };
  }, [addMyReservationSale, updateMyReservationSale]);

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle actions
  const handleViewDetails = (id: any) => {
    console.log(`Sale mybooking details ${id}`);
    // Navigate to booking details screen
    navigate('SaleReservationDetails', {reservationId: id});
  };

  const renderBookingItem = ({item}: any) => (
    <BookingItem
      id={item.id}
      title={item.sales?.title}
      provider={item.sales?.provider.name}
      date={formatDate(item.date)}
      time={item.time_slot}
      location={item.sales?.location}
      status={item.status}
      onViewDetails={() => handleViewDetails(item.id)}
      type="myBooking"
    />
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4D948E" />;
  }

  console.log('myReservationSales', myReservationSales);

  return (
    <FlatList
      style={styles.bookingsList}
      data={myReservationSales || []}
      renderItem={renderBookingItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={
        myReservationSales?.length === 0 ? {flex: 1} : {paddingTop: 16}
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

export default MySalesBookings;
