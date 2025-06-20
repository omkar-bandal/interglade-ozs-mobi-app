import Button from '@components/ui/Button';
import {
  useGetConversationById,
  useGetMessagesByConversationId,
  useSendMessage,
} from '@hooks/api/message.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {supabase} from '@lib/supabase/supabase';
import {useIsFocused} from '@react-navigation/native';
import {goBack} from '@utils/NavigationUtils';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const Conversation = ({conversationId, title, avatar}: any) => {
  const isFocused = useIsFocused();
  const {user} = useTypedSelector(state => state.auth);
  const [messages, setMessages] = useState<any[]>([]);
  const {data: apiMessages, isLoading} = useGetMessagesByConversationId(
    conversationId,
    isFocused,
  );
  const {data: conversationData, isLoading: isConversationDataLoading} =
    useGetConversationById(conversationId);
  const {mutateAsync: sendMessage, isPending} = useSendMessage();
  const scrollViewRef = useRef<ScrollView>(null);

  // Load initial messages from API
  useEffect(() => {
    if (apiMessages) {
      setMessages(apiMessages);
    }
  }, [apiMessages]);

  // Setup real-time channel after initial messages are loaded
  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: any) => {
          const newMessage = payload.new as any;
          setMessages(prev => [...prev, newMessage]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = (): void => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const handleSendMessage = async (text: string) => {
    await sendMessage({
      id: conversationId,
      currentUserId: user?.id,
      newMessage: text,
    });
  };

  console.log('kkk', conversationData);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          variant="ghost"
          leftIcon={<Icon name="arrow-back" size={24} />}
          onPress={goBack}
        />
        {!isConversationDataLoading && (
          <>
            <Image
              source={{
                uri: conversationData?.data.participants[0]?.provider
                  .profile_picture_url,
              }}
              style={styles.avatar}
            />
            <Text style={styles.headerTitle} numberOfLines={1}>
              {`${conversationData?.data.participants[0]?.provider.first_name} ${conversationData?.data.participants[0]?.provider.last_name}`}
            </Text>
          </>
        )}
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messageContent}
        onContentSizeChange={scrollToBottom}>
        <Text style={styles.dateHeader}>Today</Text>
        {messages.map((msg: any) => (
          <MessageBubble
            key={msg.id}
            id={msg.id}
            text={msg.content}
            isSent={msg.sender_id === user?.id}
            timestamp={msg.created_at}
          />
        ))}
      </ScrollView>

      <MessageInput onSendMessage={handleSendMessage} loading={isPending} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginLeft: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messageContent: {
    padding: 16,
  },
  dateHeader: {
    textAlign: 'center',
    color: '#999999',
    marginVertical: 16,
    fontSize: 14,
  },
  centerContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default Conversation;
