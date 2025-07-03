/* eslint-disable react-native/no-inline-styles */
import {SalesCard} from '@features/booking/components/card/SalesCard';
import {ServicesCard} from '@features/booking/components/card/ServicesCard';
import {useSearch} from '@hooks/api/search.rq';
import {useTheme} from '@react-navigation/native';
import {navigate} from '@utils/NavigationUtils';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type FilterType = 'sales' | 'services';

const Search: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('sales');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const {data, isLoading, error, refetch} = useSearch({
    type: activeFilter,
    search: searchQuery,
    category: undefined,
    subcategory: undefined,
    location: undefined,
    sortBy: undefined,
  });

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout for debouncing
    const newTimeoutId = setTimeout(() => {
      refetch();
    }, 300);

    setTimeoutId(newTimeoutId);
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setActiveFilter(newFilter);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleReserveClick = useCallback(
    (id: string): void => {
      if (activeFilter === 'sales') {
        navigate('SaleDetails', {
          saleId: id,
        });
      } else {
        navigate('ServiceDetails', {
          serviceId: id,
        });
      }
    },
    [activeFilter],
  );

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={24}
          color={theme.colors.text}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            {
              color: theme.colors.text,
              backgroundColor: theme.dark ? '#2A2A2A' : '#F5F5F5',
            },
          ]}
          placeholder="Search..."
          placeholderTextColor={theme.colors.text}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => handleFilterChange('sales')}
          style={[
            styles.chip,
            activeFilter === 'sales' && styles.activeChip,
            {backgroundColor: theme.dark ? '#2A2A2A' : '#F5F5F5'},
          ]}>
          <Text
            style={[
              styles.chipText,
              {color: activeFilter === 'sales' ? '#4D948E' : theme.colors.text},
            ]}>
            Sales
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFilterChange('services')}
          style={[
            styles.chip,
            activeFilter === 'services' && styles.activeChip,
            {backgroundColor: theme.dark ? '#2A2A2A' : '#F5F5F5'},
          ]}>
          <Text
            style={[
              styles.chipText,
              {
                color:
                  activeFilter === 'services' ? '#4D948E' : theme.colors.text,
              },
            ]}>
            Services
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <Text style={[styles.errorText, {color: theme.colors.card}]}>
          Error: {error.message}
        </Text>
      )}

      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4D948E" />
        </View>
      )}

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {activeFilter === 'services'
          ? data?.data?.map((service: any) => (
              <ServicesCard
                key={service.id}
                service={service}
                onReserveClick={handleReserveClick}
              />
            ))
          : data?.data?.map((sale: any) => (
              <SalesCard
                key={sale.id}
                sale={sale}
                onReserveClick={handleReserveClick}
              />
            ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    borderRadius: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
  },
  activeChip: {
    borderWidth: 1,
    borderColor: '#4D948E',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    textAlign: 'center',
    marginVertical: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
});

export default Search;
