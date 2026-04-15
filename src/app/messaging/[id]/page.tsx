"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext"
import { useParams } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useIsMounted } from "@/hooks/useIsMounted";



import ThreadList from "@/components/messaging/ThreadList";
import Conversation from "@/components/messaging/Conversation";
import { BackButton } from "@/components/messaging/BackButton";

export default function ConversationPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuthContext();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const mounted = useIsMounted();

    if (authLoading) {
    return null;
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <article className="flex w-full max-w-97.5 md:max-w-264.75 mx-auto gap-6 h-[calc(100vh-150px)] mt-8">

      {/* LEFT COLUMN — always rendered, hidden on mobile */}
      
      <div className="hidden lg:flex w-94 flex-col gap-6 overflow-y-auto">
        <BackButton to="/" label="Retour" />
        <h1 className="text-[32px] font-medium">Messages</h1>
        <ThreadList />
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex-1 flex flex-col gap-6">

        {/* MOBILE HEADER — only visible on mobile */}
        {mounted && isMobile && (
          <div className="md:ml-4">
            <BackButton to="/messaging" label="Retour" />
          </div>
        )}


        <Conversation threadId={id as string} />
      </div>
    </article>
  );
}
