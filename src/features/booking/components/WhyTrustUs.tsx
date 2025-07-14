/* eslint-disable react-native/no-inline-styles */
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export const data = [
  {
    id: 1,
    title: 'Secure and Reliable',
    subtitle: 'Secure transactions and payment protection.',
    //image: require('../assets/secure.png'),
  },
  {
    id: 2,
    title: 'Guranteed Quality',
    subtitle: 'Top-rated services with verified reviews.',
    //image: require('../assets/secure.png'),
  },
  {
    id: 3,
    title: 'Verified Providers',
    subtitle: 'Verifies services provider and sellers',
    //image: require('../assets/secure.png'),
  },
  {
    id: 4,
    title: 'Satisfaction Guaranteed',
    subtitle: '24/7 customer support and satisfaction guarantee.',
    //image: require('../assets/secure.png'),
  },
];

export default function WhyTrustUs() {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  return (
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Why Trust Us ?</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>
            A secure, reliable, and hassle-free
          </Text>
          <Text style={styles.subtitleText}>experience — every time!</Text>
        </View>
        <View style={styles.cardContainer}>
          {data.map((item, key) => (
            <View key={key} style={styles.card}>
              {/* Image */}
              <View style={styles.iconCon}>
                <AntDesignIcon color="#7688B3" name="check" size={24} />
              </View>
              <View style={{flexShrink: 1, marginLeft: 10}}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text
                  style={styles.cardText}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {item.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: theme.colors.background,
    },
    heading: {
      paddingLeft: SPACING.lg,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    headingText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#7688B3',
    },
    subtitle: {
      paddingLeft: SPACING.lg,
      alignItems: 'center',
      marginBottom: 20,
    },
    subtitleText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: 500,
    },
    cardContainer: {
      paddingVertical: 10,
      //backgroundColor: 'red',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      backgroundColor: theme.components.card.backgroundColor,
      marginBottom: 5,
      borderRadius: 8,
    },
    iconCon: {
      height: 60,
      width: 60,
      margin: SPACING.sm,
      borderRadius: 10,
      backgroundColor: '#B4EBE6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardTitle: {
      fontWeight: 500,
      fontSize: 16,
      color: '#393872',
    },
    cardText: {
      fontWeight: 400,
      fontSize: 14,
      color: '#6A6A6A',
    },
  });
