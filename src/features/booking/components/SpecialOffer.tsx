import {lightTheme, SPACING} from '@theme/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OfferCard from './card/SalesOfferCard';

export const SaleOffer = [
  {
    id: 1,
   // image: require('../../assets/bag.png'),
    title: 'Designer Handbag',
    description: 'Authentic designer handbag',
  },
  {
    id: 2,
   // image: require('../../assets/bag.png'),
    title: 'Designer Handbag',
    description: 'Authentic designer handbag',
  },
  {
    id: 2,
   // image: require('../../assets/bag.png'),
    title: 'Designer Handbag',
    description: 'Authentic designer handbag',
  },
  {
    id: 2,
  //  image: require('../../assets/bag.png'),
    title: 'Designer Handbag',
    description: 'Authentic designer handbag',
  },
];

const SpecialOffer = () => {
  return (
    <>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Special Offer</Text>
      </View>
      <View style={styles.offercontainer}>
        {SaleOffer.map((item, index) => (
          <View key={index} style={styles.offerCardWrapper}>
            <OfferCard
             image={item}
              title={item.title}
              description={item.description}
            />
          </View>
        ))}
      </View>
    </>
  );
};

export default SpecialOffer;

const styles = StyleSheet.create({
  headerSection: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: 15,
  },

  offercontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  offerCardWrapper: {
    width: '48%', // ~50% minus margin
  },
  title: {
    fontSize: 17,
    fontWeight: 700,
    color: lightTheme.colors.text,
  },
});
