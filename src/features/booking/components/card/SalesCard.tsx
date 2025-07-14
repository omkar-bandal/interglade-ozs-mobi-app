import darkTheme from '@theme/light';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const SalesCard = ({
  sale,
  selectedProviderId,
  onContactClick,
  onReserveClick,
}: any) => {
  return (
    <TouchableOpacity
      key={sale.id}
      style={styles.card}
      onPress={() => onReserveClick(sale.id)}>
      <View style={styles.cardContainer}>
        {/* sale Image - Left Side */}
        <Image
          source={{uri: sale.photos[0]}}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Card Content - Right Side */}
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

          {/* sale Title */}
          <Text style={styles.title} numberOfLines={2}>
            {sale.title}
          </Text>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${sale.price}</Text>
          </View>

          {/* sale Provider */}
          <View style={styles.providerContainer}>
            <View style={styles.providerInfo}>
              <Image
                source={{uri: 'https://example.com/provider.jpg'}}
                style={styles.providerImage}
              />
              <View style={styles.providerDetails}>
                <Text style={styles.providerName}>Mark Williams</Text>
                <Text style={styles.providerRole}>sale Provider</Text>
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
    backgroundColor: darkTheme.components.card.backgroundColor,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    height: 140,
  },
  image: {
    width: 140,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
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
    //color: '#666',
    marginLeft: 4,
    color: darkTheme.colors.textSecondary,
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
    marginBottom: 6,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: darkTheme.colors.textSecondary,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  providerDetails: {
    justifyContent: 'center',
  },
  providerName: {
    fontSize: 12,
    fontWeight: '500',
    color: darkTheme.colors.textSecondary,
  },
  providerRole: {
    fontSize: 10,
    color: '#777',
  },
});
