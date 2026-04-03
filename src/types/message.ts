import { UserPublic } from "./user";

export interface Message {
  id: string;
  threadId: string;
  sender: UserPublic;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Thread {
  id: string;
  otherUser: UserPublic;
  lastMessage: string;
  unread: number;
}

export interface MessagingContextType {
  threads: Thread[];
  messages: Message[];
  unreadCount: number;
  getMessages: (threadId: string) => Message[];
  sendMessage: (threadId: string, sender: UserPublic, content: string) => void;
  createThread: (otherUser: UserPublic) => string;
  getThreadUser: (threadId: string) => UserPublic;
}
