"use client";

import Image from "next/image";
import Link from "next/link";
import { PropertyBase } from "@/types/property";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { useAuthContext } from "@/context/AuthContext";

interface PropertyCardProps {
  property: PropertyBase;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const favoritesCtx = useFavoritesContext();
  const { user } = useAuthContext();

  const { favorites, isFavorite, toggle } = favoritesCtx;
  const favorite = isFavorite(String(property.id));

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      console.warn("Vous devez être connecté pour ajouter un favori");
      return;
    }

    toggle(String(property.id));
  };

  return (
    <Link
      href={`/properties/${property.id}`}
      aria-label={`Voir le logement : ${property.title}`}
      className="block w-88.75 h-138 rounded-10 overflow-hidden hover:shadow-xl transition-shadow bg-white"
    >
      <article>

        {/* IMAGE */}
        <div className="relative w-full h-94">
          <Image
            src={property.cover}
            alt={property.title}
            fill
            priority          // ⭐ Corrige le warning LCP
            loading="eager"   // ⭐ Corrige le warning LCP
            sizes="(max-width: 768px) 100vw, 355px"
            className="object-cover rounded-t-10"
            unoptimized
          />

          {/* BOUTON FAVORIS */}
          <button
            aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            onClick={handleFavorite}
            className={`
              absolute top-3 right-3 w-8 h-8 rounded-[5px] flex items-center justify-center
              focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red transition-colors
              ${favorite 
                ? "bg-main-red hover:bg-dark-orange" 
                : "bg-gray-light hover:bg-dark-orange"}
            `}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              className={`
                transition-colors
                ${favorite
                  ? "fill-gray-light stroke-white"
                  : "fill-gray-dark stroke-gray-light"
                }
              `}
            >
              <path
                d="M12 21s-6.5-4.35-9.5-8.28C-1.5 7.5 2 2 7 2c2.5 0 4 1.5 5 3 1-1.5 2.5-3 5-3 5 0 8.5 5.5 4.5 10.72C18.5 16.65 12 21 12 21z"
                strokeWidth="2"
                fillOpacity="0.7"
              />
            </svg>
          </button>
        </div>

        {/* CONTENU */}
        <div className="h-44 p-4 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-medium text-black">
              {property.title}
            </h2>

            <p className="text-[14px] text-gray-700">
              {property.location}
            </p>
          </div>

          <p className="text-[14px] font-medium text-black">
            {property.price_per_night}€
            <span className="text-gray-700 font-normal"> / nuit</span>
          </p>
        </div>

      </article>
    </Link>
  );
}
