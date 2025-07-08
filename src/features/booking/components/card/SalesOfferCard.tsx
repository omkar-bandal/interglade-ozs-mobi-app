import Button from '@components/ui/Button';
import {lightTheme, SPACING} from '@theme/constants';
import {navigate} from '@utils/NavigationUtils';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const OfferCard = ({sale, onReserveClick}: any) => {
  // const {data: saleData} = useGetAllSales();
  //const [selectedSale, setSelectedSale] = useState<string | null>(null);

  const handelReserveClick = (saleId: any): void => {
    // const selectedSale = saleData?.data?.find(
    //   (sale: any) => sale.id === saleId,
    // );
    console.log(saleId);
    //Alert.alert('Sale Data', JSON.stringify(sale));

    navigate('ServiceDetails', {
      saleId,
    });
  };

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
        <Text style={styles.title}>{sale.title}</Text>
        <Text style={styles.discription} numberOfLines={1} ellipsizeMode="tail">
          {sale.description}
        </Text>

        {/* Book Now Button */}
        <View>
          <Button
            label="Book"
            variant="primary"
            size="medium"
            style={styles.button}
            onPress={() => handelReserveClick(sale.id)}
          />
        </View>
      </View>
    </TouchableOpacity>
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
    paddingHorizontal: 5,
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
