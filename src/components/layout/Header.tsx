"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import menuIcon from "@/../public/images/icons/menu.svg";
import closeIcon from "@/../public/images/icons/close.svg";
import heartIcon from "@/../public/images/icons/heart.svg";
import messageIcon from "@/../public/images/icons/message.svg";
import addIcon from "@/../public/images/icons/add.svg";

import logo from "@/../public/images/Logo-kasa.png";
import picto from "@/../public/images/Picto-kasa.png";

import { useAuthContext } from "@/context/AuthContext";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { useMessaging } from "@/context/MessagingContext"; 

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();

  const favoritesCtx = useFavoritesContext();
  const favoritesCount = favoritesCtx?.favorites.length ?? 0;

  const messagingCtx = useMessaging?.();
  const unreadCount = messagingCtx?.unreadCount ?? 0;

  return (
    <header className="w-full flex justify-center py-4 relative">
      <div className="w-[782px] h-[56px] bg-white rounded-[10px] shadow flex items-center justify-between px-4">
        
        {/* Mobile left icon */}
        <div className="md:hidden">
          <Image src={picto} alt="Kasa" className="w-10 h-10" />
        </div>

        {/* Desktop navigation left */}
        <nav className="hidden md:flex gap-6 text-[14px] font-medium">
          <Link href="/" className="hover:text-main-red">Accueil</Link>
          <Link href="/about" className="hover:text-main-red">À propos</Link>
        </nav>

        {/* Logo center */}
        <div className="hidden md:block">
          <Image src={logo} alt="Logo Kasa" className="w-30 h-10" />
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          {user && <p>Bonjour {user.name}</p>}

          <Link href="/add-property" className="flex items-center gap-2 text-main-red font-semibold">
            <Image src={addIcon} alt="Ajouter" className="w-5 h-5" />
            Ajouter un logement
          </Link>

          {/* Favoris + compteur */}
          <Link href="/favorites" className="relative">
            <Image src={heartIcon} alt="Favoris" className="w-6 h-6" />
            {user && favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-main-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Messages + compteur */}
          <Link href="/messaging" className="relative">
            <Image src={messageIcon} alt="Messages" className="w-6 h-6" />
            {user && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-main-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? (
            <Image src={closeIcon} alt="Fermer" className="w-5 h-5" />
          ) : (
            <Image src={menuIcon} alt="Menu" className="w-5 h-5" />
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
