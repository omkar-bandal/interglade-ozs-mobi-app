/* eslint-disable react-native/no-inline-styles */
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import {useCreateReview} from '@hooks/api/review.rq';
import useTheme from '@theme/useTheme';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Review = ({reservationId}: {reservationId: string}) => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const {mutateAsync: createReview, isPending} = useCreateReview();

  console.log('reservationId', reservationId);

  const handleSubmit = async () => {
    try {
      const result = await createReview({
        reservation_id: reservationId,
        rating: rating.toString(),
        comment,
      });
      console.log('Review created successfully:', result);
    } catch (error) {
      console.log('Error creating review:', error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 32}}>
      <View style={styles.card}>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map(i => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
              <Ionicons
                name={i <= rating ? 'star' : 'star-outline'}
                size={28}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Input
          placeholder="Add a Comment"
          value={comment}
          onChangeText={setComment}
          multiline
          placeholderTextColor={theme.components.input.placeholderColor}
        />

        <Button
          label="Submit"
          onPress={handleSubmit}
          loading={isPending}
          disabled={isPending}
        />
      </View>
    </ScrollView>
  );
};

export default Review;

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    card: {
      backgroundColor: theme.components.card.backgroundColor,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.gray,
    },
    starsRow: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    commentBox: {
      backgroundColor: theme.colors.lightGray,
      borderRadius: 8,
      marginTop: 4,
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    commentInput: {
      flex: 1,
      minHeight: 36,
      fontSize: 14,
      color: '#000',
      paddingVertical: 4,
    },
    commentIcon: {
      marginLeft: 4,
      marginBottom: 4,
    },
  });
