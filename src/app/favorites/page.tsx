"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useFavoritesContext } from "@/context/FavoritesContext";
import PropertyCard from "@/components/properties/PropertyCard";

export default function FavorisPage() {
  const { user, loading: authLoading } = useAuthContext();
  const { properties, loading } = useFavoritesContext();

  if (authLoading) return null;

  if (!user) {
    redirect("/login");
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

      <div className="flex flex-wrap justify-start gap-6 mt-10 max-w-88.75 lg:max-w-278.75 md:max-w-183.5 mx-auto">
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
  );
}
