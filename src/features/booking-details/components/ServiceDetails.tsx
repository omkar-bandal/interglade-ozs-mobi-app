// ServiceDetails.tsx
import {ActionSheet} from '@components/ActionSheet';
import {useGetServiceById} from '@hooks/api/service.rq';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TimeSlotPicker from './TimeSlotPicker';
// Import Ionicons
import {ImageCarousel} from '@components/ImageCarousel';
import Button from '@components/ui/Button';
import Typography from '@components/ui/Typography';
import {useActions} from '@hooks/useActions';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {SPACING} from '@theme/constants';
import {navigate} from '@utils/NavigationUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ServiceDetails = ({serviceId}: {serviceId: string}) => {
  const {user} = useTypedSelector(state => state.auth);
  const {data, isLoading} = useGetServiceById(serviceId);
  const [isTimeSlotModalVisible, setTimeSlotModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const {addCart} = useActions();
  // const [selectedPaymentType, setSelectedPaymentType] = useState('');

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FFC163" />
      </View>
    );
  }

  const serviceData = data?.data;

  // Format price
  const formattedPrice = serviceData?.price ? `$${serviceData.price}` : '$100';

  const handleOpenTimeSlotModal = () => {
    if (selectedDay && selectedTimeSlot) {
      addCart({...serviceData, selectedDay, selectedTimeSlot});
      navigate('BookingSummary');
      return;
    }
    setTimeSlotModalVisible(true);
  };

  const handleCloseTimeSlotModal = () => {
    setTimeSlotModalVisible(false);
  };

  const handleSelectDay = (day: string) => {
    setSelectedDay(day);
  };

  const handleSelectTimeSlot = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  // const handleSelectPaymentType = (paymentType: string) => {
  //   setSelectedPaymentType(paymentType);
  // };

  const handleConfirmBooking = () => {
    setTimeSlotModalVisible(false);
    console.log(
      'Booking confirmed for',
      selectedDay,
      selectedTimeSlot,
      'with payment type',
      // selectedPaymentType,
    );
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Ionicons
            key={i}
            name="star"
            size={16}
            color="#FFC163"
            style={styles.starIcon}
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Ionicons
            key={i}
            name="star-half"
            size={16}
            color="#FFC163"
            style={styles.starIcon}
          />,
        );
      } else {
        stars.push(
          <Ionicons
            key={i}
            name="star-outline"
            size={16}
            color="#DDDDDD"
            style={styles.starIcon}
          />,
        );
      }
    }

    return <View style={styles.starsContainer}>{stars}</View>;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageCarousel
          images={serviceData?.photos || []}
          autoPlay={true}
          autoPlayInterval={5000}
        />

        <View style={styles.serviceTitleContainer}>
          <View style={styles.serviceTitle}>
            <Typography variant="h4" weight="bold" numberOfLines={2}>
              {serviceData?.title || 'NA'}
            </Typography>
          </View>

          <View>
            <Typography variant="body2">
              {serviceData?.description || 'NA'}
            </Typography>
          </View>
        </View>

        {/* About Provider Section */}
        <View style={styles.sectionContainer}>
          <Typography variant="h5" weight="bold">
            About Service Provider
          </Typography>
          <View style={styles.providerContainer}>
            <Image
              source={{uri: serviceData?.provider?.profile_picture_url}}
              style={styles.providerImage}
            />
            <Text
              style={
                styles.providerName
              }>{`${serviceData?.provider?.first_name} ${serviceData?.provider?.last_name}`}</Text>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Reviews</Text>

          {/* Review Item */}
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Terry Wilson</Text>
              <Text style={styles.reviewDate}>Dec 12</Text>
            </View>
            {renderStars(5)}
            <Text style={styles.reviewText}>
              It is strongly established law that it needs to be fixed by the
              residents owners of a large development if it gets broken.
            </Text>
          </View>

          {/* Repeated Review Item */}
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Vincent Fox</Text>
              <Text style={styles.reviewDate}>Dec 8</Text>
            </View>
            {renderStars(4.5)}
            <Text style={styles.reviewText}>
              It is strongly established law that it needs to be fixed by the
              residents owners of a large development if it gets broken.
            </Text>
          </View>
        </View>

        {/* Price and Booking Section */}
      </ScrollView>
      {user?.id ? (
        <View style={styles.pricingContainer}>
          <View>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>{formattedPrice}</Text>
          </View>
          <Button
            label={selectedDay && selectedTimeSlot ? 'Proceed' : 'Book Slot'}
            onPress={handleOpenTimeSlotModal}
          />
        </View>
      ) : (
        <View style={[styles.pricingContainer, {justifyContent: 'flex-end'}]}>
          <Button label="Login" onPress={() => navigate('Login')} />
        </View>
      )}

      {/* Time Slot Selection Modal */}
      <ActionSheet
        title="Select a Time Slot"
        visible={isTimeSlotModalVisible}
        onCancel={handleCloseTimeSlotModal}>
        <TimeSlotPicker
          onSelectDay={handleSelectDay}
          onSelectTimeSlot={handleSelectTimeSlot}
          selectedDay={selectedDay}
          selectedTimeSlot={selectedTimeSlot}
          availableDays={serviceData?.availability}
        />

        {/* <PaymentTypeSelector
          onSelectPaymentType={handleSelectPaymentType}
          selectedPaymentType={selectedPaymentType}
        /> */}

        <Button
          label="Confirm"
          disabled={!selectedDay || !selectedTimeSlot}
          onPress={handleConfirmBooking}
        />
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceHeader: {
    marginBottom: 16,
  },
  serviceImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  serviceTitleContainer: {
    padding: SPACING.md,
  },
  serviceTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionContainer: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999999',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  starIcon: {
    marginRight: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  contactButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  contactButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonIcon: {
    marginBottom: 4,
  },
  contactButtonLabel: {
    fontSize: 12,
    color: '#666666',
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  priceLabel: {
    fontSize: 12,
    color: '#999999',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  bookButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
});

export default ServiceDetails;
