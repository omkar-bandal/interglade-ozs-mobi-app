import {useGetGoggleMapAPIKey} from '@hooks/api/location.rq';
import React, {useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Types
interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  placeId?: string;
}

interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export const Location: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [recentLocations, setRecentLocations] = useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoadingCurrentLocation, setIsLoadingCurrentLocation] =
    useState<boolean>(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const {data: mapKeyData, isLoading: isMapKeyLoading} =
    useGetGoggleMapAPIKey();
  // Fetch recent locations from Supabase on component mount
  //   useEffect(() => {
  //     fetchRecentLocations();
  //   }, []);

  // Fetch recent locations from Supabase
  //   const fetchRecentLocations = async () => {
  //     try {
  //       setIsLoading(true);
  //       const {data, error} = await supabase
  //         .from('locations')
  //         .select('*')
  //         .order('created_at', {ascending: false})
  //         .limit(5);

  //       if (error) {
  //         throw error;
  //       }

  //       if (data) {
  //         setRecentLocations(data as Location[]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching recent locations:', error);
  //       Alert.alert('Error', 'Failed to load recent locations');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  // Save location to Supabase
  //   const saveLocation = async (location: Location) => {
  //     try {
  //       const {error} = await supabase.from('locations').insert([
  //         {
  //           name: location.name,
  //           address: location.address,
  //           latitude: location.latitude,
  //           longitude: location.longitude,
  //           place_id: location.placeId,
  //         },
  //       ]);

  //       if (error) {
  //         throw error;
  //       }

  //       // Refresh the recent locations
  //       fetchRecentLocations();
  //     } catch (error) {
  //       console.error('Error saving location:', error);
  //       Alert.alert('Error', 'Failed to save location');
  //     }
  //   };

  const GOOGLE_API_KEY = useMemo(() => mapKeyData?.data?.value, [mapKeyData]);
  // const GOOGLE_API_KEY = 'AIzaSyD0BAy73w-gsuLv52T0zeecfMXBnZQN6T4';

  // Handle search input changes
  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setIsSearching(!!text);

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (text.length > 2) {
      // Debounce the search requests
      searchTimeout.current = setTimeout(() => {
        fetchPredictions(text);
      }, 300);
    } else {
      setPredictions([]);
    }
  };

  // Fetch predictions from Google Places API
  const fetchPredictions = async (input: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input,
        )}&key=${GOOGLE_API_KEY}&language=en`,
      );

      const data = await response.json();
      console.log('dasdsad', data);
      if (data.predictions) {
        setPredictions(data.predictions);
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
      Alert.alert('Error', 'Failed to fetch location predictions');
    } finally {
      setIsLoading(false);
    }
  };

  // Get place details from Google Places API
  const getPlaceDetails = async (placeId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry&key=${GOOGLE_API_KEY}`,
      );

      const data = await response.json();
      console.log('data', data);

      if (data.result) {
        const location: Location = {
          id: Date.now().toString(),
          name: data.result.name,
          address: data.result.formatted_address,
          latitude: data.result.geometry.location.lat,
          longitude: data.result.geometry.location.lng,
          placeId: placeId,
        };

        // saveLocation(location);
        setSearchText('');
        setPredictions([]);
        return location;
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      Alert.alert('Error', 'Failed to fetch place details');
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  // Handle prediction selection
  const handleSelectPrediction = async (prediction: Prediction) => {
    Keyboard.dismiss();
    const location = await getPlaceDetails(prediction.place_id);
    if (location) {
      // Here you would typically handle the selected location
      // For example, pass it back to a parent component or navigate to a new screen
      console.log('Selected location:', location);
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    setIsLoadingCurrentLocation(true);

    // Check if the Geolocation API is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          try {
            // Reverse geocode to get address information
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_API_KEY}`,
            );

            const data = await response.json();

            if (data.results && data.results.length > 0) {
              const result = data.results[0];
              const location: Location = {
                id: Date.now().toString(),
                name: 'Current Location',
                address: result.formatted_address,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                placeId: result.place_id,
              };

              setCurrentLocation(location);
              //   saveLocation(location);
            }
          } catch (error) {
            console.error('Error getting address from coordinates:', error);
            Alert.alert('Error', 'Failed to get address from your coordinates');
          } finally {
            setIsLoadingCurrentLocation(false);
          }
        },
        (error: any) => {
          setIsLoadingCurrentLocation(false);
          console.error('Error getting current location:', error);
          Alert.alert(
            'Location Error',
            'Unable to get your current location. Please check your device settings.',
          );
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      setIsLoadingCurrentLocation(false);
      Alert.alert(
        'Not Supported',
        'Geolocation is not supported by this device',
      );
    }
  };

  // Render prediction item
  const renderPredictionItem = ({item}: {item: Prediction}) => (
    <TouchableOpacity
      style={styles.predictionItem}
      onPress={() => handleSelectPrediction(item)}>
      <View style={styles.predictionIcon}>
        {/* <Image
          source={require('./assets/place-icon.png')}
          style={styles.placeIcon}
        /> */}
      </View>
      <View style={styles.predictionText}>
        <Text style={styles.primaryText}>
          {item.structured_formatting.main_text}
        </Text>
        <Text style={styles.secondaryText}>
          {item.structured_formatting.secondary_text}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Render recent location item
  const renderRecentLocationItem = ({item}: {item: Location}) => (
    <TouchableOpacity
      style={styles.recentLocationItem}
      onPress={() => {
        // Handle selecting a recent location
        console.log('Selected recent location:', item);
      }}>
      <View style={styles.recentLocationIcon}>
        {/* <Image
          source={require('./assets/history-icon.png')}
          style={styles.historyIcon}
        /> */}
      </View>
      <View style={styles.recentLocationText}>
        <Text style={styles.primaryText}>{item.name}</Text>
        <Text style={styles.secondaryText}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={16} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a location"
            value={searchText}
            onChangeText={handleSearchChange}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSearchText('');
                setPredictions([]);
                setIsSearching(false);
              }}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={getCurrentLocation}
          disabled={isLoadingCurrentLocation}>
          {isLoadingCurrentLocation ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <>
              {/* <Image
                source={require('./assets/location-icon.png')}
                style={styles.locationIcon}
              /> */}
              <Text style={styles.currentLocationText}>Current Location</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : isSearching ? (
          <View style={styles.predictionsContainer}>
            <FlatList
              data={predictions}
              renderItem={renderPredictionItem}
              keyExtractor={item => item.place_id}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  {searchText.length > 2
                    ? 'No results found'
                    : 'Type at least 3 characters to search'}
                </Text>
              }
            />
          </View>
        ) : (
          <View style={styles.recentLocationsContainer}>
            <Text style={styles.sectionTitle}>Recent Locations</Text>
            {recentLocations.length > 0 ? (
              <FlatList
                data={recentLocations}
                renderItem={renderRecentLocationItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            ) : (
              <Text style={styles.emptyText}>No recent locations</Text>
            )}

            {currentLocation && (
              <>
                <Text style={styles.sectionTitle}>Current Location</Text>
                <TouchableOpacity
                  style={styles.recentLocationItem}
                  onPress={() => {
                    // Handle selecting the current location
                    console.log('Selected current location:', currentLocation);
                  }}>
                  <View style={styles.recentLocationIcon}>
                    {/* <Image
                      source={require('./assets/current-location-icon.png')}
                      style={styles.currentIcon}
                    /> */}
                  </View>
                  <View style={styles.recentLocationText}>
                    <Text style={styles.primaryText}>
                      {currentLocation.name}
                    </Text>
                    <Text style={styles.secondaryText}>
                      {currentLocation.address}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 44 : 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333333',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999999',
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 8,
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  currentLocationText: {
    fontSize: 16,
    color: '#007AFF',
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666666',
  },
  predictionsContainer: {
    paddingHorizontal: 16,
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  predictionIcon: {
    marginRight: 12,
  },
  placeIcon: {
    width: 24,
    height: 24,
  },
  predictionText: {
    flex: 1,
  },
  recentLocationsContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#333333',
  },
  recentLocationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recentLocationIcon: {
    marginRight: 12,
  },
  historyIcon: {
    width: 24,
    height: 24,
  },
  currentIcon: {
    width: 24,
    height: 24,
  },
  recentLocationText: {
    flex: 1,
  },
  primaryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  secondaryText: {
    fontSize: 14,
    color: '#777777',
    marginTop: 2,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    paddingVertical: 16,
    textAlign: 'center',
  },
});
