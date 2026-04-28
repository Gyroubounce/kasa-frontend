"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useFavoritesContext } from "@/context/FavoritesContext";
import PropertyCard from "@/components/properties/PropertyCard";

export default function FavorisPage() {
  const router = useRouter();
  const { user} = useAuthContext();
  const { properties, loading } = useFavoritesContext();

  // ⛔ IMPORTANT : ne jamais rediriger dans le render
   // Si user === null → redirection
  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  // Si user est undefined → AuthContext charge encore → on affiche la page vide
  if (user === undefined) {
    return null;
  }

  return (
    <div className="max-w-278.75 mx-auto flex flex-col items-center">

      <h1 className="text-[32px] font-bold text-main-red text-center mt-8">
        Vos favoris
      </h1>

      <p className="w-88.75 md:w-full text-[14px] font-normal text-black text-center mt-4 md:mb-8 leading-relaxed">
        Retrouvez ici tous les logements que vous avez aimés.<br className="hidden md:block" />
        Prêts à réserver ? Un simple clic et votre prochain séjour est en route.
      </p>

      <div className="flex flex-wrap justify-start gap-6 mt-10 mb-16 max-w-88.75 lg:max-w-278.75 md:max-w-183.5 mx-auto">
        {loading ? (
          <p className="text-gray-dark text-center w-full">Chargement...</p>
        ) : properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p className="text-gray-dark text-center w-full">
            Vous n’avez encore aucun favori.
          </p>
        )}
      </div>

    </div>
  );
}
