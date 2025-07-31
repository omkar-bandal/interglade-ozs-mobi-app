/* eslint-disable react-native/no-inline-styles */
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Confirm from './Confirm';
import Decline from './Decline';

// Vector Icons components
const CalendarIcon = () => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  return (
    <View style={styles.icon}>
      <Ionicons name="calendar-outline" size={20} color="#666" />
    </View>
  );
};

const ClockIcon = () => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  return (
    <View style={styles.icon}>
      <Ionicons name="time-outline" size={20} color="#666" />
    </View>
  );
};

const LocationIcon = () => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  return (
    <View style={styles.icon}>
      <Ionicons name="location-outline" size={20} color="#666" />
    </View>
  );
};

const BookingItem = ({
  id,
  title,
  provider,
  date,
  location,
  status,
  time,
  //onChat,
  onCancel,
  onClose,
  onViewDetails,
  type,
}: any) => {
  // Set styles based on status
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  let containerStyle = styles.bookingItem;
  let statusStyle = styles.statusReserved;
  let statusText = 'Reserved';

  if (status === 'confirmed') {
    containerStyle = styles.bookingItemConfirmed;
    statusStyle = styles.statusConfirmed;
    statusText = 'Confirmed';
  } else if (status === 'completed') {
    containerStyle = styles.bookingItemConfirmed;
    statusStyle = styles.statusConfirmed;
    statusText = 'Completed';
  } else if (status === 'declined' || status === 'cancelled') {
    containerStyle = styles.bookingItemDeclined;
    statusStyle = styles.statusDeclined;
    statusText = status === 'declined' ? 'Declined' : 'Cancelled';
  } else if (status === 'pending') {
    containerStyle = styles.bookingItem;
    statusStyle = styles.statusPending;
    statusText = 'Pending';
  }

  return (
    <Pressable onPress={() => navigate('ActivityDetails', {reservationId: id})}>
      <View style={containerStyle}>
        <View style={styles.bookingHeader}>
          <View style={{width: '75%'}}>
            <Text style={styles.bookingTitle}>{title}</Text>
            <Text style={styles.bookingProvider}>{provider}</Text>
          </View>
          <View style={[statusStyle, {width: 'auto'}]}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </View>

        <View style={styles.bookingDetail}>
          <CalendarIcon />
          <Text style={styles.detailText}>{date}</Text>
        </View>

        <View style={styles.bookingDetail}>
          <ClockIcon />
          <Text style={styles.detailText}>{time}</Text>
        </View>

        <View style={styles.bookingDetailLocation}>
          <LocationIcon />
          <Text style={styles.detailText}>{location}</Text>
        </View>
        {type === 'myBooking' ? (
          <View style={styles.btnCon}>
            {/* <TouchableOpacity style={styles.viewDetailsButton} onPress={onChat}>
              <AntDesignIcon color="#393872" name="wechat" size={20} />
              <Text style={styles.viewDetailsText}>Chat</Text>
            </TouchableOpacity> */}
            {/* {status === 'pending' ? (
              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={onCancel}>
                <AntDesignIcon color="#393872" name="close" size={20} />
                <Text style={styles.viewDetailsText}>Cancel</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={onClose}>
                <AntDesignIcon color="#393872" name="close" size={20} />
                <Text style={styles.viewDetailsText}>Close</Text>
              </TouchableOpacity>
            )} */}
            <TouchableOpacity
              style={styles.viewDetailsButton}
              onPress={onViewDetails}>
              <AntDesignIcon color="#393872" name="eye" size={20} />
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ) : (
          (status === 'reserved' || status === 'pending') && (
            <View style={styles.actionButtons}>
              <Decline id={id} />
              <Confirm id={id} />
            </View>
          )
        )}

        {/* {type === 'myProposal' &&
          (status === 'reserved' || status === 'pending') && (
            <View style={styles.actionButtons}>
              <Decline id={id} />
              <Confirm id={id} />
            </View>
          )} */}
      </View>
    </Pressable>
  );
};

const themeStyles = (theme: any) =>
  StyleSheet.create({
    bookingItem: {
      backgroundColor: theme.components.card.backgroundColor,
      borderRadius: 8,
      padding: 15,
      marginVertical: 8,
    },
    bookingItemConfirmed: {
      backgroundColor: theme.components.card.backgroundColor,
      borderRadius: 8,
      padding: 15,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: '#8BC34A', // Success green color for confirmed items
    },
    bookingItemDeclined: {
      backgroundColor: theme.components.card.backgroundColor,
      borderRadius: 8,
      padding: 15,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: '#F44336', // Decline red color for declined items
    },
    bookingHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      //marginBottom: 6,
      paddingVertical: 3,
      //backgroundColor: 'red',
    },
    bookingTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    bookingProvider: {
      fontSize: 14,
      color: '#666',
      marginTop: 2,
    },
    statusReserved: {
      backgroundColor: '#D4E157',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
    },
    statusPending: {
      backgroundColor: '#FFB74D',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
    },
    statusConfirmed: {
      backgroundColor: '#8BC34A',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
    },
    statusDeclined: {
      backgroundColor: '#F44336',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
    },
    statusText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '500',
    },
    bookingDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    bookingDetailLocation: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    icon: {
      marginRight: 8,
    },
    detailText: {
      fontSize: 14,
      color: '#666',
      flex: 1,
    },
    btnCon: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    viewDetailsButton: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      flexDirection: 'row',
    },
    viewDetailsText: {
      color: theme.colors.textSecondary,
      fontSize: 12,
      fontWeight: '500',
      paddingHorizontal: 5,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      gap: 5,
    },
    declineButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      marginRight: 8,
    },
    declineButtonText: {
      color: '#666',
    },
    confirmButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: '#8BC34A',
      borderRadius: 8,
      marginLeft: 8,
    },
    confirmButtonText: {
      color: 'white',
      fontWeight: '500',
    },
  });

export default BookingItem;
