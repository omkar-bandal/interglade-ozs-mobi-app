import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './ui/Button';

const Filter = () => {
  return (
    <View>
      <Button leftIcon={<Icon name="filter" />} />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({});
