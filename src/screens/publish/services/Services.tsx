import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Assuming you have a navigation utility
import Button from '@components/ui/Button';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import {navigate} from '@utils/NavigationUtils';

export const ServicesListScreen = ({
  services,
  onEditService,
  onDeleteService,
}: any) => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  // const renderServiceCard = ({item}: any) => {
  //   return (
  //     <View style={styles.cardContainer}>
  //       {/* Image Carousel with Indicator */}
  //       <View style={styles.imageCarouselContainer}>
  //         <ImageCarousel images={item.photos} imageWidth={100} />
  //       </View>

  //       {/* Sale Details */}
  //       <View style={{flex: 1}}>
  //         <Pressable
  //           onPress={() => navigate('MySaleDetails', {saleId: item.id})}>
  //           <View style={styles.detailsContainer}>
  //             <View style={styles.titleContainer}>
  //               <Text style={styles.titleText} numberOfLines={1}>
  //                 {item.title}
  //               </Text>
  //               <Text style={styles.priceText}>
  //                 ${item.price.toLocaleString()}
  //               </Text>
  //             </View>

  //             <Text style={styles.descriptionText} numberOfLines={2}>
  //               {item.description}
  //             </Text>

  //             <View style={styles.metaContainer}>
  //               <Text style={styles.metaText}>
  //                 {item.condition} • {item.location}
  //               </Text>
  //             </View>

  //             {/* Action Buttons */}
  //             <View style={styles.actionContainer}>
  //               <View style={styles.editButton}>
  //                 <Button
  //                   variant="secondary"
  //                   size="small"
  //                   label="Edit"
  //                   leftIcon={
  //                     <Ionicon name="create-outline" size={16} color="#fff" />
  //                   }
  //                   onPress={() => onEditService(item)}
  //                 />
  //               </View>

  //               <View style={styles.editButton}>
  //                 <Button
  //                   label="Delete"
  //                   variant="destructive"
  //                   size="small"
  //                   leftIcon={
  //                     <Ionicon name="trash-outline" size={16} color="#fff" />
  //                   }
  //                   onPress={() => {
  //                     Alert.alert(
  //                       'Delete Sale',
  //                       'Are you sure you want to delete this listing?',
  //                       [
  //                         {text: 'Cancel', style: 'cancel'},
  //                         {
  //                           text: 'Delete',
  //                           style: 'destructive',
  //                           onPress: () => onDeleteService(item.id),
  //                         },
  //                       ],
  //                     );
  //                   }}
  //                 />
  //               </View>
  //             </View>
  //           </View>
  //         </Pressable>
  //       </View>
  //     </View>
  //   );
  // };

  const renderServiceCard = ({item}: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.card}
        onPress={() => navigate('MyServiceDetails', {serviceId: item.id})}>
        <View>
          {/* Service Image */}
          <Image
            source={{uri: item.photos[0]}}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Card Content */}
          <View style={styles.content}>
            {/* Rating */}
            <View style={styles.ratingContainer}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Icon key={star} name="star" size={14} color="#FFC107" />
                ))}
              </View>
              <Text style={styles.reviewCount}>(150 Reviews)</Text>
            </View>

            {/* Service Title */}
            <Text style={styles.title}>{item.title}</Text>

            {/* Price */}
            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>${item.price}</Text>
            </View>

            {/* Service Provider */}
            <View style={styles.providerContainer}>
              <Button
                variant="secondary"
                size="small"
                label="Edit"
                style={styles.editButton}
                leftIcon={
                  <Icon name="create-outline" size={16} color="#393872" />
                }
                onPress={() => onEditService(item)}
              />
              <Button
                label="Delete"
                variant="secondary"
                size="small"
                style={styles.deleteButton}
                leftIcon={
                  <Icon name="trash-outline" size={16} color="#393872" />
                }
                onPress={() => {
                  Alert.alert(
                    'Delete Sale',
                    'Are you sure you want to delete this listing?',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => onDeleteService(item.id),
                      },
                    ],
                  );
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        renderItem={renderServiceCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.centerContent}>
            <Text>
              “No listings yet. Tap the + to publish your first item!”
            </Text>
          </View>
        }
      />
    </View>
  );
};

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: 'red',
      paddingHorizontal: 12,
      paddingTop: 20,
    },
    listContainer: {
      paddingVertical: 15,
      // backgroundColor: 'red',
    },
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 15,
      marginBottom: 15,
      marginHorizontal: 10,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      paddingHorizontal: 16,
    },
    imageCarouselContainer: {
      position: 'relative',
      width: '40%',
    },
    detailsContainer: {
      flex: 1,
      paddingVertical: 25,
      paddingHorizontal: 10,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      marginRight: 10,
    },
    priceText: {
      fontSize: 18,
      color: '#28a745',
      fontWeight: 'bold',
    },
    descriptionText: {
      color: '#6c757d',
      marginBottom: 10,
    },
    metaContainer: {
      marginBottom: 15,
    },
    metaText: {
      color: '#6c757d',
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 5,
    },
    editButton: {
      flex: 1,
      width: '48%',
    },
    deleteButton: {
      flex: 1,
      width: '48%',
    },
    centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    card: {
      backgroundColor: theme.components.card.backgroundColor,
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginHorizontal: 16,
      marginBottom: SPACING.md,
    },
    image: {
      width: '100%',
      height: 140,
    },
    content: {
      padding: 12,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    starsRow: {
      flexDirection: 'row',
    },
    reviewCount: {
      fontSize: 12,
      color: '#666',
      marginLeft: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      color: theme.colors.textSecondary,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    currentPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 8,
      color: theme.colors.textSecondary,
    },
    originalPrice: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textDecorationLine: 'line-through',
    },
    providerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
    },
    providerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    providerImage: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#eee',
      marginRight: 8,
    },
    providerDetails: {
      justifyContent: 'center',
    },
    providerName: {
      fontSize: 14,
      fontWeight: '500',
    },
    providerRole: {
      fontSize: 12,
      color: '#777',
    },
    addButton: {
      backgroundColor: '#2196F3',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    },
    addButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
    },
  });
