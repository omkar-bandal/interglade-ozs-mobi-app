import Button from '@components/ui/Button';
import {darkTheme, SPACING} from '@theme/constants';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ServicesCard = ({service, onReserveClick}: any) => {
  // const {data: servicesData} = useGetAllServices();
  // const [selectedProviderId, setSelectedProviderId] = useState<string | null>(
  //   null,
  // );

  // const handleContactClick = useCallback(
  //   (serviceId: any): void => {
  //     const selectedService = servicesData?.data?.find(
  //       (service: any) => service.id === serviceId,
  //     );
  //     // if (selectedService?.provider_id === user?.id) {
  //     //   return;
  //     // }

  //     // Set the provider ID to trigger the hooks and effect
  //     if (selectedService?.provider_id) {
  //       setSelectedProviderId(selectedService.provider_id);
  //     }
  //   },
  //   [null],
  // );

  return (
    <TouchableOpacity
      key={service.id}
      style={styles.card}
      onPress={() => onReserveClick(service.id)}>
      <View>
        {/* Service Image */}
        <Image
          source={{uri: service.photos[0]}}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Card Content */}
        <View style={styles.content}>
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(star => (
                <Icon key={star} name="star" size={14} color="#FFC107" />
              ))}
            </View>
            <Text style={styles.reviewCount}>(150 Reviews)</Text>
          </View>

          {/* Service Title */}
          <Text style={styles.title}>{service.title || 'Cleaning'}</Text>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${service.price || '100'}</Text>
          </View>

          {/* Service Provider */}
          <View style={styles.providerContainer}>
            <View style={styles.providerInfo}>
              <Image
                source={{uri: service.profiles?.profile_picture_url}}
                style={styles.providerImage}
              />
              <View style={styles.providerDetails}>
                <Text style={styles.providerName}>
                  {service.profiles?.first_name} {service.profiles?.last_name}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Button*/}

          <View style={styles.actionBtnRow}>
            {/* <Button
              label="Message"
              variant="outline"
              size="medium"
              style={styles.button}
              leftIcon={<AntDesign name="wechat" size={16} color="#393872" />}
              onPress={() => handleContactClick(service.id)}
            /> */}

            <Button
              label="Book"
              variant="primary"
              size="medium"
              style={styles.button}
              onPress={() => onReserveClick(service.id)}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: darkTheme.components.card.backgroundColor,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 140,
  },
  content: {
    padding: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: darkTheme.colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: darkTheme.colors.textSecondary,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  providerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  providerDetails: {
    justifyContent: 'center',
  },
  providerName: {
    fontSize: 14,
    fontWeight: '500',
    color: darkTheme.colors.textTertiary,
  },
  providerRole: {
    fontSize: 12,
    color: '#777',
  },
  actionBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  button: {
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
