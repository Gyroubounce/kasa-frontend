"use client";

import { useEffect, useState } from "react";
import { useFavoritesContext } from "@/context/FavoritesContext";
import PropertyCard from "@/components/properties/PropertyCard";
import { PropertyBase } from "@/types/property";
import { apiFetch } from "@/lib/utils/fetcher";

export default function FavorisPage() {
  const favoritesCtx = useFavoritesContext();

  const [properties, setProperties] = useState<PropertyBase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      if (!favoritesCtx) return;

      const favs = favoritesCtx.favorites;

      console.log("📄 Page Favoris → IDs favoris :", favs);

      if (favs.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      try {
        // 1️⃣ Charger TOUTES les propriétés
        const all = await apiFetch<PropertyBase[]>(
          "https://kasa-backend-production-1060.up.railway.app/api/properties"
        );

        console.log("📄 Page Favoris → toutes propriétés :", all);

        // 2️⃣ Filtrer localement
        const filtered = all.filter((p) => favs.includes(p.id));

        console.log("📄 Page Favoris → propriétés filtrées :", filtered);

        setProperties(filtered);
      } catch (err) {
        console.error("❌ Erreur chargement favoris:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, [favoritesCtx]);

  return (
    <div className="w-full flex flex-col items-center px-4">
      <div className="w-full max-w-[1115px] flex flex-col items-center">

        <h1 className="text-[32px] font-bold text-mainRed text-center mt-8">
          Vos favoris
        </h1>

        <p className="text-[14px] font-normal text-black text-center mt-2 mb-8">
          Retrouvez ici tous les logements que vous avez aimés.<br />
          Prêts à réserver ? Un simple clic et votre prochain séjour est en route.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-500 text-center w-full">Chargement...</p>
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">
              Vous n’avez encore aucun favori.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
