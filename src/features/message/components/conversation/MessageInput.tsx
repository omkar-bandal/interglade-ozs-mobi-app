import Button from '@components/ui/Button';
import useTheme from '@theme/useTheme';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

// Define types for message input props
interface MessageInputProps {
  onSendMessage: (text: string) => void;
  loading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  loading = false,
}) => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  const [message, setMessage] = useState<string>('');

  const handleSend = (): void => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor={theme.colors.textSecondary}
          value={message}
          onChangeText={(text: string) => setMessage(text)}
          multiline
        />
        <Button
          label="Send"
          style={[!message.trim() && styles.disabledSendButton]}
          onPress={handleSend}
          disabled={!message.trim() || loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const themeStyles = (theme: any) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: theme.components.input.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      color: theme.colors.textSecondary,
      backgroundColor: theme.components.input.background,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      maxHeight: 100,
      fontSize: 16,
    },
    sendButton: {
      marginLeft: 10,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabledSendButton: {
      backgroundColor: '#cccccc',
    },
    sendButtonText: {
      color: theme.colors.text,
      fontWeight: '600',
      fontSize: 14,
    },
  });

export default MessageInput;
