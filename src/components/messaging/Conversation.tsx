"use client";

import { useMessaging } from "@/context/MessagingContext";
import { MessageBubbleOther } from "@/components/messaging/MessageBubbleOther";
import { MessageBubbleMe } from "@/components/messaging/MessageBubbleMe";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import ArrowSendIcon from "@/../public/images/icons/send.svg";

export default function Conversation({ threadId }: { threadId: string }) {
  const { getMessages } = useMessaging();
  const { user: currentUser } = useAuth();

  if (!currentUser) return null;

  const messages = getMessages(threadId);

  return (
    <div className="flex flex-col h-full">

      {/* MESSAGES AREA — scrollable */}
    <div className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-col gap-4 w-full">
            {messages.map((m) => (
            <div key={m.id} className="w-full flex">
                {m.sender.id == currentUser.id ? (
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
                  coucou
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
            ))}
        </div>
    </div>


      {/* INPUT AREA — fixed at bottom */}
      <div className="w-full h-[95px] border border-gray-300 rounded-[10px] p-3 mt-4 relative">
        <textarea
          placeholder="Envoyer un message"
          className="w-full h-full resize-none outline-none text-[14px]"
        />

        <button
          className="absolute bottom-3 right-3 w-[32px] h-[32px] bg-main-red rounded-[5px] flex items-center justify-center"
          aria-label="Envoyer le message"
        >
          <Image src={ArrowSendIcon} alt="Envoyer" className="w-[8px] h-auto" />
        </button>
      </div>
    </div>
  );
}
