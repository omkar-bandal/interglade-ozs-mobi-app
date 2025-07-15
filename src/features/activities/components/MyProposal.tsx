/* eslint-disable react-native/no-inline-styles */
// import {useGetReservationByProviderIdAndStatus} from '@hooks/api/reservation.rq';
// import {useTypedSelector} from '@hooks/useTypedSelector';
import {useGetReservationByProviderIdAndStatus} from '@hooks/api/reservation.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import BookingItem from './BookingItem';
import EmptyBookingsList from './EmptyBookingList';
import Overview from './details/Overview';

// const data = {
//   data: [
//     {
//       id: '101',
//       service: {
//         title: 'Bridal Makeup Trial',
//         location: 'Shimmer Studio, Mumbai',
//       },
//       provider: {
//         name: 'Priya Deshmukh',
//       },
//       date: '2025-07-03T14:00:00',
//       status: 'pending',
//     },
//     {
//       id: '102',
//       service: {
//         title: 'Hair Styling Session',
//         location: 'Salon One, Pune',
//       },
//       provider: {
//         name: 'Rahul Verma',
//       },
//       date: '2025-07-10T10:30:00',
//       status: 'approved',
//     },
//     {
//       id: '103',
//       service: {
//         title: 'Makeup Consultation',
//         location: 'Beauty Point, Delhi',
//       },
//       provider: {
//         name: 'Sana Khan',
//       },
//       date: '2025-07-15T16:15:00',
//       status: 'rejected',
//     },
//   ],
// };

const SCREEN_HEIGHT = Dimensions.get('window').height;

const MyProposal = ({tabType}: any) => {
  const {user} = useTypedSelector(state => state.auth);
  const {data, isLoading} = useGetReservationByProviderIdAndStatus(
    user?.id as string,
    tabType,
  );

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<any>();

  //const isLoading = false;
  // Handle actions
  const handleClose = (id: any) => {
    setModalVisible(true);
    console.log(id);
  };
  const handleViewDetails = (id: any) => {
    // Alert.alert(`View details for proposal ${id}`);
    navigation.navigate('ActivityDetails', {
      reservationId: id,
    });
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const renderProposalItem = ({item}: any) => (
    <>
      <BookingItem
        id={item.id}
        title={item.service?.title}
        provider={item.provider?.name}
        date={item.date}
        location={item.service?.location}
        status={item.status}
        onClose={() => handleClose(item.id)}
        onViewDetails={() => handleViewDetails(item.id)}
      />
      <Modal
        visible={modalVisible}
        onRequestClose={handleModalClose}
        style={styles.modalWrapper}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContent}>
          <Overview onClose={handleModalClose} />
        </View>
      </Modal>
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
