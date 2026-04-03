"use client";

import Image from "next/image";
import { UserPublic } from "@/types/user";

interface Props {
  content: string;
  sender: UserPublic;
  time?: string;
}

export function MessageBubbleMe({ content, sender, time }: Props) {
  const avatar = sender.picture || "/default-avatar.png";

  return (
    <div className="flex items-start gap-2">

      {/* CONTAINER GLOBAL TEXTE + AVATAR */}
      <div className="flex flex-col items-end max-w-[300px]">

        {/* LIGNE : nom + heure + avatar */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] text-gray-500 truncate max-w-[120px]">
            {sender.name}
          </span>
          <span className="text-[10px] text-gray-500">•</span>
          <span className="text-[10px] text-gray-500">
            {time || "12:45"}
          </span>

          {/* Avatar dans la même ligne */}
          <Image
            src={avatar}
            alt="Votre avatar"
            width={28}
            height={28}
            className="w-[28px] h-[28px] rounded-[6px] object-cover"
          />
        </div>

        {/* BULLE DU MESSAGE — séparée, plus bas */}
        <div className="px-3 py-2 rounded-[8px] bg-main-red text-white text-[12px]">
          {content}
        </div>

      </div>
    </div>
  );
}
