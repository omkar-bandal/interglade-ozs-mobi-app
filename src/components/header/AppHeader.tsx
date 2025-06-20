import {navigate} from '@utils/NavigationUtils';
import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  address?: string;
  addressDetail?: string;
  notificationCount?: number;
  onNotificationPress?: () => void;
}

export const AppHeader: React.FC<HeaderProps> = ({
  address = 'Current Location',
  addressDetail = '123 Main Street, New York, NY',
  notificationCount = 0,
  onNotificationPress,
}) => {
  const handleAddressPress = () => {
    navigate('Location');
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        {/* Address Section (Left) */}
        <TouchableOpacity
          style={styles.addressContainer}
          onPress={handleAddressPress}
          activeOpacity={0.7}>
          <View style={styles.addressRow}>
            <Text style={styles.addressTitle}>{address}</Text>
            <Icon name="chevron-down-outline" size={16} color="#666" />
          </View>
          <Text style={styles.addressDetail} numberOfLines={1}>
            {addressDetail}
          </Text>
        </TouchableOpacity>

        {/* Notification Icon (Right) */}
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}>
          <Icon name="notifications-outline" size={24} color="#333" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 15 : 10,
    paddingBottom: 12,
  },
  addressContainer: {
    flex: 1,
    marginRight: 15,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginRight: 3,
  },
  addressDetail: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  notificationButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationCount: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
