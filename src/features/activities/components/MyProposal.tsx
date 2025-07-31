/* eslint-disable react-native/no-inline-styles */
import {useGetReservationByProviderIdAndStatus} from '@hooks/api/reservation-service.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import BookingItem from './BookingItem';
import EmptyBookingsList from './EmptyBookingList';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const MyProposal = ({tabType}: any) => {
  const {user} = useTypedSelector(state => state.auth);
  const {data, isLoading} = useGetReservationByProviderIdAndStatus(
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

  const navigation = useNavigation<any>();

  //const isLoading = false;

  // Handle actions
  const handleViewDetails = (id: any) => {
    // Alert.alert(`View details for proposal ${id}`);
    navigation.navigate('ActivityDetails', {
      reservationId: id,
    });
  };

  const renderProposalItem = ({item}: any) => (
    <>
      <BookingItem
        id={item.id}
        title={item.service?.title}
        provider={item.provider?.name}
        date={formatDate(item.date)}
        time={item.time_slot}
        location={item.service?.location}
        status={item.status}
        onViewDetails={() => handleViewDetails(item.id)}
      />
    </>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#65B0A9" />;
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
  modalWrapper: {
    flex: 1,
    //justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#E0F0F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: SCREEN_HEIGHT * 0.5,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});

export default MyProposal;
