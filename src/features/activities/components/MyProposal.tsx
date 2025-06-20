import {useGetReservationByProviderIdAndStatus} from '@hooks/api/reservation.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import BookingItem from './BookingItem';
import EmptyBookingsList from './EmptyBookingList';

const MyProposal = ({tabType}: any) => {
  const {user} = useTypedSelector(state => state.auth);
  const {data, isLoading} = useGetReservationByProviderIdAndStatus(
    user?.id as string,
    tabType,
  );
  // Handle actions
  const handleViewDetails = (id: any) => {
    console.log(`View details for proposal ${id}`);
  };

  const renderProposalItem = ({item}: any) => (
    <BookingItem
      id={item.id}
      title={item.service?.title}
      provider={item.provider}
      date={item.date}
      location={item.service?.location}
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
      data={data?.data}
      renderItem={renderProposalItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={
        data?.data.length === 0 ? {flex: 1} : {paddingTop: 16}
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

export default MyProposal;
