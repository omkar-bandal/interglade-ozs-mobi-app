import Tabs from '@components/ui/Tabs';
import {SPACING} from '@theme/constants';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import MySalesBookings from './my-booking/MySalesBooking';
import MyServiceBookings from './my-booking/MyServiceBooking';
import MySalesProposal from './my-proposal/MySalesProposal';
import MyServiceProposal from './my-proposal/MyServiceProposal';

const MainTabs = () => {
  const [mainTab, setMainTab] = useState('services');
  const [secondaryTab, setSecondaryTab] = useState('bookings');
  const [thirdTab, setThirdTab] = useState('pending');

  return (
    <View style={{flex: 1}}>
      <View style={styles.tabsContainer}>
        <Tabs
          items={[
            {name: 'Services', value: 'services'},
            {name: 'Sales', value: 'sales'},
          ]}
          value={mainTab}
          onItemChange={setMainTab}
        />
        <Tabs
          items={[
            {name: 'My Bookings', value: 'bookings'},
            {name: 'My Proposal', value: 'proposal'},
          ]}
          value={secondaryTab}
          onItemChange={setSecondaryTab}
        />
        <Tabs
          items={[
            {name: 'Upcoming', value: 'pending'},
            {name: 'Past', value: 'past'},
          ]}
          value={thirdTab}
          onItemChange={setThirdTab}
        />
      </View>

      <View style={styles.tabsInnerContainer}>
        {mainTab === 'services' ? (
          secondaryTab === 'proposal' ? (
            <MyServiceProposal tabType={thirdTab} />
          ) : (
            <MyServiceBookings tabType={thirdTab} />
          )
        ) : secondaryTab === 'proposal' ? (
          <MySalesProposal tabType={thirdTab} />
        ) : (
          <MySalesBookings tabType={thirdTab} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  tabsInnerContainer: {
    flex: 1,
    marginTop: SPACING.xxl * 3,
  },
});

export default MainTabs;
