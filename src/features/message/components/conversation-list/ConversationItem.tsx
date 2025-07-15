import useTheme from '@theme/useTheme';
import {formatTimestamp} from '@utils/date.utils';
import {navigate} from '@utils/NavigationUtils';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function ConversationListItem({conversation}: any) {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  const {participants} = conversation;
  return (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() =>
        navigate('ConversationScreen', {
          conversationId: conversation.id,
        })
      }>
      {participants[0]?.provider?.profile_picture_url ? (
        <Image
          source={{uri: participants[0]?.provider?.profile_picture_url}}
          style={styles.avatar}
        />
      ) : (
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: theme.colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Text style={{color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>
            {`${participants[0]?.provider?.first_name?.charAt(0) || ''}${
              participants[0]?.provider?.last_name?.charAt(0) || ''
            }`}
          </Text>
        </View>
      )}
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationTitle} numberOfLines={1}>
            {`${participants[0]?.provider?.first_name} ${participants[0]?.provider?.last_name}`}
          </Text>
          <Text style={styles.timestamp}>
            {formatTimestamp(conversation.created_at)}
          </Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {conversation.messages[0]?.content}
          </Text>
          {conversation.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{conversation.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const themeStyles = (theme: any) =>
  StyleSheet.create({
    conversationItem: {
      flexDirection: 'row',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      alignItems: 'center',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    conversationContent: {
      flex: 1,
    },
    conversationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    conversationTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      flex: 1,
    },
    timestamp: {
      fontSize: 12,
      color: '#999999',
      marginLeft: 8,
    },
    conversationFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    lastMessage: {
      fontSize: 14,
      color: theme.colors.textTertiary,
      flex: 1,
    },
    unreadBadge: {
      backgroundColor: '#2196F3',
      width: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    unreadText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });
