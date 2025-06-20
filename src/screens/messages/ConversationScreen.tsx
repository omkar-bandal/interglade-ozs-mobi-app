import Conversation from '@features/message/components/conversation/Conversation';

export default function ConversationScreen({route}: any) {
  const {conversationId = null, title = '', avatar = ''} = route?.params || {};
  return (
    <Conversation
      conversationId={conversationId}
      title={title}
      avatar={avatar}
    />
  );
}
