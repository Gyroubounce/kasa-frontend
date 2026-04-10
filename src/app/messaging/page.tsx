"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";   
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useIsMounted } from "@/hooks/useIsMounted";

import ThreadList from "@/components/messaging/ThreadList";
import { BackButton } from "@/components/messaging/BackButton";

export default function MessagingPage() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const mounted = useIsMounted();
  const { user, loading: authLoading } = useAuthContext();

  if (authLoading) {
    return null;
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <article className="flex w-full max-w-97.5 md:max-w-264.75 mx-auto gap-6 h-[calc(100vh-150px)] mt-8">

      {/* LEFT CONTAINER */}
      <div className="w-94 flex flex-col gap-6 overflow-y-auto">

        {mounted && <BackButton to="/" label="Retour"/>}

        <h1 className="text-[32px] font-medium">Messages</h1>

        {/* THREAD LIST */}
        <ThreadList />
      </div>

      {/* RIGHT CONTAINER */}
      {mounted && !isMobile && (
        <div className="w-170.75 flex items-center justify-center text-gray-500">
          Sélectionnez une conversation
        </div>
      )}
    </article>
  );
}
