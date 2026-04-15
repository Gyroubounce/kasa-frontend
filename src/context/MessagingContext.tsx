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

const MessagingContext = createContext<MessagingContextType | null>(null);

export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuthContext();

  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  /* -------------------------------------------------------
     1) Charger les données utilisateur
  -------------------------------------------------------- */
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      queueMicrotask(() => setThreads([]));
      queueMicrotask(() => setMessages([]));
      return;
    }

    const keyThreads = `threads_${user.id}`;
    const keyMessages = `messages_${user.id}`;

    const savedThreads = localStorage.getItem(keyThreads);
    const savedMessages = localStorage.getItem(keyMessages);

    if (!savedThreads || !savedMessages) {
      queueMicrotask(() => setThreads([]));
      queueMicrotask(() => setMessages([]));
      return;
    }

    queueMicrotask(() => setThreads(JSON.parse(savedThreads)));
    queueMicrotask(() => setMessages(JSON.parse(savedMessages)));
  }, [user, authLoading]);

  /* -------------------------------------------------------
     2) Sauvegarde automatique
  -------------------------------------------------------- */
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`threads_${user.id}`, JSON.stringify(threads));
  }, [threads, user]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`messages_${user.id}`, JSON.stringify(messages));
  }, [messages, user]);

  /* -------------------------------------------------------
     3) Compteur messages non lus global
  -------------------------------------------------------- */
  const unreadCount = useMemo(
    () => messages.filter((m) => !m.read).length,
    [messages]
  );

  /* -------------------------------------------------------
     4) Créer un thread
  -------------------------------------------------------- */
  const createThread = useCallback(
    (otherUser: UserPublic | PropertyHost) => {
      const id = crypto.randomUUID();

      const newThread: Thread = {
        id,
        otherUser,
        lastMessage: "",
        unread: 0,
      };

      setThreads((prev) => [...prev, newThread]);
      return id;
    },
    []
  );

  /* -------------------------------------------------------
     5) Construire un sender valide
  -------------------------------------------------------- */
  const buildSender = useCallback((): UserPublic => {
    return {
      id: String(user!.id),
      name: user!.name,
      role: user!.role,
      picture: user!.picture ?? undefined,
    };
  }, [user]);

  /* -------------------------------------------------------
     6) Démarrer une conversation
  -------------------------------------------------------- */
  const startConversationWithHost = useCallback(
    (host: UserPublic | PropertyHost, suggestedMessage?: string) => {
      if (!user) return;

      const existing = threads.find((t) => t.otherUser.id === host.id);
      const sender = buildSender();

      if (existing) {
        if (suggestedMessage) {
          const newMessage: Message = {
            id: crypto.randomUUID(),
            threadId: existing.id,
            sender,
            content: suggestedMessage,
            createdAt: new Date().toISOString(),
            read: false,
          };

          setMessages((prev) => [...prev, newMessage]);

          setThreads((prev) =>
            prev.map((t) =>
              t.id === existing.id
                ? { ...t, lastMessage: suggestedMessage, unread: t.unread + 1 }
                : t
            )
          );
        }

        return existing.id;
      }

      const threadId = createThread(host);

      if (suggestedMessage) {
        const newMessage: Message = {
          id: crypto.randomUUID(),
          threadId,
          sender,
          content: suggestedMessage,
          createdAt: new Date().toISOString(),
          read: false,
        };

        setMessages((prev) => [...prev, newMessage]);

        setThreads((prev) =>
          prev.map((t) =>
            t.id === threadId
              ? { ...t, lastMessage: suggestedMessage, unread: t.unread + 1 }
              : t
          )
        );
      }

      return threadId;
    },
    [threads, createThread, user, buildSender]
  );

  /* -------------------------------------------------------
     7) Récupérer les messages d’un thread
  -------------------------------------------------------- */
  const getMessages = useCallback(
    (threadId: string) => messages.filter((m) => m.threadId === threadId),
    [messages]
  );

  /* -------------------------------------------------------
     8) Récupérer l’autre utilisateur
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
     9) Envoyer un message
  -------------------------------------------------------- */
  const sendMessage = useCallback(
    (threadId: string, content: string) => {
      if (!user) return;

      const sender = buildSender();

      const newMessage: Message = {
        id: crypto.randomUUID(),
        threadId,
        sender,
        content,
        createdAt: new Date().toISOString(),
        read: false,
      };

      setMessages((prev) => [...prev, newMessage]);

      setThreads((prev) =>
        prev.map((t) =>
          t.id === threadId
            ? { ...t, lastMessage: content, unread: t.unread + 1 }
            : t
        )
      );
    },
    [user, buildSender]
  );

  /* -------------------------------------------------------
     🔥 10) Marquer un thread comme lu
  -------------------------------------------------------- */
  const markThreadAsRead = useCallback((threadId: string) => {
    // 1) Marquer les messages comme lus
    setMessages((prev) =>
      prev.map((m) =>
        m.threadId === threadId ? { ...m, read: true } : m
      )
    );

    // 2) Remettre unread à 0 dans le thread
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, unread: 0 } : t
      )
    );
  }, []);

  /* -------------------------------------------------------
     11) Valeur du contexte
  -------------------------------------------------------- */
  const value = useMemo(
    () => ({
      threads,
      messages,
      unreadCount,
      getMessages,
      sendMessage,
      createThread,
      getThreadUser,
      startConversationWithHost,
      markThreadAsRead, // ⭐ ajouté ici
    }),
    [
      threads,
      messages,
      unreadCount,
      getMessages,
      sendMessage,
      createThread,
      getThreadUser,
      startConversationWithHost,
      markThreadAsRead,
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
