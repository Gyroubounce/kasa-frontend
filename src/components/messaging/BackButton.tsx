"use client";

import Link from "next/link";
import Image from "next/image";
import ArrowLeftIcon from "@/../public/images/icons/back.svg";

interface BackButtonProps {
  to: string;
  label: string;
}

export function BackButton({ to, label }: BackButtonProps) {
  return (
    <Link
      href={to}
      aria-label={label}
      className="inline-flex items-center gap-2 bg-gray-light rounded-10 px-5 h-9 w-fit"
    >
      <Image
        src={ArrowLeftIcon}
        alt=""
        className="w-2 h-auto"
      />

      <span className="text-gray-dark text-[14px] font-medium">
        {label}
      </span>
    </Link>
  );
}
