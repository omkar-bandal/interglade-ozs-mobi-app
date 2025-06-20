import useTheme from '@theme/useTheme';
import {formatTimestamp} from '@utils/date.utils';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Define types for message bubble props
interface MessageBubbleProps {
  id: string;
  text: string;
  isSent: boolean;
  timestamp: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  id,
  text,
  isSent,
  timestamp,
}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    messageBubble: {
      maxWidth: '80%',
      padding: 12,
      borderRadius: 18,
      marginBottom: 10,
    },
    sentBubble: {
      backgroundColor: theme.colors.primary,
      alignSelf: 'flex-end',
      borderBottomRightRadius: 4,
    },
    receivedBubble: {
      backgroundColor: '#ffffff',
      alignSelf: 'flex-start',
      borderBottomLeftRadius: 4,
    },
    messageText: {
      fontSize: 16,
    },
    messageTimestamp: {
      fontSize: 11,
      alignSelf: 'flex-end',
      marginTop: 4,
    },
  });

  return (
    <View
      key={id}
      style={[
        styles.messageBubble,
        isSent ? styles.sentBubble : styles.receivedBubble,
      ]}>
      <Text
        style={[styles.messageText, {color: isSent ? '#ffffff' : '#333333'}]}>
        {text}
      </Text>
      <Text
        style={[
          styles.messageTimestamp,
          {color: isSent ? 'rgba(255, 255, 255, 0.7)' : '#999999'},
        ]}>
        {formatTimestamp(timestamp)}
      </Text>
    </View>
  );
};

export default MessageBubble;
