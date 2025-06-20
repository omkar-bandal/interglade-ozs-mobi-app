export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Conversation {
  id: string;
  name: string;
  last_message?: string;
  updated_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  user_id: string;
  content: string;
  created_at: string;
}
