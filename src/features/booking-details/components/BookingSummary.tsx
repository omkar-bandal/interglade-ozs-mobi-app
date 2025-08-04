/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {ActionSheet} from '@components/ActionSheet';
import ScreenHeader from '@components/header/ScreenHeader';
import SuccessScreen from '@components/Success';
import Button from '@components/ui/Button';
import {AddressList} from '@features/account/components/address/list/AddressList';
import {useCreateSalesReservation} from '@hooks/api/reservation-sales.rq';
import {useCreateServiceReservation} from '@hooks/api/reservation-service.rq';
import {useActions} from '@hooks/useActions';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BookingSummary = () => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  const [quantity, setQuantity] = useState(1);

  const {cartItem} = useTypedSelector(state => state.cart);
  const {user} = useTypedSelector(state => state.auth);
  const {isSuccess} = useTypedSelector(state => state.success);
  const {addressList, primaryId} = useTypedSelector(state => state.address);
  const primaryAddress = addressList.find(addr => addr.id === primaryId);

  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [instructions, setInstructions] = useState('');

  const {setSuccess, deleteCart} = useActions();
  const {mutateAsync: bookService, isPending} = useCreateServiceReservation();
  const {mutateAsync: bookSales, isPending: isSalesPending} =
    useCreateSalesReservation();

  // const {myAddress} = useTypedSelector(state => state.address);
  // const defaultAddress = myAddress?.find(addr => addr.isDefault);

  console.log('Cart data', cartItem);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBooking = async () => {
    console.log('Booking button clicked');
    try {
      const reservationCommonData = {
        client_id: user?.id,
        status: 'pending',
        date: new Date(cartItem.selectedDay).toISOString(),
        time_slot: cartItem.selectedTimeSlot,
        total_amount: cartItem.price * 1,
        address: primaryAddress
          ? `${primaryAddress.address_title} ${primaryAddress.city}`
          : '',
        instructions: instructions,
      };
      let response;
      if (cartItem.type === 'sales') {
        const reservationData = {
          ...reservationCommonData,
          sales_id: cartItem.id,
        };
        response = await bookSales(reservationData);
        console.log('response', response, reservationData);
      } else if (cartItem.type === 'services') {
        const reservationData = {
          ...reservationCommonData,
          service_id: cartItem.id,
        };

        response = await bookService(reservationData);
        console.log('response', response);
      }
      if (response?.status === 201) {
        deleteCart();
        setSuccess(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  if (isSuccess) {
    return (
      <SuccessScreen onRedirect={() => navigate('Tab', {screen: 'Activity'})} />
    );
  }

  if (Object.keys(cartItem).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Booking Summary" rightContent={<View />} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18}}>Your cart is empty</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Booking Summary" rightContent={<View />} />

        <ScrollView>
          {/* Main Service */}
          <View style={styles.mainServiceCard}>
            <Image
              source={{uri: cartItem.photos[0]}}
              style={styles.mainServiceImage}
            />
            <View style={styles.mainServiceDetails}>
              <Text style={styles.mainServiceTitle}>{cartItem.title}</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Icon key={star} name="star" size={14} color="#FFC107" />
                ))}
                <Text style={styles.ratingText}>(5.0)</Text>
              </View>
              <View style={styles.priceQuantityContainer}>
                <Text style={styles.priceText}>${cartItem.price}</Text>
                <View style={styles.quantityControl}>
                  <Button
                    variant="ghost"
                    leftIcon={<Icon name="trash" size={16} color="red" />}
                    onPress={() => deleteCart()}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Frequently Added Together */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Frequently Added Together</Text>

            <View style={styles.recommendedServices}>
              {/* Kitchen Cleaning */}
              <View style={styles.recommendedServiceCard}>
                {/* <Image
                source={require('../assets/kitchen-cleaning.jpg')}
                style={styles.recommendedServiceImage}
              /> */}
                <View style={styles.recommendedServiceRating}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Icon key={star} name="star" size={12} color="#FFC107" />
                  ))}
                  <Text style={styles.smallRatingText}>(130 Reviews)</Text>
                </View>
                <Text style={styles.recommendedServiceTitle}>
                  Complete Kitchen Cleaning
                </Text>
                <View style={styles.recommendedServicePrice}>
                  <Text style={styles.discountedPrice}>$150</Text>
                  <Text style={styles.originalPrice}>$180</Text>
                </View>
                <View style={styles.providerContainer}>
                  {/* <Image
                  source={require('../assets/provider1.jpg')}
                  style={styles.providerImage}
                /> */}
                  <Text style={styles.providerName}>Mark Williams</Text>
                </View>
                <Button
                  label="View Details"
                  size="small"
                  style={styles.addButton}
                />
              </View>

              {/* AC Service */}
              <View style={styles.recommendedServiceCard}>
                {/* <Image
                source={require('../assets/ac-service.jpg')}
                style={styles.recommendedServiceImage}
              /> */}
                <View style={styles.recommendedServiceRating}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Icon key={star} name="star" size={12} color="#FFC107" />
                  ))}
                  <Text style={styles.smallRatingText}>(1)</Text>
                </View>
                <Text style={styles.recommendedServiceTitle}>AC Service</Text>
                <View style={styles.recommendedServicePrice}>
                  <Text style={styles.discountedPrice}>$50</Text>
                  <Text style={styles.originalPrice}>$80</Text>
                </View>
                <View style={styles.providerContainer}>
                  {/* <Image
                  source={require('../assets/provider2.jpg')}
                  style={styles.providerImage}
                /> */}
                  <Text style={styles.providerName}>Jacob James</Text>
                </View>
                <Button
                  label="View Details"
                  size="small"
                  style={styles.addButton}
                />
              </View>
            </View>
          </View>

          <Button
            label="Apply Coupon"
            variant="ghost"
            style={styles.couponButton}
            leftIcon={
              <Icon name="pricetag-outline" size={20} color="#FFC163" />
            }
          />

          {/* Cost Breakdown */}
          <View style={styles.costBreakdown}>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Item Total</Text>
              <Text style={styles.costValue}>${cartItem.price}</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Discount</Text>
              <Text style={styles.costValue}>$0</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Delivery Fee</Text>
              <Text style={styles.deliveryText}>Free</Text>
            </View>
            <View style={[styles.costRow, styles.totalRow]}>
              <Text style={styles.grandTotalLabel}>Grand Total</Text>
              <Text style={styles.grandTotalValue}>${cartItem.price}</Text>
            </View>
          </View>

          {/* Address Section */}
          <View style={styles.addressSection}>
            <View style={styles.addressRow}>
              <View style={styles.addressLeft}>
                <Icon name="location-outline" size={20} color="#FFC163" />
                <View style={styles.addressTextContainer}>
                  <Text style={styles.addressLabel}>Address</Text>
                  <Text style={styles.addressValue}>
                    {primaryAddress
                      ? `${primaryAddress.address_title} ${primaryAddress.city}`
                      : 'No address set'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsAddressModalVisible(true)}>
                <Text style={styles.changeButton}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.instructionsSection}>
            <Text style={styles.sectionTitle}>Special Instructions</Text>
            <TextInput
              style={{
                height: 60,
                borderColor: '#ddd',
                borderWidth: 1,
                borderRadius: 4,
                paddingHorizontal: 8,
                color: theme.colors.textSecondary,
              }}
              placeholder="Add any special instructions for the service provider"
              placeholderTextColor={'#888'}
              value={instructions}
              onChangeText={setInstructions}
            />
          </View>
        </ScrollView>
        <View style={styles.priceConfirmRow}>
          <View>
            <Text style={styles.confirmPriceLabel}>Price</Text>
            <Text style={styles.confirmPriceValue}>${cartItem.price}</Text>
          </View>
          <Button
            label="Book"
            disabled={isPending}
            loading={isPending}
            onPress={handleBooking}
          />
        </View>
      </SafeAreaView>
      <ActionSheet
        title="Select an Address"
        visible={isAddressModalVisible}
        onCancel={() => setIsAddressModalVisible(false)}>
        <AddressList />
      </ActionSheet>
    </>
  );
};

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.card,
    },
    backButton: {
      padding: 4,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    mainServiceCard: {
      backgroundColor: theme.components.card.background,
      flexDirection: 'row',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    mainServiceImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    mainServiceDetails: {
      flex: 1,
      marginLeft: 16,
    },
    mainServiceTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      color: theme.colors.text,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    ratingText: {
      marginLeft: 4,
      fontSize: 12,
      color: '#666',
    },
    priceQuantityContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    priceText: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
    },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      width: 26,
      height: 26,
      borderWidth: 1,
      borderColor: '#ddd',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
    },
    incrementButton: {
      backgroundColor: '#0066CC',
      borderColor: '#0066CC',
    },
    quantityButtonText: {
      fontSize: 16,
      fontWeight: '600',
      //color: '#000',
      //color: theme.colors.textSecondary,
    },
    quantityText: {
      paddingHorizontal: 12,
      fontSize: 16,
    },
    sectionContainer: {
      backgroundColor: theme.colors.card,
      padding: 16,
      marginTop: 8,
    },
    instructionsSection: {
      backgroundColor: '#fff',
      padding: 16,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 12,
      color: theme.colors.textSecondary,
    },
    recommendedServices: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    recommendedServiceCard: {
      width: '48%',
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: theme.components.card.backgroundColor,
    },
    recommendedServiceImage: {
      width: '100%',
      height: 100,
      resizeMode: 'cover',
    },
    recommendedServiceRating: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 6,
    },
    smallRatingText: {
      fontSize: 10,
      //color: '#666',
      marginLeft: 4,
      color: theme.colors.textSecondary,
    },
    recommendedServiceTitle: {
      fontSize: 14,
      fontWeight: '600',
      paddingHorizontal: 8,
      marginBottom: 4,
      color: theme.colors.textSecondary,
    },
    recommendedServicePrice: {
      flexDirection: 'row',
      paddingHorizontal: 8,
      marginBottom: 8,
    },
    discountedPrice: {
      fontSize: 14,
      fontWeight: '600',
      marginRight: 6,
      color: theme.colors.textSecondary,
    },
    originalPrice: {
      fontSize: 14,
      //color: '#888',
      textDecorationLine: 'line-through',
      color: theme.colors.textSecondary,
    },
    providerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      marginBottom: 8,
    },
    providerImage: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginRight: 4,
    },
    providerName: {
      fontSize: 12,
      //color: '#666',
      color: theme.colors.textTertiary,
    },
    addButton: {
      alignItems: 'center',
      paddingVertical: 8,
      marginTop: 'auto',
      //backgroundColor: 'red',
    },
    addButtonText: {
      color: '#fff',
      fontWeight: '600',
      //color: theme.colors.textSecondary,
    },
    couponButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: '#fff',
      marginTop: 8,
    },
    couponText: {
      flex: 1,
      marginLeft: 8,
      color: '#0066CC',
      fontWeight: '500',
    },
    costBreakdown: {
      backgroundColor: theme.colors.card,
      padding: 16,
      marginTop: 8,
    },
    costRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    costLabel: {
      //color: '#666',
      color: theme.colors.textSecondary,
    },
    costValue: {
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },
    deliveryText: {
      color: theme.colors.primary,
      fontWeight: '500',
    },
    totalRow: {
      marginTop: 8,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    grandTotalLabel: {
      fontWeight: '600',
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    grandTotalValue: {
      fontWeight: '700',
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    addressSection: {
      backgroundColor: theme.colors.card,
      padding: 16,
      marginTop: 8,
      marginBottom: 20,
    },
    addressRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    addressLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    addressTextContainer: {
      marginLeft: 8,
    },
    addressLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    addressValue: {
      fontWeight: '500',
      color: theme.colors.textTertiary,
    },
    changeButton: {
      color: theme.colors.primary,
      fontWeight: '500',
    },
    priceConfirmRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: SPACING.md,
    },
    confirmPriceLabel: {
      fontSize: 12,
      //color: '#666',
      color: theme.colors.textSecondary,
    },
    confirmPriceValue: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.textSecondary,
    },
    selectSlotButton: {
      backgroundColor: '#FFC163',
      paddingHorizontal: 32,
      paddingVertical: 12,
      borderRadius: 4,
    },
    selectSlotText: {
      color: '#fff',
      fontWeight: '600',
    },
  });

export default BookingSummary;
