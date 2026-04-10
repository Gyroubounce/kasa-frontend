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
  const avatar = thread.otherUser.picture || "/default-avatar.png";

  // ✔️ Détection du thread sélectionné
  const isSelected = pathname === `/messaging/${thread.id}`;

  return (
    <Link
      href={`/messaging/${thread.id}`}
      className={`
        w-[360px] h-[61px] flex items-center justify-between px-2 border-b
        transition-colors
        ${isSelected ? "bg-orange-50 border-orange-200" : "bg-white border-gray-200"}
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          alt={`Avatar de ${thread.otherUser.name}`}
          className="w-[44px] h-[45px] rounded-full object-cover"
          width={44}
          height={45}
        />

        <div className="flex flex-col">
          <span className="text-[14px] font-medium text-black">
            {thread.otherUser.name}
          </span>

          <span className="text-[10px] text-gray-600 truncate max-w-[200px]">
            {thread.lastMessage || "Aucun message"}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end">
        <span className="text-[10px] text-gray-600">11:04 am</span>

        {thread.unread > 0 && (
          <span className="w-[6px] h-[6px] bg-main-red rounded-full mt-1"></span>
        )}
      </div>
    </Link>
  );
}
