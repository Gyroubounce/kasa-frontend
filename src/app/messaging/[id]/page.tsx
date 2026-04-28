"use client";


import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
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
  const router = useRouter();

  // 🔥 Redirection CLIENT dans un useEffect (pas dans le render)
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  // On attend que l'auth soit chargée
  if (authLoading || !user) return null;



  return (
    
    <article className="flex w-full max-w-97.5 md:max-w-264.75 gap-6 h-[calc(100vh-250px)] mt-8">

      {/* LEFT COLUMN — always rendered, hidden on mobile */}
      <div className="hidden lg:flex w-94 flex-col gap-6 overflow-y-auto ml-4">
        <BackButton to="/" label="Retour" />
        <h1 className="text-[32px] font-medium ml-2">Messages</h1>
        <ThreadList />
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex-1 flex flex-col gap-6">

        {/* MOBILE HEADER */}
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
