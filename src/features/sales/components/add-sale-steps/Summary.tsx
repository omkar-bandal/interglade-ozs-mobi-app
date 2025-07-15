import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SummaryProps {
  formData: {
    title?: string;
    category?: string;
    description?: string;
    price?: string;
    condition?: string;
    location?: string;
    photos?: string[];
  };
}

export const Summary: React.FC<SummaryProps> = ({formData}) => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  // Condition mapping
  const conditionMap = {
    new: {label: 'Neuf', color: '#4CAF50'},
    'very-good': {label: 'Très bon état', color: '#2196F3'},
    good: {label: 'Bon état', color: '#FFC107'},
    average: {label: 'État moyen', color: '#FF9800'},
    'for-parts': {label: 'Pour pièces', color: '#F44336'},
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Title Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="pricetag-outline" size={24} color="#4A90E2" />
          <Text style={styles.cardHeaderText}>Product Details</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.titleText}>{formData.title || 'N/A'}</Text>
          <Text style={styles.subtitleText}>
            {formData.category || 'No category selected'}
          </Text>
        </View>
      </View>

      {/* Description Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="document-text-outline" size={24} color="#4A90E2" />
          <Text style={styles.cardHeaderText}>Description</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.descriptionText}>
            {formData.description || 'No description provided'}
          </Text>
        </View>
      </View>

      {/* Price and Condition Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="cash-outline" size={24} color="#4A90E2" />
          <Text style={styles.cardHeaderText}>Pricing & Condition</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.priceConditionRow}>
            <Text style={styles.labelText}>Price:</Text>
            <Text style={styles.valueText}>
              {formData.price ? `€${formData.price}` : 'N/A'}
            </Text>
          </View>
          <View style={styles.priceConditionRow}>
            <Text style={styles.labelText}>Condition:</Text>
            <Text
              style={[
                styles.conditionText,
                {
                  color:
                    conditionMap[
                      formData.condition as keyof typeof conditionMap
                    ]?.color || '#666',
                },
              ]}>
              {conditionMap[formData.condition as keyof typeof conditionMap]
                ?.label || 'N/A'}
            </Text>
          </View>
        </View>
      </View>

      {/* Location Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="location-outline" size={24} color="#4A90E2" />
          <Text style={styles.cardHeaderText}>Location</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.locationText}>
            {formData.location || 'No location specified'}
          </Text>
        </View>
      </View>

      {/* Image Gallery Card */}
      {formData.photos && formData.photos.length > 0 && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="camera-outline" size={24} color="#4A90E2" />
            <Text style={styles.cardHeaderText}>Gallery Images</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageGallery}>
            {formData.photos.map((photoUri: any, index) => (
              <Image
                key={index}
                source={{uri: photoUri.uri}}
                style={styles.galleryImage}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      borderRadius: 12,
      marginBottom: SPACING.sm,
      backgroundColor: theme.colors.card,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    cardHeaderText: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    cardContent: {
      padding: 15,
    },
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.textSecondary,
      marginBottom: 5,
    },
    subtitleText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    descriptionText: {
      fontSize: 15,
      color: theme.colors.textSecondary,
      lineHeight: 22,
    },
    priceConditionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    labelText: {
      fontSize: 15,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    valueText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      fontWeight: '600',
    },
    conditionText: {
      fontSize: 15,
      fontWeight: '600',
    },
    locationText: {
      fontSize: 15,
      color: theme.colors.textSecondary,
    },
    imageGallery: {
      paddingHorizontal: 15,
      paddingBottom: 15,
    },
    galleryImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginRight: 10,
    },
  });
