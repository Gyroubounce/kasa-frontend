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

export default function Conversation({ threadId }: Props) {
  const { getMessages, sendMessage, markThreadAsRead } = useMessaging();
  const { user: currentUser } = useAuthContext();

  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🟦 Stabilisation des messages
  const messages = useMemo(() => {
    if (!currentUser) return [];
    return getMessages(threadId);
  }, [currentUser, getMessages, threadId]);

  // 🟥 Marquer le thread comme lu à l’ouverture / changement
  useEffect(() => {
    if (!threadId) return;
    markThreadAsRead(threadId);
  }, [threadId, markThreadAsRead]);

  // 🟦 Scroll auto stable
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentUser) return null;

  return (
    <div
      className="
        flex flex-col h-full 
        md:px-6 lg:px-0   
      "
    >
      {/* LISTE DES MESSAGES */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-col gap-4 w-full">
          {messages.map((m) => {
            const isMe = String(m.sender.id) === String(currentUser.id);

            return (
              <div key={m.id} className="w-full flex">
                {isMe ? (
                  <div className="w-full flex justify-end">
                    <MessageBubbleMe
                      content={m.content}
                      sender={m.sender}
                      time={new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    />
                  </div>
                ) : (
                  <div className="w-full flex justify-start">
                    <MessageBubbleOther
                      content={m.content}
                      sender={m.sender}
                      time={new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* INPUT */}
      <div
        className="
          w-full 
          flex justify-center        
          md:justify-start   
          py-4        
        "
      >
        <div
          className="
            md:w-full w-82.5     
            h-11 md:h-23.75     
            border border-gray-300 
            rounded-10 
            px-3 
            
            mt-4 
            relative 
            flex items-center        
          "
        >
          <textarea
            placeholder="Envoyer un message"
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
