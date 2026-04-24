"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, memo } from "react";
import { Thread } from "@/types/message";

interface ThreadItemProps {
  thread: Thread;
}

function ThreadItemComponent({ thread }: ThreadItemProps) {
  const pathname = usePathname();
  const avatar =
    thread.otherUser.picture?.trim() || "/images/default-avatar.png";

  const isSelected = pathname === `/messaging/${thread.id}`;

  // ⭐ lastSeen stabilisé
  const [lastSeen, setLastSeen] = useState(0);

  useEffect(() => {
    // ⭐ Corrige l’erreur ESLint : setState asynchrone
    queueMicrotask(() => {
      const value = Number(localStorage.getItem(`lastSeen_${thread.id}`) || 0);
      setLastSeen(value);
    });
  }, [thread.id]);

  // ⭐ Normalisation date SQLite → ISO
  const updatedAtRaw = thread.updatedAt;
  const normalizedDate = updatedAtRaw
    ? updatedAtRaw.replace(" ", "T") + "Z"
    : null;

  const updatedAt =
    normalizedDate && !isNaN(new Date(normalizedDate).getTime())
      ? new Date(normalizedDate)
      : null;

  const formattedTime = updatedAt
    ? updatedAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const lastMessageAt = updatedAt ? updatedAt.getTime() : 0;
  const hasNewMessage = lastMessageAt > lastSeen;

  return (
    <Link
      href={`/messaging/${thread.id}`}
      className={`
        w-90 h-15.25 flex items-center justify-between px-2 border-b
        transition-colors
        ${
          isSelected
            ? "bg-light-orange border-gray-light"
            : "bg-white border-gray-light"
        }
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
        <span className="text-[11px] text-gray-dark">{formattedTime}</span>

        <span
          className={`
            w-1.5 h-1.5 rounded-full mt-1
            ${hasNewMessage ? "bg-main-red" : "bg-gray-dark"}
          `}
        ></span>
      </div>
    </Link>
  );
}

// ⭐ Empêche les rerenders inutiles : rerend UNIQUEMENT si updatedAt ou lastMessage change
function areEqual(prev: ThreadItemProps, next: ThreadItemProps) {
  return (
    prev.thread.id === next.thread.id &&
    prev.thread.updatedAt === next.thread.updatedAt &&
    prev.thread.lastMessage === next.thread.lastMessage
  );
}

export const ThreadItem = memo(ThreadItemComponent, areEqual);
