/* eslint-disable @typescript-eslint/no-shadow */
import ScreenHeader from '@components/header/ScreenHeader';
import {ImageCarousel} from '@components/ImageCarousel';
import Button from '@components/ui/Button';
import {useGetSaleByID} from '@hooks/api/sales.rq';
import {SPACING} from '@theme/constants';
import {navigate} from '@utils/NavigationUtils';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SaleDetailsScreen = ({route}: any) => {
  // Assuming sale data is passed via route params
  const {saleId} = route.params;
  const {data, isLoading} = useGetSaleByID(saleId);

  const handleEditSale = (item: any) => {
    navigate('AddSale', {saleId: item.id});
  };

  const handleDeleteSale = async (saleId: any) => {
    // const result = deleteMySale({saleId});
    // if (result?.status === 204) {
    //   deleteMySale(saleId);
    // }
    Alert.alert('Delete data', saleId);
  };

  // const handleShareListing = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: `Check out this ${data?.data.title} for sale at $${data?.data.price}!`,
  //       title: 'Share Listing',
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     console.error('Error sharing:', error);
  //   }
  // };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const salesData = data?.data || {};
  return (
    <View style={styles.container}>
      <ScreenHeader title="Sales Details" />

      <ScrollView>
        <ImageCarousel
          images={salesData?.photos || []}
          autoPlay={true}
          autoPlayInterval={5000}
        />

        {/* <View style={styles.serviceTitleContainer}>
          <View style={styles.serviceTitle}>
            <Typography variant="h3" weight="bold" numberOfLines={2}>
              {salesData?.title || 'NA'}
            </Typography>
          </View>

          <View style={styles.sectionContainer}>
            <Typography variant="h5">
              {salesData?.category || 'Category: Services > Hairdresser'}
            </Typography>
          </View>

          <View style={styles.sectionContainer}>
            <Typography variant="h4">
              {salesData?.location || 'Pune Maharastra'}
            </Typography>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Desciption</Text>
            <Typography variant="body2" style={styles.descriptionText}>
              {salesData?.description || 'NA'}
            </Typography>
          </View>

          <View style={styles.sectionContainer}>
            <Typography variant="body2">{salesData?.price || 'NA'}</Typography>
          </View>

          <View style={styles.sectionContainer}>
            <Icon style={styles.icon} name="time" size={24} color="#393972" />
            <Typography variant="body2">{salesData?.time || 'NA'}</Typography>
          </View> */}

        <View style={styles.subCon}>
          <Text style={styles.headingText}>Home HairDresser</Text>
          <Text style={styles.subtitle}>
            {salesData?.title || 'Category : Services - HairDresser'}
          </Text>
        </View>

        <View style={styles.rowCon}>
          <View style={styles.iconCon}>
            <Icon name="star" size={24} color="#393872" />
          </View>
          <Text style={styles.locationText}>
            {salesData?.location || 'Pune Maharastra'}
          </Text>
        </View>

        <View style={styles.subCon}>
          <Text style={styles.headingText}>Description</Text>
          <Text style={styles.descriptionText}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia at
            cupiditate consectetur doloribus iste numquam deserunt, inventore
            quibusdam labore adipisci assumenda reiciendis nam vero molestiae
            atque modi porro similique maiores?
          </Text>
        </View>

        <View style={styles.rowCon}>
          <View style={styles.iconCon}>
            <Icon name="star" size={24} color="#393872" />
          </View>
          <Text style={styles.locationText}>
            {salesData?.price || '₹500/hour'}
          </Text>
        </View>

        <View style={styles.rowCon}>
          <View style={styles.iconCon}>
            <Icon name="star" size={24} color="#393872" />
          </View>
          <Text style={styles.locationText}>All Day</Text>
        </View>

        <View style={styles.subCon}>
          <Text style={styles.headingText}>Statistics</Text>
        </View>

        <View style={styles.rowCon}>
          <View style={styles.iconCon}>
            <Icon name="star" size={24} color="#393872" />
          </View>
          <Text style={styles.locationText}>128 Views</Text>
        </View>

        <View style={styles.rowCon}>
          <View style={styles.iconCon}>
            <Icon name="star" size={24} color="#393872" />
          </View>
          <Text style={styles.locationText}> 3 bookings</Text>
        </View>

        <View style={styles.rowCon}>
          <View style={styles.iconCon}>
            <Icon name="star" size={24} color="#393872" />
          </View>
          <Text style={styles.locationText}>4.5(6 review)</Text>
        </View>

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
              onPress={() => handleEditSale(saleId)}
            />
            <Button
              label="Delete"
              variant="secondary"
              size="small"
              style={styles.deleteButton}
              leftIcon={<Icon name="trash-outline" size={16} color="#393872" />}
              onPress={() => {
                Alert.alert(
                  'Delete Sale',
                  'Are you sure you want to delete this listing?',
                  [
                    {text: 'Cancel', style: 'cancel'},
                    {
                      text: 'Delete',
                      style: 'destructive',
                      onPress: () => handleDeleteSale(saleId),
                    },
                  ],
                );
              }}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Button
            variant="outline"
            size="medium"
            label="Mark as disable"
            style={styles.confirmButton}
            leftIcon={<Icon name="create-outline" size={16} color="#393972" />}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SaleDetailsScreen;

const styles = StyleSheet.create({
  subCon: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  headingText: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 4,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'grey',
  },
  rowCon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  iconCon: {
    height: 40,
    width: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceHeader: {
    marginBottom: 16,
  },
  serviceImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  serviceTitleContainer: {
    padding: SPACING.md,
  },
  serviceTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionContainer: {
    padding: SPACING.md,
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  icon: {
    height: 40,
    width: 40,
    backgroundColor: '#E0F0F0',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  providerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  providerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },

  contactButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonIcon: {
    marginBottom: 4,
  },
  contactButtonLabel: {
    fontSize: 12,
    color: '#666666',
  },
  confirmButton: {
    //backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  editButton: {
    flex: 1,
    width: '48%',
  },
  deleteButton: {
    flex: 1,
    width: '48%',
  },
});
