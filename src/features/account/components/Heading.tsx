import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

type HeadingProps = {
  title: string;
};

export const Heading: React.FC<HeadingProps> = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.headerAction}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesignIcon color="#000" name="arrowleft" size={24} />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={1} style={styles.headerTitle}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
});
