import {useGetSalesReservationByProviderIdAndStatus} from '@hooks/api/reservation-sales.rq';
import {useActions} from '@hooks/useActions';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {supabase} from '@lib/supabase/supabase';
import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import BookingItem from '../BookingItem';
import EmptyBookingsList from '../EmptyBookingList';

const MySalesProposal = ({tabType}: any) => {
  const {user} = useTypedSelector(state => state.auth);
  const {mySales} = useTypedSelector(state => state.reservationSales);
  const {setMySales, addMySale, updateMySale} = useActions();
  const {data, isLoading} = useGetSalesReservationByProviderIdAndStatus(
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
      setMySales(data.data);
    }
  }, [data, setMySales]);

  useEffect(() => {
    const channels = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        {event: '*', schema: 'public', table: 'reservations_ventes'},
        payload => {
          if (payload.eventType === 'UPDATE') {
            updateMySale(payload.new);
          } else if (payload.eventType === 'INSERT') {
            addMySale(payload.new);
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channels);
    };
  }, [addMySale, updateMySale]);

  const handleViewDetails = (id: any) => {
    console.log(`View details for proposal ${id}`);
  };

  const renderProposalItem = ({item}: any) => (
    <BookingItem
      id={item.id}
      title={item.sales?.title}
      provider={item.sales?.provider.name}
      date={formatDate(item.date)}
      time={item.time_slot}
      location={item.sales?.location}
      status={item.status}
      onViewDetails={() => handleViewDetails(item.id)}
    />
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFC163" />;
  }

  return (
    <FlatList
      style={styles.proposalsList}
      data={mySales || []}
      renderItem={renderProposalItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={
        mySales?.length === 0 ? {flex: 1} : {paddingTop: 16}
      }
      ListEmptyComponent={<EmptyBookingsList />}
    />
  );
};

const styles = StyleSheet.create({
  proposalsList: {
    flex: 1,
  },
});

export default MySalesProposal;
