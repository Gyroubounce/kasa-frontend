"use client";

import { useMessaging } from "@/context/MessagingContext";
import { ThreadItem } from "./ThreadItem";

export default function ThreadList() {
  const { threads } = useMessaging();

  return (
    <div className="flex flex-col gap-3 flex-1">
      {threads.map((t) => (
        <ThreadItem key={t.id} thread={t} />
      ))}
    </div>
  );
}
