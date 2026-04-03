"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { UserPublic } from "@/types/user";
import { mockThreads, mockMessages } from "@/mocks/mockMessaging";
import { Message, Thread, MessagingContextType } from "@/types/message";

const MessagingContext = createContext<MessagingContextType | null>(null);

// -----------------------------
// PROVIDER
// -----------------------------
export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // -----------------------------
  // 1) Hydratation client
  // -----------------------------
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
 useEffect(() => {
  const savedThreads = localStorage.getItem("threads");
  const savedMessages = localStorage.getItem("messages");

  const noThreads = !savedThreads || savedThreads === "[]";
  const noMessages = !savedMessages || savedMessages === "[]";

  if (noThreads || noMessages) {
    setThreads(mockThreads);
    setMessages(mockMessages);
    return;
  }

  setThreads(JSON.parse(savedThreads));
  setMessages(JSON.parse(savedMessages));
}, []);


  // -----------------------------
  // 2) Sauvegarde automatique
  // -----------------------------
  useEffect(() => {
    localStorage.setItem("threads", JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  // -----------------------------
  // 🔥 3) Compteur messages non lus
  // -----------------------------
  const unreadCount = messages.filter((m) => !m.read).length;


  // -----------------------------
  // 3) Créer une conversation
  // -----------------------------
  function createThread(otherUser: UserPublic) {
    const id = crypto.randomUUID();

    const newThread: Thread = {
      id,
      otherUser,
      lastMessage: "",
      unread: 0,
    };

    setThreads((prev) => [...prev, newThread]);
    return id;
  }

  // -----------------------------
  // 4) Récupérer les messages d’un thread
  // -----------------------------
  function getMessages(threadId: string) {
    return messages.filter((m) => m.threadId === threadId);
  }

  // -----------------------------
  // 5) Récupérer l’autre utilisateur du thread
  // -----------------------------
  function getThreadUser(threadId: string): UserPublic {
    const thread = threads.find((t) => t.id === threadId);
    if (!thread) throw new Error("Thread not found");
    return thread.otherUser;
  }

  // -----------------------------
  // 6) Envoyer un message
  // -----------------------------
  function sendMessage(threadId: string, sender: UserPublic, content: string) {
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
  }

  return (
    <MessagingContext.Provider
      value={{
        threads,
        messages,
        unreadCount,
        getMessages,
        sendMessage,
        createThread,
        getThreadUser,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
}

// -----------------------------
// HOOK
// -----------------------------
export function useMessaging() {
  const ctx = useContext(MessagingContext);
  if (!ctx) throw new Error("useMessaging must be used inside MessagingProvider");
  return ctx;
}
