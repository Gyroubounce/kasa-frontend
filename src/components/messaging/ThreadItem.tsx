"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Thread } from "@/types/message";

interface ThreadItemProps {
  thread: Thread;
}

export function ThreadItem({ thread }: ThreadItemProps) {
  const pathname = usePathname();
  const avatar = thread.otherUser.picture?.trim() || "/images/default-avatar.png";


  // ✔️ Détection du thread sélectionné
  const isSelected = pathname === `/messaging/${thread.id}`;

  return (
    <Link
      href={`/messaging/${thread.id}`}
      className={`
        w-90 h-15.25 flex items-center justify-between px-2 border-b
        transition-colors
        ${isSelected ? "bg-light-orange border-gray-light" : "bg-white border-gray-light"}
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          alt={`Avatar de ${thread.otherUser.name}`}
          className="w-11 h-11.25 rounded-[5px] object-cover"
          width={44}
          height={45}
          unoptimized
        />

        <div className="flex flex-col gap-y-1">
          <span className="text-[14px] font-medium text-black">
            {thread.otherUser.name}
          </span>

          <span className="text-[11px] text-gray-dark truncate max-w-50">
            {thread.lastMessage || "Aucun message"}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end">
        <span className="text-[11px] text-gray-dark">11:04 am</span>

        
          <span
            className={`
              w-1.5 h-1.5 rounded-full mt-1
              ${thread.unread > 0 ? "bg-main-red" : "bg-gray-dark"}
            `}
          ></span>

        
      </div>
    </Link>
  );
}
