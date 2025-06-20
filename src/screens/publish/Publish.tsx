import {AppHeader} from '@components/header/AppHeader';
import {ImageCarousel} from '@components/ImageCarousel';
import Button from '@components/ui/Button';
import Tabs from '@components/ui/Tabs';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MySales from './sales/MySales';
import MyServices from './services/MyServices';

export function Publish() {
  const {theme} = useTheme();
  const [tabValue, setTabValue] = useState('sales');

  const handleTabChange = (value: string) => {
    setTabValue(value);
  };

  const images = [
    'https://plus.unsplash.com/premium_photo-1661929137248-2544fd28de13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxlY3RyaWNpYW4lMjB3b3JraW5nfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VydmljZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1661409505401-f7144407ec74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VydmljZXxlbnwwfHwwfHx8MA%3D%3D',
  ];

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <AppHeader />

      <ImageCarousel images={images} autoPlay={true} autoPlayInterval={5000} />

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

        <Button
          style={styles.addButton}
          size="small"
          onPress={() =>
            tabValue === 'sales' ? navigate('AddSale') : navigate('AddService')
          }
          leftIcon={<AntDesignIcon name="plus" size={20} color="#fff" />}
        />
      </View>

      {tabValue === 'sales' ? <MySales /> : <MyServices />}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
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
  addButton: {
    height: 40,
    alignSelf: 'center',
    aspectRatio: 1,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
