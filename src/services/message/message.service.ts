import {supabase} from '@lib/supabase/supabase';

export class MessageService {
  static async getConversations(): Promise<any> {
    const {data, error} = await supabase
      .from('conversations')
      .select(
        `
                id,
                created_at,
                messages (
                    id,
                    content,
                    created_at,
                    sender_id,
                    read
                ),
                participants:conversation_participants (
                    profiles (
                        id,
                        first_name,
                        last_name,
                        profile_picture_url
                    )
                )
            `,
      )
      .order('created_at', {ascending: false});

    if (error) {
      throw error;
    }
    return data;
  }

  static async getConversationsByUserId(userId: string): Promise<any> {
    const {data, error} = await supabase
      .from('conversations')
      .select(
        `
        id,
        created_at,
        messages (
          id,
          content,
          created_at,
          sender_id,
          read
        ),
        participants:conversation_participants!inner (
        conversation_id,
        profiles:profiles!conversation_participants_profiles_id_fkey (
          id,
          first_name,
          last_name,
          profile_picture_url,
          email
        ),
        provider:profiles!conversation_participants_participant_id_fkey (
          id,
          first_name,
          last_name,
          profile_picture_url,
          email
        )
        )
      `,
      )
      .eq('participants.profiles_id', userId)
      .order('created_at', {ascending: false});

    if (error) {
      throw error;
    }
    return data;
  }

  static async getConversationByProviderId(providerId: string): Promise<any> {
    return supabase
      .from('conversation_participants')
      .select('*')
      .eq('participant_id', providerId);
  }

  static getConversationById(conversationId: string): any {
    return supabase
      .from('conversations')
      .select(
        `
      id,
      created_at,
      participants:conversation_participants!inner (
        provider:profiles!conversation_participants_participant_id_fkey (
          id,
          first_name,
          last_name,
          profile_picture_url,
          email
        )
        )
      `,
      )
      .eq('id', conversationId)
      .maybeSingle();
  }

  static async getMessages(conversationId: string): Promise<any> {
    const {data, error} = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', {ascending: true});

    if (error) {
      throw error;
    }
    return data;
  }

  static async sendMessage(
    id: string,
    currentUserId: string,
    newMessage: string,
  ): Promise<any> {
    return supabase.from('messages').insert({
      conversation_id: id,
      sender_id: currentUserId,
      content: newMessage.trim(),
    });
  }

  static async markMessagesAsRead(
    conversationId: string,
    userId: string,
  ): Promise<void> {
    const {error} = await supabase
      .from('messages')
      .update({read: true})
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .eq('read', false);

    if (error) {
      throw error;
    }
  }

  static async getUnreadMessageCount(userId: string): Promise<number> {
    const {count, error} = await supabase
      .from('messages')
      .select('*', {count: 'exact', head: true})
      .neq('sender_id', userId)
      .eq('read', false);

    if (error) {
      throw error;
    }
    return count || 0;
  }

  static async createConversation(
    profiles_id: string,
    participant_id: string,
  ): Promise<string> {
    // Start a transaction to create conversation and add participants
    const {data: conversation, error: convError} = await supabase
      .from('conversations')
      .insert({})
      .select()
      .single();

    if (convError) {
      throw convError;
    }

    // const participants = participantIds.map(id => ({
    //   conversation_id: conversation.id,
    //   profiles_id: id,
    // }));

    const {error: partError} = await supabase
      .from('conversation_participants')
      .insert({conversation_id: conversation.id, profiles_id, participant_id});

    if (partError) {
      throw partError;
    }

    return conversation.id;
  }

  // Subscribe to new messages in a conversation
  static subscribeToMessages(
    conversationId: string,
    callback: (message: any) => void,
  ) {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        payload => callback(payload.new),
      )
      .subscribe();
  }
}
