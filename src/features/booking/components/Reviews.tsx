import Button from '@components/ui/Button';
import Typography from '@components/ui/Typography';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Reviews = () => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Ionicons
            key={i}
            name="star"
            size={16}
            color="#FFC163"
            style={styles.starIcon}
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Ionicons
            key={i}
            name="star-half"
            size={16}
            color="#FFC163"
            style={styles.starIcon}
          />,
        );
      } else {
        stars.push(
          <Ionicons
            key={i}
            name="star-outline"
            size={16}
            color="#DDDDDD"
            style={styles.starIcon}
          />,
        );
      }
    }

    return <View style={styles.starsContainer}>{stars}</View>;
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Typography variant="h5" weight="bold">
          Reviews
        </Typography>

        <Button label="See All" size="small" variant="ghost" />
      </View>

      {/* Review Item */}
      <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewerName}>Terry Wilson</Text>
          <Text style={styles.reviewDate}>Dec 12</Text>
        </View>
        {renderStars(5)}
        <Text style={styles.reviewText}>
          It is strongly established law that it needs to be fixed by the
          residents owners of a large development if it gets broken.
        </Text>
      </View>

      {/* Repeated Review Item */}
      <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewerName}>Vincent Fox</Text>
          <Text style={styles.reviewDate}>Dec 8</Text>
        </View>
        {renderStars(4.5)}
        <Text style={styles.reviewText}>
          It is strongly established law that it needs to be fixed by the
          residents owners of a large development if it gets broken.
        </Text>
      </View>
    </View>
  );
};

export default Reviews;

const themeStyles = (theme: any) =>
  StyleSheet.create({
    sectionContainer: {
      padding: SPACING.md,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 12,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      //paddingHorizontal: 15,
      marginBottom: 10,
    },
    reviewItem: {
      marginBottom: 10,
      paddingBottom: 16,
      padding: SPACING.md,
      borderRadius: 10,
      //borderBottomWidth: 1,
      //borderBottomColor: '#EEEEEE',
      backgroundColor: theme.components.card.backgroundColor,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    reviewerName: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text,
    },
    reviewDate: {
      fontSize: 12,
      color: '#999999',
    },
    starsContainer: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    starIcon: {
      marginRight: 2,
    },
    reviewText: {
      fontSize: 14,
      color: '#666666',
      lineHeight: 20,
    },
  });
