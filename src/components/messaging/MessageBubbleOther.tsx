"use client";

import Image from "next/image";
import { UserPublic } from "@/types/user";
import { PropertyHost } from "@/types/property";

interface Props {
  content: string;
  sender: UserPublic | PropertyHost;
  time?: string;
}

export function MessageBubbleOther({ content, sender, time }: Props) {
  const avatar = sender.picture?.trim() || "/images/default-avatar.png";


  return (
    <div className="flex w-full justify-start gap-2">

      {/* AVATAR — aligné en haut */}
      <Image
        src={avatar}
        alt={`Avatar de ${sender.name}`}
        width={28}
        height={28}
        className="w-7 h-7 rounded-[6px] object-cover self-start"
      />

      {/* COLONNE TEXTE */}
      <div className="flex flex-col max-w-75">

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

        {/* BULLE */}
        <div className="px-3 py-2 bg-gray-light text-black text-[12px]
                        rounded-20 rounded-tl-none border border-gray-light">
          {content}
        </div>
      </div>
    </div>
  );
}
