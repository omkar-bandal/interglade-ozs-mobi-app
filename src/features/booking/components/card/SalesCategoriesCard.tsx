import Typography from '@components/ui/Typography';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const SalesCategoriesCard = ({items}: any) => {
  return (
    <View style={styles.wrapper}>
      {items?.map((item: any, index: number) => {
        const isLastItem = index === items.length - 1;
        const isLastItemOdd = isLastItem && items.length % 3 !== 0;

        return (
          <View
            style={[styles.container, isLastItemOdd && styles.fullWidth]}
            key={item.id}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://img.freepik.com/free-vector/cleaners-with-cleaning-products-housekeeping-service_18591-52068.jpg?semt=ais_hybrid',
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <Typography variant="caption">{item.name}</Typography>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
    //backgroundColor: 'red',
  },
  container: {
    width: (screenWidth - 100) / 3, // Accounting for padding and gap
    //backgroundColor: '#fff',
    borderRadius: 12,
    //backgroundColor: lightTheme.colors.secondaryLight,
    //padding: SPACING.sm,
  },
  fullWidth: {
    width: '100%',
  },
  imageContainer: {
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '75%',
    height: 75,
    borderRadius: 8,
  },
  textContainer: {
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
});
