import ScreenHeader from '@components/header/ScreenHeader';
import {Location} from '@features/locations/components/Locations';
import useTheme from '@theme/useTheme';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const LocationScreen = () => {
  const {theme} = useTheme();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScreenHeader title="Location" />
      <Location />
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
