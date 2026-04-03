"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getFavorites, toggleFavorite as apiToggleFavorite } from "@/lib/api/favorites";
import { useAuthContext } from "@/context/AuthContext";

interface FavoritesContextType {
  favorites: string[];
  loading: boolean;
  error: string | null;
  isFavorite: (propertyId: string) => boolean;
  toggle: (propertyId: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* -------------------------------------------------------
     CHARGER LES FAVORIS AU LOGIN
  -------------------------------------------------------- */
  useEffect(() => {
    if (!user) {
      queueMicrotask(() => setFavorites([]));
      queueMicrotask(() => setLoading(false));
      return;
    }

    queueMicrotask(() => setLoading(true));

    getFavorites(user.id)
      .then((data) => {
        const ids = data.map((f) => String(f.propertyId));
        queueMicrotask(() => setFavorites(ids));
      })
      .catch((err: unknown) => {
        if (err instanceof Error) setError(err.message);
        else setError("Erreur lors du chargement des favoris");
      })
      .finally(() => {
        queueMicrotask(() => setLoading(false));
      });
  }, [user]);

  /* -------------------------------------------------------
     CHECK FAVORI
  -------------------------------------------------------- */
  function isFavorite(propertyId: string) {
    return favorites.includes(propertyId);
  }

  /* -------------------------------------------------------
     TOGGLE FAVORI
  -------------------------------------------------------- */
  async function toggle(propertyId: string) {
    if (!user) return;

    const currentlyFavorite = favorites.includes(propertyId);

    // Optimistic UI
    setFavorites((prev) =>
      currentlyFavorite
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );

    try {
      await apiToggleFavorite(propertyId, currentlyFavorite);
    } catch (err: unknown) {
      // rollback
      setFavorites((prev) =>
        currentlyFavorite
          ? [...prev, propertyId]
          : prev.filter((id) => id !== propertyId)
      );

      if (err instanceof Error) setError(err.message);
      else setError("Erreur lors de la mise à jour des favoris");
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        error,
        isFavorite,
        toggle,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavoritesContext must be used within FavoritesProvider");
  return ctx;
}
