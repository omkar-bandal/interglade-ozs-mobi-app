import {useNavigation} from '@react-navigation/native';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

//import SrvcForms from '../component/publish/ServiceForms';

const Heading = ({heading}: {heading: string}) => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  return <Text style={styles.heading}>{heading}</Text>;
};

const Subtitle = ({subtitle}: {subtitle: string}) => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  return <Text style={styles.subtitle}>{subtitle}</Text>;
};

const PostScreen = () => {
  const navigation = useNavigation();
  const {theme, themeType} = useTheme();
  const styles = themeStyles(theme);

  return (
    <View style={styles.conatiner}>
      {/* <SaleForms/> */}
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
      />

      <Heading heading={'What would you like to publish?'} />

      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => navigate('AddService')}>
          <View style={styles.iconContainer}>
            <AntDesignIcon color="#4D948E" name="setting" size={24} />
            {/* <ToolOutlined /> */}
          </View>
          <Subtitle subtitle={'Offer a Service'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => navigate('AddSale')}>
          <View style={styles.iconContainer}>
            <AntDesignIcon color="#4D948E" name="shoppingcart" size={24} />
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

var themeStyles = (theme: any) =>
  StyleSheet.create({
    conatiner: {
      flex: 1,
      // width: '100%',
      // height: '100%',
      padding: SPACING.xxl,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    boxContainer: {
      marginTop: 50,
      minWidth: 296,
      backgroundColor: theme.components.card.backgroundColor,
      borderRadius: 8,
      padding: SPACING.lg,
      display: 'flex',
      alignItems: 'center',
    },
    subContainer: {
      minWidth: 202,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      margin: SPACING.md,
      paddingHorizontal: 22,
      paddingVertical: 10,
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'row',
      gap: 24,
      backgroundColor: theme.colors.card,
    },
    iconContainer: {
      height: SPACING.lg,
      width: SPACING.lg,
    },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.primary,
      marginLeft: 12,
    },
  });
