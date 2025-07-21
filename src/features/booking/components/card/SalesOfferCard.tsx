import Button from '@components/ui/Button';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const OfferCard = ({sale, onReserveClick}: any) => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  // const {data: saleData} = useGetAllSales();
  //const [selectedSale, setSelectedSale] = useState<string | null>(null);

  // const handelReserveClick = (saleId: any): void => {
  //   // const selectedSale = saleData?.data?.find(
  //   //   (sale: any) => sale.id === saleId,
  //   // );
  //   console.log(saleId);
  //   //Alert.alert('Sale Data', JSON.stringify(sale));

  //   navigate('ServiceDetails', {
  //     saleId,
  //   });
  // };

  return (
    <TouchableOpacity
      key={sale.id}
      style={styles.card}
      onPress={() => onReserveClick(sale.id)}>
      <View>
        <Image
          source={{uri: sale.photos[0]}}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {sale.title}
        </Text>
        <Text style={styles.discription} numberOfLines={1} ellipsizeMode="tail">
          {sale.description}
        </Text>

        {/* Book Now Button */}
        <Button
          label="Book"
          variant="primary"
          size="medium"
          style={styles.button}
          onPress={() => onReserveClick(sale.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default OfferCard;

const themeStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      width: 160,
      height: 220,
      margin: SPACING.sm,
      padding: SPACING.sm,
      borderRadius: 10,
      backgroundColor: theme.components.card.backgroundColor,
    },
    image: {
      height: 100,
      width: '100%',
      borderRadius: 5,
    },
    title: {
      fontSize: 16,
      fontWeight: '800',
      textAlign: 'center',
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    discription: {
      fontSize: 14,
      fontWeight: '400',
      textAlign: 'center',
      color: theme.colors.textSecondary,
      marginBottom: 10,
    },
    button: {
      borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 5,
      marginTop: 4,
      backgroundColor: theme.components.button.primaryBackground,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
