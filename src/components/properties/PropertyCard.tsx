"use client";

import Image from "next/image";
import Link from "next/link";
import { PropertyBase } from "@/types/property";

interface PropertyCardProps {
  property: PropertyBase;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="block w-[355px] h-[552px] rounded-[10px] overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
      <Link
        href={`/properties/${property.id}`}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red rounded-[10px]"
        aria-label={`Voir le logement : ${property.title}`}
      >
        {/* IMAGE */}
        <div className="relative w-full h-[376px]">
          <Image
            src={property.cover}
            alt={`Photo du logement : ${property.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 355px"
            className="object-cover rounded-t-[10px]"
          />

          {/* ICÔNE CŒUR ACCESSIBLE */}
          <button
            aria-label="Ajouter aux favoris"
            className="absolute top-3 right-3 w-8 h-8 bg-gray-200 rounded-[5px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red"
          >
            <Image
              src="/images/icons/heart.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
              sizes="20px"
              style={{ width: "auto", height: "auto" }}
            />
          </button>
        </div>

        {/* CONTENU */}
        <div className="p-4 flex flex-col gap-1">
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
        </div>
      </Link>
    </article>
  );
}
