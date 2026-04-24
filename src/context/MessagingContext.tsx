"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { UserPublic } from "@/types/user";
import { PropertyHost } from "@/types/property";
import { Message, Thread, MessagingContextType } from "@/types/message";
import { useAuthContext } from "@/context/AuthContext";

import {
  getThreads as apiGetThreads,
  getMessages as apiGetMessages,
  startConversation,
  sendMessage as apiSendMessage,
} from "@/lib/api/messaging";

const MessagingContext = createContext<MessagingContextType | null>(null);

export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuthContext();

  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  /* -------------------------------------------------------
     1) Charger les threads au login
  -------------------------------------------------------- */
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      queueMicrotask(() => {
        setThreads([]);
        setMessages([]);
      });
      return;
    }

    (async () => {
      try {
        const data = await apiGetThreads();
        queueMicrotask(() => setThreads(data));
      } catch (err) {
        console.error("Failed to load threads:", err);
        queueMicrotask(() => setThreads([]));
      }
    })();
  }, [user, authLoading]);


  /* -------------------------------------------------------
     3) Charger les messages d’un thread
  -------------------------------------------------------- */
  const loadMessagesForThread = useCallback(async (threadId: string) => {
    try {
      const data = await apiGetMessages(threadId);

      queueMicrotask(() => {
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.threadId !== threadId);
          return [...filtered, ...data];
        });
      });

    
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  }, []);

  /* -------------------------------------------------------
     4) Compteur basé sur updatedAt > lastSeen
  -------------------------------------------------------- */
  const unreadCount = useMemo(() => {
    return threads.filter((t) => {
      const lastSeen = Number(localStorage.getItem(`lastSeen_${t.id}`) || 0);
      const lastMessageAt = new Date(t.updatedAt).getTime();
      return lastMessageAt > lastSeen;
    }).length;
  }, [threads]);

  /* -------------------------------------------------------
     5) Récupérer les messages d’un thread
  -------------------------------------------------------- */
  const getMessages = useCallback(
    (threadId: string) => messages.filter((m) => m.threadId === threadId),
    [messages]
  );

  /* -------------------------------------------------------
     6) Récupérer l’autre utilisateur
  -------------------------------------------------------- */
  const getThreadUser = useCallback(
    (threadId: string): UserPublic | PropertyHost => {
      const thread = threads.find((t) => t.id === threadId);
      if (!thread) throw new Error("Thread not found");
      return thread.otherUser;
    },
    [threads]
  );

  /* -------------------------------------------------------
     7) Démarrer une conversation
  -------------------------------------------------------- */
  const startConversationWithHost = useCallback(
    async (host: UserPublic | PropertyHost, suggestedMessage?: string) => {
      if (!user) return;

      try {
        const { threadId } = await startConversation(
          String(host.id),
          suggestedMessage ?? ""
        );

        const updatedThreads = await apiGetThreads();
        queueMicrotask(() => setThreads(updatedThreads));

        await loadMessagesForThread(threadId);

        return threadId;
      } catch (err) {
        console.error("Failed to start conversation:", err);
      }
    },
    [user, loadMessagesForThread]
  );

  /* -------------------------------------------------------
     8) Envoyer un message
  -------------------------------------------------------- */
  const sendMessage = useCallback(
    async (threadId: string, content: string) => {
      if (!user) return;

      try {
        await apiSendMessage(threadId, content);

        // Recharger les messages du thread
        await loadMessagesForThread(threadId);

        // Recharger les threads pour mettre à jour updatedAt
        const updatedThreads = await apiGetThreads();
        queueMicrotask(() => setThreads(updatedThreads));
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    },
    [user, loadMessagesForThread]
  );

  /* -------------------------------------------------------
     9) Valeur du contexte
  -------------------------------------------------------- */
  const value = useMemo(
    () => ({
      currentUser: user,
      threads,
      messages,
      unreadCount,
      getMessages,
      sendMessage,
      getThreadUser,
      startConversationWithHost,
      loadMessagesForThread,
    }),
    [
      user,
      threads,
      messages,
      unreadCount,
      getMessages,
      sendMessage,
      getThreadUser,
      startConversationWithHost,
      loadMessagesForThread,
    ]
  );

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
}

export function useMessaging() {
  const ctx = useContext(MessagingContext);
  if (!ctx)
    throw new Error("useMessaging must be used inside MessagingProvider");
  return ctx;
}
