import Button from '@components/ui/Button';
import {useGetConversationsByUserId} from '@hooks/api/message.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {supabase} from '@lib/supabase/supabase';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ConversationListItem from './ConversationItem';

export default function ConversationList() {
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');

  const {user} = useTypedSelector(state => state.auth);
  const {data, isLoading, error, refetch} = useGetConversationsByUserId(
    user?.id || '',
    isFocused,
  );

  useEffect(() => {
    console.log(
      '🔄 [useConversationSubscription] Setting up conversations subscription',
    );

    const channel = supabase
      .channel('conversations_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        (payload: any) => {
          console.log(
            '📨 [useConversationSubscription] Received real-time update:',
            payload,
          );
          refetch();
        },
      )
      .subscribe(status => {
        console.log(
          '🔌 [useConversationSubscription] Subscription status:',
          status,
        );
      });

    return () => {
      console.log('🧹 [useConversationSubscription] Cleaning up subscription');
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const conversations = useMemo(() => data || [], [data]);

  // const filteredConversations = conversations.filter(
  //   (conversation: any) =>
  //     conversation.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     conversation.lastMessage
  //       ?.toLowerCase()
  //       .includes(searchQuery.toLowerCase()),
  // );

  console.log('lllddd', data, error);
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error loading conversations</Text>
        <Button label="Retry" variant="secondary" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Conversations</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        // data={filteredConversations}
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={({item}: any) => (
          <ConversationListItem conversation={item} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No conversations found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },

  centerContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},

  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
});
