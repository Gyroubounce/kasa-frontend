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
  unread: number;
}

export interface MessagingContextType {
  currentUser: AuthUser | null;


  threads: Thread[];
  messages: Message[];
  unreadCount: number;

  getMessages: (threadId: string) => Message[];

  // ✔ NOUVELLE SIGNATURE
  sendMessage: (threadId: string, content: string) => void;

  createThread: (otherUser: UserPublic | PropertyHost) => string;

  getThreadUser: (threadId: string) => UserPublic | PropertyHost;

  startConversationWithHost: (
    host: UserPublic | PropertyHost,
    suggestedMessage?: string
  ) => string | undefined;

  markThreadAsRead: (threadId: string) => void;
}
