import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ServicesCard = ({service, onReserveClick}: any) => {
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
          <Text style={styles.title}>{service.title}</Text>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${service.price}</Text>
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 10,
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
  },
  providerRole: {
    fontSize: 12,
    color: '#777',
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
