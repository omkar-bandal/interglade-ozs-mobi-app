import {ErrorModel} from '@models/api.model';
import {MessageService} from '@services/message/message.service';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export function useGetAllConversations(): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getAllConversations'],
    queryFn: () => MessageService.getConversations(),
  });
}

export function useGetConversationByProviderId(
  providerId: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getConversationByProviderId', providerId],
    queryFn: () => MessageService.getConversationByProviderId(providerId),
    enabled: !!providerId,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function useGetConversationById(
  id: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getConversationById', id],
    queryFn: () => MessageService.getConversationById(id),
    enabled: !!id,
    staleTime: 0,
    gcTime: 0,
  });
}

export function useGetConversationsByUserId(
  userId: string,
  isFocused: boolean,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getConversationsByUserId', userId],
    queryFn: () => MessageService.getConversationsByUserId(userId),
    enabled: !!userId,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    subscribed: isFocused,
  });
}

export function useGetMessagesByConversationId(
  conversationId: string,
  isFocused: boolean,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getMessages', conversationId],
    queryFn: () => MessageService.getMessages(conversationId),
    enabled: !!conversationId,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    subscribed: isFocused,
  });
}

export function useGetUnreadMessagesCount(
  userId: string,
): UseQueryResult<any, ErrorModel> {
  return useQuery<any, ErrorModel>({
    queryKey: ['getUnreadMessageCount', userId],
    queryFn: () => MessageService.getUnreadMessageCount(userId),
    enabled: !!userId,
  });
}

export function useSendMessage(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['sendMessage'],
    mutationFn: ({id, currentUserId, newMessage}) =>
      MessageService.sendMessage(id, currentUserId, newMessage),
  });
}

export function useCreateConversation(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['createConverstaion'],
    mutationFn: ({profiles_id, participant_id}) =>
      MessageService.createConversation(profiles_id, participant_id),
  });
}

export function useMarkMessagesAsRead(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['markMessagesAsRead'],
    mutationFn: ({
      conversationId,
      userId,
    }: {
      conversationId: string;
      userId: string;
    }) => MessageService.markMessagesAsRead(conversationId, userId),
  });
}
