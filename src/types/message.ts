// FRONTEND — kasa-frontend/src/types/message.ts

import { UserPublic } from "./user";
import { PropertyHost } from "./property";
import { AuthUser } from "./auth";

export interface Message {
  id: string;
  threadId: string;
  sender: UserPublic | PropertyHost;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Thread {
  id: string;
  otherUser: UserPublic | PropertyHost;
  lastMessage: string;
  updatedAt: string; // ⭐ indispensable pour la logique "nouveau message"
}


export interface MessagingContextType {
  currentUser: AuthUser | null;
  threads: Thread[];
  messages: Message[];
  unreadCount: number;

  getMessages: (threadId: string) => Message[];
  sendMessage: (threadId: string, content: string) => Promise<void>;
  getThreadUser: (threadId: string) => UserPublic | PropertyHost;

  startConversationWithHost: (
    host: UserPublic | PropertyHost,
    suggestedMessage?: string
  ) => Promise<string | undefined>;

loadMessagesForThread: (threadId: string) => Promise<void>;

}
