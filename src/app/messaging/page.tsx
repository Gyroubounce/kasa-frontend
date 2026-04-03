"use client";

import { useMessaging } from "@/context/MessagingContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useIsMounted } from "@/hooks/useIsMounted";

import ThreadList from "@/components/messaging/ThreadList";
import { BackButton } from "@/components/messaging/BackButton";

export default function MessagingPage() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const mounted = useIsMounted();

  return (
    <main className="flex w-full max-w-[1059px] mx-auto gap-6 h-[calc(100vh-150px)]">

      {/* LEFT CONTAINER */}
      <div className="w-[376px] flex flex-col gap-6 overflow-y-auto">

        {mounted && <BackButton to="/" />}

        <h1 className="text-[32px] font-medium">Messages</h1>

        {/* THREAD LIST */}
        <ThreadList />
      </div>

      {/* RIGHT CONTAINER */}
      {mounted && !isMobile && (
        <div className="w-[683px] flex items-center justify-center text-gray-500">
          Sélectionnez une conversation
        </div>
      )}
    </main>
  );
}
