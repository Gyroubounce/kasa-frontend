"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import menuIcon from "@/../public/images/icons/menu.svg";
import closeIcon from "@/../public/images/icons/close.svg";
import heartIcon from "@/../public/images/icons/heart.svg";
import messageIcon from "@/../public/images/icons/message.svg";

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

  const messagingCtx = useMessaging();
  const unreadCount = messagingCtx?.unreadCount;

  return (
    <header className="w-full flex justify-center md:pt-8 relative px-2 md:px-0 z-50">
      <div className="w-full max-w-97.5 md:max-w-195.5 h-21.25 md:h-[56px] bg-white rounded-10 flex items-center justify-center gap-12 px-4">

        {/* Desktop navigation left */}
        <nav className="hidden md:flex gap-5">
          <Link href="/" className="w-15 text-[14px] hover:text-main-red hover:font-bold">Accueil</Link>
          <Link href="/about" className="w-footer text-[14px] hover:text-main-red hover:font-bold">À propos</Link>
        </nav>

        {/* Logo center */}
        <div className="hidden md:block">
          <Image
            src={logo}
            alt="Logo Kasa"
            width={163}
            height={58}
            loading="eager"   // ⭐ Corrige le warning LCP
            priority          // ⭐ Recommandé pour le logo
            className="w-30 h-auto"
          />
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          {user && <p>Bonjour {user.name}</p>}

          <Link href="/add-property" className="flex items-center gap- text-main-red text-[14px] mr-4">
            + Ajouter un logement
          </Link>

          {/* Favoris */}
          <Link href="/favorites" className="relative">
            <Image src={heartIcon} alt="Favoris" width={20} height={20} className="w-3 h-3" />
            {user && favoritesCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-main-red text-white text-[12px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>

          <div className="w-px h-2 bg-main-red"></div>

          {/* Messages */}
          <Link href="/messaging" className="relative">
            <Image src={messageIcon} alt="Messages" width={20} height={20} className="w-3 h-3" />
            {user && unreadCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-main-red text-white text-[12px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile burger */}
        <div className="md:hidden flex items-center justify-between w-full">
          <Image
            src={picto}
            alt="Kasa"
            width={60}
            height={60}
            loading="eager"   // ⭐ Corrige le warning mobile
            priority
            className="w-11.5 h-13.5"
          />

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex items-center justify-center"
          >
            {open ? (
              <Image src={closeIcon} alt="Fermer" width={20} height={20} className="w-5 h-5" />
            ) : (
              <Image src={menuIcon} alt="Menu" width={28} height={28} className="w-7 h-7" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-18 left-0 w-full h-[calc(100vh-72px)] bg-white shadow-md p-6 flex flex-col gap-8 md:hidden z-50 overflow-y-auto">
          <Link href="/" onClick={() => setOpen(false)} className="text-[24px]">Accueil</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="text-[24px]">À propos</Link>

          <Link href="/messaging" onClick={() => setOpen(false)} className="text-[24px] relative flex items-center gap-3">
            Messagerie
            {user && unreadCount > 0 && (
              <span className="absolute left-37.5 bg-main-red text-white text-[12px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link href="/favorites" onClick={() => setOpen(false)} className="text-[24px] relative flex items-center gap-3">
            Favoris
            {user && favoritesCount > 0 && (
              <span className="absolute left-25 bg-main-red text-white text-[12px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link href="/add-property" onClick={() => setOpen(false)} className="bg-main-red text-white text-[14px] w-50 h-9 flex items-center justify-center rounded-10">
            Ajouter un logement
          </Link>
        </div>
      )}
    </header>
  );
}
