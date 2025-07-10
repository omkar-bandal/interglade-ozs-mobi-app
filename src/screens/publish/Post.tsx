import {useNavigation} from '@react-navigation/native';
import {darkTheme, SPACING} from '@theme/constants';
import {navigate} from '@utils/NavigationUtils';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

//import SrvcForms from '../component/publish/ServiceForms';

const Heading = ({heading}: {heading: string}) => (
  <Text style={styles.heading}>{heading}</Text>
);

const Subtitle = ({subtitle}: {subtitle: string}) => (
  <Text style={styles.subtitle}>{subtitle}</Text>
);

const PostScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.conatiner}>
      {/* <SaleForms/> */}

      <Heading heading={'What would you like to publish?'} />

      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => navigate('AddService')}>
          <View style={styles.iconContainer}>
            <AntDesignIcon color="#4D948E" name="tooloutlined" size={24} />
            {/* <ToolOutlined /> */}
          </View>
          <Subtitle subtitle={'Offer a Service'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => navigate('AddSale')}>
          <View style={styles.iconContainer}>
            <AntDesignIcon color="#4D948E" name="tooloutlined" size={24} />
          </View>
          <Subtitle subtitle={'Post a Sale'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.subContainer}>
            <View style={styles.iconContainer}>
              <AntDesignIcon color="#4D948E" name="arrowleft" size={24} />
            </View>
            <Subtitle subtitle={'Back'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
    height: '100%',
    padding: SPACING.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    marginTop: 50,
    minWidth: 296,
    backgroundColor: darkTheme.components.card.backgroundColor,
    borderRadius: 8,
    padding: SPACING.lg,
    display: 'flex',
    alignItems: 'center',
  },
  subContainer: {
    minWidth: 202,
    borderWidth: 1,
    borderColor: darkTheme.colors.primary,
    margin: SPACING.md,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 24,
    backgroundColor: '#FFFFFF',
  },
  // subBackContainer: {
  //   width: 112,
  //   borderWidth: 1,
  //   borderColor: '#C49E00',
  //   margin: SPACING.md,
  //   paddingHorizontal: 22,
  //   paddingVertical: 8,
  //   borderRadius: 5,
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   gap: 10,
  //   backgroundColor: '#FFFFFF',
  // },
  iconContainer: {
    height: SPACING.lg,
    width: SPACING.lg,
    // marginRight: spacing.sm,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: darkTheme.colors.primary,
    marginLeft: 12,
  },
});
