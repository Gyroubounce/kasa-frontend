"use client";

import Image from "next/image";
import Link from "next/link";
import { PropertyBase } from "@/types/property";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { useAuth } from "@/hooks/useAuth";

interface PropertyCardProps {
  property: PropertyBase;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const favoritesCtx = useFavoritesContext();
  const { user } = useAuth();

  if (!favoritesCtx) return null;

  const { isFavorite, toggle } = favoritesCtx;
  const favorite = isFavorite(property.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // 🔥 Empêche l'appel API si l'utilisateur n'est pas connecté
    if (!user) {
      console.warn("Vous devez être connecté pour ajouter un favori");
      return;
    }

    toggle(property.id);
  };

  return (
    <article className="block w-[355px] h-[552px] rounded-[10px] overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
      <div className="relative w-full h-[376px]">

        {/* IMAGE CLIQUABLE */}
        <Link
          href={`/properties/${property.id}`}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red rounded-[10px]"
          aria-label={`Voir le logement : ${property.title}`}
        >
          <Image
            src={property.cover}
            alt={`Photo du logement : ${property.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 355px"
            className="object-cover rounded-t-[10px]"
          />
        </Link>

        {/* BOUTON FAVORIS */}
        <button
          aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          onClick={handleFavorite}
          className={`
            absolute top-3 right-3 w-8 h-8 rounded-[5px] flex items-center justify-center
            focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red transition-colors
            ${favorite ? "bg-main-red hover:bg-dark-orange" : "bg-gray-200 hover:bg-dark-orange"}
          `}
        >
          <Image
            src="/images/icons/heart.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
            sizes="20px"
            style={{
              width: "auto",
              height: "auto",
              filter: favorite ? "brightness(0) invert(1)" : "none",
            }}
          />
        </button>
      </div>

      {/* CONTENU */}
      <Link
        href={`/properties/${property.id}`}
        className="block p-4 flex flex-col gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red rounded-b-[10px]"
      >
        <h2 className="text-[18px] font-medium text-black">
          {property.title}
        </h2>

        <p className="text-[14px] text-gray-700">
          {property.location}
        </p>

        <p className="text-[14px] font-medium text-black">
          {property.price_per_night}€
          <span className="text-gray-700 font-normal"> / nuit</span>
        </p>
      </Link>
    </article>
  );
}
