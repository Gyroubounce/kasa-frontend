"use client";

import Image from "next/image";
import { UserPublic } from "@/types/user";

interface Props {
  content: string;
  sender: UserPublic;
  time?: string;
}

export function MessageBubbleOther({ content, sender, time }: Props) {
  const avatar = sender.picture || "/default-avatar.png";

  return (
    <div className="flex items-start gap-2">

      {/* CONTAINER GLOBAL */}
      <div className="flex flex-col max-w-[300px]">

        {/* LIGNE : avatar + nom + heure */}
        <div className="flex items-center gap-2 mb-1">
          <Image
            src={avatar}
            alt={`Avatar de ${sender.name}`}
            width={28}
            height={28}
            className="w-[28px] h-[28px] rounded-[6px] object-cover"
          />

          <span className="text-[10px] text-gray-500 truncate max-w-[120px]">
            {sender.name}
          </span>
          <span className="text-[10px] text-gray-500">•</span>
          <span className="text-[10px] text-gray-500">
            {time || "12:45"}
          </span>
        </div>

        {/* BULLE DU MESSAGE — séparée */}
        <div className="px-3 py-2 rounded-[8px] bg-gray-100 text-black text-[12px]">
          {content}
        </div>

      </div>
    </div>
  );
}
