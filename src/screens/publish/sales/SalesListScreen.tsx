import Button from '@components/ui/Button';
import {SPACING} from '@theme/constants';
import {navigate} from '@utils/NavigationUtils';
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

// Assuming you have a navigation utility
import Icon from 'react-native-vector-icons/Ionicons';

export const SalesListScreen = ({sales, onEditSale, onDeleteSale}: any) => {
  // const renderSaleCard = ({item}: any) => {
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
  //                   onPress={() => onEditSale(item)}
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
  //                           onPress: () => onDeleteSale(item.id),
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

  const renderSaleCard = ({item}: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.card}
        onPress={() => navigate('MySaleDetails', {saleId: item.id})}>
        <View style={styles.cardContainer}>
          {/* sale Image - Left Side */}
          <Image
            source={{uri: item.photos[0]}}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Card Content - Right Side */}
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

            {/* sale Title */}
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            {/* Price */}
            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>${item.price}</Text>
            </View>

            {/* sale Provider */}
            <View style={styles.providerContainer}>
              <View style={styles.providerDetails}>
                <Button
                  variant="secondary"
                  size="small"
                  label="Edit"
                  style={styles.editButton}
                  leftIcon={
                    <Icon name="create-outline" size={16} color="#393972" />
                  }
                  onPress={() => onEditSale(item)}
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
                          onPress: () => onDeleteSale(item.id),
                        },
                      ],
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sales}
        renderItem={renderSaleCard}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingVertical: 10,
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
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 16,
    marginBottom: SPACING.md,
  },
  cardContainer: {
    flexDirection: 'row',
    height: 140,
  },
  image: {
    width: 140,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
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
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  providerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  providerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  providerName: {
    fontSize: 12,
    fontWeight: '500',
  },
  providerRole: {
    fontSize: 10,
    color: '#777',
  },
});
