import {AppHeader} from '@components/header/AppHeader';
import Tabs from '@components/ui/Tabs';
import {PopularServices} from '@features/booking/components/PopularServices';
import {RecentSales} from '@features/booking/components/RecentSales';
import {SalesCategories} from '@features/booking/components/SalesCategories';
import {ServicesCategories} from '@features/booking/components/ServicesCategories';
import {lightTheme, SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function Booking() {
  const {theme} = useTheme();
  const [tabValue, setTabValue] = useState('sales');

  const handleTabChange = (value: string) => {
    setTabValue(value);
  };

  // const images = [
  //   'https://plus.unsplash.com/premium_photo-1661929137248-2544fd28de13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxlY3RyaWNpYW4lMjB3b3JraW5nfGVufDB8fDB8fHww',
  //   'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VydmljZXxlbnwwfHwwfHx8MA%3D%3D',
  //   'https://plus.unsplash.com/premium_photo-1661409505401-f7144407ec74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VydmljZXxlbnwwfHwwfHx8MA%3D%3D',
  // ];

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView>
        <View style={{gap: SPACING.md}}>
          <AppHeader />

          {/* <ImageCarousel
            images={images}
            autoPlay={true}
            autoPlayInterval={5000}
          /> */}

          <Pressable
            style={styles.searchContainer}
            onPress={() => {
              navigate('SearchAndFilter');
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: SPACING.sm,
                paddingVertical: SPACING.sm / 2,
              }}>
              <Icon name="search" size={20} color={theme.colors.text} />
              <Text
                style={{
                  marginLeft: SPACING.sm,
                  color: theme.colors.textSecondary,
                  flex: 1,
                }}>
                Search services or sales...
              </Text>
              <Icon
                name="filter"
                size={24}
                color={theme.colors.text}
                style={{
                  padding: SPACING.sm,
                  borderRadius: 8,
                }}
              />
            </View>
          </Pressable>

          <View style={styles.tabContainer}>
            <View style={styles.tabsWrapper}>
              <Tabs
                items={[
                  {name: 'Sales', value: 'sales'},
                  {name: 'Services', value: 'services'},
                ]}
                value={tabValue}
                onItemChange={handleTabChange}
              />
            </View>
          </View>

          {tabValue === 'sales' ? <SalesCategories /> : <ServicesCategories />}

          {/* <SalesCategories /> */}

          {/* <ServicesCategories /> */}

          <PopularServices />

          <RecentSales />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabContainer: {
    paddingTop: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Changed from 'stretch' to 'center'
    paddingHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
  },
  tabsWrapper: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  searchContainer: {
    borderRadius: 8,
    borderColor: lightTheme.colors.gray,
    borderWidth: 1,
    margin: SPACING.md,
  },
});
