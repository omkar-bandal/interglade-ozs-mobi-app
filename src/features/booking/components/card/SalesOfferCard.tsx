import { lightTheme, SPACING } from '@theme/constants';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {spacing} from '../../../constants/dimensions';
// import { colors } from '../../../constants/colors';

type Props = {
  image: any;
  title: string;
  description: string;
  onBookNow?: () => void;
};

const OfferCard = ({image, title, description, onBookNow}: Props) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.discription}>{description}</Text>

      {/* Book Now Button */}
      <TouchableOpacity style={styles.button} onPress={onBookNow}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>  
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: '#fff',
    margin: SPACING.sm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: '#eee',
  },

  image: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  discription: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 10,
  },

  button: {
    backgroundColor: lightTheme.components.button.primaryBackground,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal:5,
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
