"use client";

import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@/public/icons/menu.svg";
import CloseIcon from "@/public/icons/close.svg";
import HeartIcon from "@/public/icons/heart.svg";
import MessageIcon from "@/public/icons/message.svg";
import AddIcon from "@/public/icons/add.svg";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full flex justify-center py-4">
      <div className="w-[782px] h-[56px] bg-white rounded-[10px] shadow flex items-center justify-between px-4">
        
        {/* Mobile left icon */}
        <div className="md:hidden">
          <Image
            src="/images/picto-kasa.png"
            alt="Kasa"
            width={32}
            height={32}
          />
        </div>

        {/* Desktop navigation left */}
        <nav className="hidden md:flex gap-6 text-[14px] font-medium">
          <Link href="/" className="hover:text-main-red">Accueil</Link>
          <Link href="/about" className="hover:text-main-red">À propos</Link>
        </nav>

        {/* Logo center */}
        <div className="hidden md:block">
          <Image
            src="/images/logo-kasa.png"
            alt="Logo Kasa"
            width={120}
            height={40}
          />
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/add-property" className="flex items-center gap-2 text-main-red font-semibold">
            <AddIcon className="w-5 h-5 text-main-red" />
            Ajouter un logement
          </Link>

          <Link href="/favorites">
            <HeartIcon className="w-6 h-6 text-black hover:text-main-red" />
          </Link>

          <Link href="/messaging">
            <MessageIcon className="w-6 h-6 text-black hover:text-main-red" />
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? (
            <CloseIcon className="w-7 h-7 text-black" />
          ) : (
            <MenuIcon className="w-7 h-7 text-black" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-md p-6 flex flex-col gap-4 md:hidden">
          <Link href="/" className="text-[24px]">Accueil</Link>
          <Link href="/about" className="text-[24px]">À propos</Link>
          <Link href="/messaging" className="text-[24px]">Messagerie</Link>
          <Link href="/favorites" className="text-[24px]">Favoris</Link>

          <Link
            href="/add-property"
            className="bg-main-red text-white text-[14px] w-[200px] h-[36px] flex items-center justify-center rounded"
          >
            Ajouter un logement
          </Link>
        </div>
      )}
    </header>
  );
}
