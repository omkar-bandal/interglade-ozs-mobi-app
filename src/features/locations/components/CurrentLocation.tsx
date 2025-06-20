import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';

interface LocationCoords {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

const LocationPermission: React.FC = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  const requestAndroidPermission = async (): Promise<void> => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to show maps.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        setPermissionGranted(true);
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use the map features.',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestIOSPermission = async (): Promise<void> => {
    try {
      // For iOS, requestAuthorization is handled through Info.plist
      getCurrentLocation();
      setPermissionGranted(true);
    } catch (err) {
      console.warn(err);
      Alert.alert(
        'Permission Denied',
        'Location permission is required. Please enable it in your device settings.',
      );
    }
  };

  const requestLocationPermission = (): void => {
    if (Platform.OS === 'android') {
      requestAndroidPermission();
    } else {
      requestIOSPermission();
    }
  };

  const getCurrentLocation = (): void => {
    // Use the Geolocation API from the global scope
    if (
      typeof global.navigator !== 'undefined' &&
      global.navigator.geolocation
    ) {
      global.navigator.geolocation.getCurrentPosition(
        (position: any) => {
          setLocation(position.coords);
          console.log(position.coords);
        },
        (error: any) => {
          console.log(error.code, error.message);

          // If permission is denied through the geolocation API
          if (error.code === 1) {
            // PERMISSION_DENIED
            setPermissionGranted(false);
            Alert.alert(
              'Permission Denied',
              'Location permission is required. Please enable it in your device settings.',
            );
          } else {
            Alert.alert('Error', 'Unable to get your location.');
          }
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      Alert.alert('Error', 'Geolocation is not available on this device.');
    }
  };

  // Check for existing permissions when component mounts
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{marginBottom: 20}}>Location Permission Example</Text>

      <Button
        title={
          permissionGranted
            ? 'Get Current Location'
            : 'Request Location Permission'
        }
        onPress={
          permissionGranted ? getCurrentLocation : requestLocationPermission
        }
      />

      {location && (
        <View style={{marginTop: 20}}>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
        </View>
      )}
    </View>
  );
};

export default LocationPermission;
