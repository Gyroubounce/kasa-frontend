"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ArrowLeftIcon from "@/../public/images/icons/back.svg";

export function BackButton({ to }: { to: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(to)}
      className="flex items-center gap-2 text-gray-700 text-[14px] font-medium"
    >
      <Image src={ArrowLeftIcon} alt="Retour" className="w-[8px] h-auto" />
      Retour
    </button>
  );
}
