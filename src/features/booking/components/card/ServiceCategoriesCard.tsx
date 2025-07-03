import {FONT_SIZE, SPACING} from '@theme/constants';
import lightTheme from '@theme/light';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const ServiceCategoriesCard = ({items}: any) => {
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
            {/* <View style={styles.textContainer}>
              <Typography variant="caption">{item.name}</Typography>
            </View> */}
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {item.name}
              </Text>
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
  },
  container: {
    width: (screenWidth - 100) / 3, // Accounting for padding and gap
    //backgroundColor: '#fff',
    borderRadius: 12,
    backgroundColor: lightTheme.components.card.backgroundColor,
    padding: SPACING.sm,
  },
  fullWidth: {
    width: '100%',
  },
  imageContainer: {
    marginBottom: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE.xs,
    lineHeight: FONT_SIZE.xs * 1.5,
    color: lightTheme.colors.text,
  },
  image: {
    width: '70%',
    height: 75,
    borderRadius: 8,
  },
  textContainer: {
    padding: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
});
