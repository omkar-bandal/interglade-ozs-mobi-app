import Tabs from '@components/ui/Tabs';
import {SPACING} from '@theme/constants';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import MyBookings from './MyBooking';
import MyProposal from './MyProposal';

const MainTabs = () => {
  const [mainTab, setMainTab] = useState('bookings');
  const [secondaryTab, setSecondaryTab] = useState('pending');

  const handleMainTabChange = (value: any) => {
    setMainTab(value);
  };

  const handleSecondaryTabChange = (value: any) => {
    setSecondaryTab(value);
  };

  return (
    <>
      <View style={styles.tabsContainer}>
        <Tabs
          items={[
            {name: 'My Bookings', value: 'bookings'},
            {name: 'My Proposal', value: 'proposal'},
          ]}
          value={mainTab}
          onItemChange={handleMainTabChange}
        />

        <Tabs
          items={[
            {name: 'Upcoming', value: 'pending'},
            {name: 'Past', value: 'past'},
          ]}
          value={secondaryTab}
          onItemChange={handleSecondaryTabChange}
        />
      </View>

      <View style={styles.tabsInnerContainer}>
        {mainTab === 'bookings' ? (
          <MyBookings tabType={secondaryTab} />
        ) : (
          <MyProposal tabType={secondaryTab} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  tabsInnerContainer: {
    flex: 1,
    marginTop: SPACING.xxl * 2,
  },
});

export default MainTabs;
