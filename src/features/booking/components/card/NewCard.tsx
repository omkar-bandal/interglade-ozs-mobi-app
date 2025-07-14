import Button from '@components/ui/Button';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';

export function NewCards({service, onReserveClick}: any) {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  return (
    <TouchableOpacity
      key={service.id}
      onPress={() => onReserveClick(service.id)}
      style={[
        styles.card,
        {backgroundColor: theme.components.card.backgroundColor},
      ]}>
      <Image
        source={{uri: service.photos[0]}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.serviceName} numberOfLines={1} ellipsizeMode="tail">
          {service.title || 'Service Name'}
        </Text>
      </View>

      <View style={{padding: SPACING.sm}}>
        <View style={styles.buttonContainer}>
          <View style={styles.priceButton}>
            <Text style={styles.priceText}>${service?.price}</Text>
          </View>

          <Button
            variant="primary"
            size="small"
            label="Book Now"
            onPress={onReserveClick}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const themeStyles = (theme: any) =>
  StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: '500',
      //fontFamily: fontFamily.Bold,
      color: theme.colors.text,
    },
    card: {
      width: 170,
      height: 235,
      borderRadius: 8,
      margin: SPACING.sm,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      elevation: 3,
      padding: 5,
    },
    image: {
      width: 160,
      height: 140,
      //backgroundColor: 'red',
      resizeMode: 'contain',
      marginBottom: 10,
      borderRadius: 8,
    },
    textContainer: {
      width: '100%',
      alignItems: 'flex-start',
      marginBottom: 10,
      paddingHorizontal: 5,
    },
    serviceName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      //marginBottom: 4,
      width: '100%',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 5,
      //backgroundColor: 'red',
    },
    button: {
      borderRadius: 5,
      alignItems: 'center',
      fontWeight: 700,
    },
    priceButton: {
      fontSize: 11,
      width: 61,
      height: 33,
      //paddingHorizontal: 3,
      justifyContent: 'center',
    },
    priceText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#4D948E',
      marginBottom: 6,
      lineHeight: 16,
    },
    bookButton: {
      fontSize: 12,
      paddingBlock: 9,
      width: 73,
      backgroundColor: '#4D948E',
    },
    bookText: {
      fontSize: 11,
      fontWeight: 'bold',
      color: 'white',
    },
  });
