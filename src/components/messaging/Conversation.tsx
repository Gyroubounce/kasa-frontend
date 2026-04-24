"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useMessaging } from "@/context/MessagingContext";
import { useAuthContext } from "@/context/AuthContext";

import Image from "next/image";
import ArrowSendIcon from "@/../public/images/icons/send.svg";

import { MessageBubbleMe } from "./MessageBubbleMe";
import { MessageBubbleOther } from "./MessageBubbleOther";

interface Props {
  threadId: string;
}

/* -------------------------------------------------------
   Utils : formatage date + détection changement de jour
-------------------------------------------------------- */
function formatDateSeparator(dateString: string) {
  const date = new Date(dateString.replace(" ", "T") + "Z");

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isDifferentDay(date1: string, date2: string) {
  const d1 = new Date(date1.replace(" ", "T") + "Z");
  const d2 = new Date(date2.replace(" ", "T") + "Z");

  return (
    d1.getFullYear() !== d2.getFullYear() ||
    d1.getMonth() !== d2.getMonth() ||
    d1.getDate() !== d2.getDate()
  );
}

export default function Conversation({ threadId }: Props) {
  const { getMessages, sendMessage, loadMessagesForThread } = useMessaging();
  const { user: currentUser } = useAuthContext();

  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* -------------------------------------------------------
     1) Charger les messages + marquer la dernière visite
  -------------------------------------------------------- */
  useEffect(() => {
    if (!threadId) return;

    localStorage.setItem(`lastSeen_${threadId}`, Date.now().toString());
    loadMessagesForThread(threadId);
  }, [threadId, loadMessagesForThread]);

  /* -------------------------------------------------------
     2) Récupération stable des messages
  -------------------------------------------------------- */
  const messages = useMemo(() => {
    if (!currentUser) return [];
    return getMessages(threadId);
  }, [currentUser, getMessages, threadId]);

  /* -------------------------------------------------------
     3) Scroll automatique
  -------------------------------------------------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentUser) return null;

  return (
    <div className="flex flex-col h-full md:px-6 lg:px-0">
      {/* LISTE DES MESSAGES */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-col gap-4 w-full">

          {messages.map((m, index) => {
            const isMe = String(m.sender.id) === String(currentUser.id);

            const showSeparator =
              index === 0 ||
              isDifferentDay(m.createdAt, messages[index - 1].createdAt);

            const normalized = m.createdAt.replace(" ", "T") + "Z";
            const time = new Date(normalized).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div key={m.id} className="w-full flex flex-col gap-2">

                {/* ⭐ Séparateur centré */}
                {showSeparator && (
                  <div className="flex items-center my-4 w-full">
                    <div className="flex-1 h-px bg-gray-light"></div>
                    <span className="px-3 text-[12px] text-gray-dark whitespace-nowrap">
                      {formatDateSeparator(m.createdAt)}
                    </span>
                    <div className="flex-1 h-px bg-gray-light"></div>
                  </div>
                )}

                {/* ⭐ Message aligné à gauche ou à droite */}
                <div className={`w-full flex ${isMe ? "justify-end" : "justify-start"}`}>
                  {isMe ? (
                    <MessageBubbleMe
                      content={m.content}
                      sender={m.sender}
                      time={time}
                    />
                  ) : (
                    <MessageBubbleOther
                      content={m.content}
                      sender={m.sender}
                      time={time}
                    />
                  )}
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* INPUT */}
      <div className="w-full flex justify-center md:justify-start py-4">
        <div
          className="
            md:w-full w-82.5
            h-11 md:h-23.75
            border border-gray-light
            rounded-10
            px-3
            mt-4
            relative
            flex items-center
          "
        >
          <textarea
            placeholder="Envoyer un message"
            aria-label="Message"
            className="
              flex-1
              h-5 md:h-full
              resize-none
              outline-none
              text-[12px]
              overflow-x-auto
              overflow-y-hidden
              md:pt-4 md:pl-3
              pr-10
            "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={() => {
              if (text.trim().length === 0) return;
              sendMessage(threadId, text);
              setText("");
            }}
            className="
              absolute
              right-1 md:right-2.5
              top-1/2 -translate-y-1/2
              md:top-auto md:bottom-1.5
              md:translate-y-0
              w-8 h-8
              bg-main-red
              rounded-[5px]
              flex items-center justify-center
            "
            aria-label="Envoyer le message"
          >
            <Image src={ArrowSendIcon} alt="Envoyer" className="w-2 h-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
