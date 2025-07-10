import Button from '@components/ui/Button';
import {darkTheme, SPACING} from '@theme/constants';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';

export function NewCards({service}: {service: any}) {
  return (
    <View
      key={service.id}
      style={[
        styles.card,
        {backgroundColor: darkTheme.components.card.backgroundColor},
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

          <TouchableOpacity style={styles.button}>
            <Button variant="primary" size="small" label="Book Now" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '500',
    //fontFamily: fontFamily.Bold,
    color: darkTheme.colors.text,
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
    color: darkTheme.colors.text,
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
