import {useGetReservationById} from '@hooks/api/reservation.rq';
import lightTheme from '@theme/light';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Complete from '../Complete';

const ActivityDetails = ({reservationId}: {reservationId: string}) => {
  const {theme} = useTheme();

  const {data: reservationData, isLoading} =
    useGetReservationById(reservationId);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FFC163" />
      </View>
    );
  }

  const reservation = reservationData?.data;

  if (!reservation) {
    return (
      <View style={styles.centerContainer}>
        <Text>No reservation found</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 32}}>
        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <Image
            source={{uri: reservation?.service?.photos[0]}}
            style={styles.serviceImage}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={styles.serviceTitle}>
              {reservation?.service?.title}
            </Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color={theme.colors.primary} />
              <Text style={styles.ratingText}>5.0</Text>
            </View>
            <Text style={styles.price}>${reservation?.service?.price}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        {reservation?.status === 'completed' && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.outlineBtn}
              onPress={() => {
                navigate('Review', {reservationId});
              }}>
              <Text style={styles.outlineBtnText}>Write a Review</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* About Service Provider */}
        <Text style={styles.sectionTitle}>About Service Provider</Text>
        <View style={styles.providerCard}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/44.jpg'}}
            style={styles.providerImage}
          />
          <View style={{flex: 1, marginLeft: 12}}>
            <Text style={styles.providerName}>
              {reservation?.provider?.first_name}{' '}
              {reservation?.provider?.last_name}
            </Text>
          </View>
          {/* <View style={styles.providerActions}>
          <Contact />
        </View> */}
        </View>

        {/* Booking Status */}
        <Text style={styles.sectionTitle}>Booking Status</Text>
        <View style={styles.statusContainer}>
          <StatusStep
            title="Booking Confirmed"
            date="Mon, Oct 02, 2023"
            description="Service provider has accept your booking"
            time="Mon, Oct 02, 2023 at 10:00 AM"
            active={reservation?.status === 'confirmed'}
          />
          <StatusStep
            title="Vendor Out for Service"
            date="Mon, Oct 02, 2023"
            description="Service Provider has out for your service and reaching your location"
            time="Tue, Oct 03, 2023 at 09:00 AM"
            active={reservation?.status === 'in_progress'}
          />
          <StatusStep
            title="Service Completed"
            date="Mon, Oct 02, 2023"
            description="Service Provider has complete his service"
            time="Tue, Oct 03, 2023 at 12:00 AM"
            last
          />
        </View>

        {/* Payment Summary */}
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Item Total</Text>
          <Text style={styles.summaryValue}>$200</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount</Text>
          <Text style={styles.summaryValue}>$10</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={[styles.summaryValue, {color: theme.colors.secondary}]}>
            Free
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.grandTotalLabel}>Grand Total</Text>
          <Text style={styles.grandTotalValue}>$190</Text>
        </View>
      </ScrollView>

      {reservation?.status === 'confirmed' && (
        <View style={styles.confirmButton}>
          <Complete id={reservationId} />
        </View>
      )}
    </View>
  );
};

const StatusStep = ({title, date, description, time, active, last}: any) => {
  const {theme} = useTheme();

  return (
    <View style={styles.statusStep}>
      <View style={styles.statusIndicatorCol}>
        <View
          style={[
            styles.statusCircle,
            {
              backgroundColor: active
                ? theme.colors.primary
                : theme.colors.lightGray,
              borderColor: theme.colors.primary,
            },
          ]}
        />
        {!last && <View style={styles.statusLine} />}
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.statusTitle}>{title}</Text>
          <Text style={styles.statusDate}>{date}</Text>
        </View>
        <Text style={styles.statusDesc}>{description}</Text>
        <Text style={styles.statusTime}>{time}</Text>
      </View>
    </View>
  );
};

export default ActivityDetails;

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: lightTheme.colors.lightGray,
    borderRadius: 12,
    padding: 12,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  serviceTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    color: lightTheme.colors.gray,
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: lightTheme.colors.primary,
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: lightTheme.colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: 'center',
  },
  outlineBtnText: {
    color: lightTheme.colors.primary,
    fontWeight: 'bold',
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: lightTheme.colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    marginLeft: 8,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 12,
  },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  providerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  providerName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  providerRole: {
    color: lightTheme.colors.gray,
    fontSize: 13,
  },
  providerActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  iconBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: lightTheme.colors.lightGray,
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusStep: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statusIndicatorCol: {
    alignItems: 'center',
    marginRight: 12,
    width: 24,
  },
  statusCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  statusLine: {
    width: 2,
    flex: 1,
    backgroundColor: lightTheme.colors.lightGray,
    marginTop: 2,
  },
  statusTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  statusDate: {
    color: lightTheme.colors.gray,
    fontSize: 13,
  },
  statusDesc: {
    color: lightTheme.colors.gray,
    fontSize: 13,
    marginTop: 2,
  },
  statusTime: {
    color: lightTheme.colors.gray,
    fontSize: 12,
    marginTop: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    color: lightTheme.colors.gray,
    fontSize: 15,
  },
  summaryValue: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: lightTheme.colors.lightGray,
    marginVertical: 8,
  },
  grandTotalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  grandTotalValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: lightTheme.colors.primary,
  },
});
