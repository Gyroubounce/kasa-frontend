"use client";

import Image from "next/image";
import { UserPublic } from "@/types/user";
import { PropertyHost } from "@/types/property";

interface Props {
  content: string;
  sender: UserPublic | PropertyHost;
  time?: string;
}

export function MessageBubbleMe({ content, sender, time }: Props) {
  const avatar = sender.picture || "/img/alex.png";

  return (
    <div className="flex w-full justify-end gap-2">

      {/* COLONNE TEXTE */}
      <div className="flex flex-col items-end max-w-75">

        {/* Nom + heure */}
        <div className="flex items-center gap-1 mb-1">
          <span className="text-[10px] text-gray-dark truncate max-w-30">
            {sender.name}
          </span>
          <span className="text-[10px] text-gray-dark">•</span>
          <span className="text-[10px] text-gray-dark">
            {time || "12:45"}
          </span>
        </div>

        {/* Bulle */}
        <div className="px-3 py-2 rounded-20 rounded-tr-none bg-main-red text-white text-[12px] border border-gray-light">
          {content}
        </div>
      </div>

      {/* AVATAR — centré verticalement */}
      <Image
        src={avatar}
        alt="Votre avatar"
        width={28}
        height={28}
        className="w-7 h-7 rounded-[6px] object-cover self-start"
      />
    </div>
  );
}
