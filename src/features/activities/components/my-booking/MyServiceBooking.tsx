import {useGetServiceReservationByUserIdAndStatus} from '@hooks/api/reservation-service.rq';
import {useActions} from '@hooks/useActions';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {supabase} from '@lib/supabase/supabase';
import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import BookingItem from '../BookingItem';
import EmptyBookingsList from '../EmptyBookingList';

const MyServiceBookings = ({tabType}: any) => {
  const {user} = useTypedSelector(state => state.auth);
  const {myServices} = useTypedSelector(state => state.reservationService);
  const {setMyServices, addMyService, updateMyService} = useActions();

  const {data, isLoading} = useGetServiceReservationByUserIdAndStatus(
    user?.id as string,
    tabType,
  );

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (data?.data) {
      setMyServices(data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const channels = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        {event: '*', schema: 'public', table: 'reservations_services'},
        payload => {
          if (payload.eventType === 'UPDATE') {
            updateMyService(payload.new);
          } else if (payload.eventType === 'INSERT') {
            addMyService(payload.new);
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channels);
    };
  }, [addMyService, updateMyService]);

  // Handle actions
  const handleViewDetails = (id: any) => {
    console.log(`View details for booking ${id}`);
  };

  const renderBookingItem = ({item}: any) => (
    <BookingItem
      id={item.id}
      title={item.services?.title}
      provider={item.provider}
      date={formatDate(item.date)}
      time={item.time_slot}
      location={item.services?.location}
      status={item.status}
      onViewDetails={() => handleViewDetails(item.id)}
      type="myBooking"
    />
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFC163" />;
  }

  return (
    <FlatList
      style={styles.bookingsList}
      data={myServices || []}
      renderItem={renderBookingItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={
        myServices?.length === 0 ? {flex: 1} : {paddingTop: 16}
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

export default MyServiceBookings;
