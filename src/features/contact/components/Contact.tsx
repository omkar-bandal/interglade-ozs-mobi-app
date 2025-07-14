import Button from '@components/ui/Button';
import {
  useCreateConversation,
  useGetConversationByProviderId,
} from '@hooks/api/message.rq';
import {useTypedSelector} from '@hooks/useTypedSelector';
import {useQueryClient} from '@tanstack/react-query';
import {navigate} from '@utils/NavigationUtils';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface ContactProps {
  onContactClick: () => void;
  selectedProviderId: string;
}

export const Contact = ({onContactClick, selectedProviderId}: ContactProps) => {
  const queryClient = useQueryClient();

  const {user} = useTypedSelector(state => state.auth);
  const [isContactClicked, setIsContactClicked] = useState(false);

  const {data: conversationData, isLoading: isConversationLoading} =
    useGetConversationByProviderId(selectedProviderId);
  const {mutateAsync: createConversation, isPending} = useCreateConversation();

  const handleCreateConversation = async () => {
    const result = await createConversation({
      profiles_id: user?.id,
      participant_id: selectedProviderId,
    });
    await queryClient.invalidateQueries({
      queryKey: ['getConversationByProviderId', selectedProviderId],
    });

    navigate('ConversationScreen', {
      conversationId: result,
    });
  };

  useEffect(() => {
    if (
      !isConversationLoading &&
      conversationData?.data.length === 0 &&
      selectedProviderId &&
      isContactClicked
    ) {
      console.log('Creating new conversation...');
      handleCreateConversation();
      setIsContactClicked(false);
    } else if (!isConversationLoading && conversationData?.data.length > 0) {
      console.log('naviagte conversation...');
      navigate('ConversationScreen', {
        conversationId: conversationData?.data[0].conversation_id,
      });
      setIsContactClicked(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isContactClicked,
    isConversationLoading,
    conversationData,
    selectedProviderId,
  ]);

  const handleContactClick = async () => {
    if (selectedProviderId === user?.id || isContactClicked) {
      return;
    }

    setIsContactClicked(true);
    onContactClick();
  };

  if (!user) {
    return null;
  }

  return (
    <Button
      size="small"
      leftIcon={<Icon name="chatbubble-outline" size={20} color="#4D948E" />}
      variant="ghost"
      disabled={isConversationLoading || isPending}
      loading={isConversationLoading || isPending}
      onPress={handleContactClick}
    />
  );
};
