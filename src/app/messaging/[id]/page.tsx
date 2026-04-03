"use client";

import { useParams, useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useIsMounted } from "@/hooks/useIsMounted";

import Image from "next/image";
import ArrowLeftIcon from "@/../public/images/icons/back.svg";

import ThreadList from "@/components/messaging/ThreadList";
import Conversation from "@/components/messaging/Conversation";
import { BackButton } from "@/components/messaging/BackButton";

export default function ConversationPage() {
  const { id } = useParams();
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 1024px)");
  const mounted = useIsMounted();

  return (
    <main className="flex w-full max-w-[1059px] mx-auto gap-6 h-[calc(100vh-150px)]">

      {/* LEFT COLUMN — always rendered, hidden on mobile */}
      <div className="hidden lg:flex w-[376px] flex-col gap-6 overflow-y-auto">
        <BackButton to="/" />
        <h1 className="text-[32px] font-medium">Messages</h1>
        <ThreadList />
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex-1 flex flex-col gap-6">

        {/* MOBILE HEADER — only visible on mobile */}
        {mounted && isMobile && (
          <button
            onClick={() => router.push("/messaging")}
            className="flex items-center gap-2 text-gray-700 text-[14px] font-medium"
          >
            <Image src={ArrowLeftIcon} alt="Retour" className="w-[8px] h-auto" />
            Retour
          </button>
        )}

        <Conversation threadId={id as string} />
      </div>
    </main>
  );
}
