import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EmptyBookingsList = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="calendar" size={50} color="#ccc" />
    <Text style={styles.emptyTitle}>No Bookings Found</Text>
    <Text style={styles.emptySubtitle}>
      You don't have any bookings at the moment
    </Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default EmptyBookingsList;
