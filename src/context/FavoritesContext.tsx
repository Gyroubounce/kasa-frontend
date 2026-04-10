"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  getFavorites,
  toggleFavorite as apiToggleFavorite,
} from "@/lib/api/favorites";
import { useAuthContext } from "@/context/AuthContext";

interface FavoritesContextType {
  favorites: string[];
  loading: boolean;
  error: string | null;
  isFavorite: (propertyId: string) => boolean;
  toggle: (propertyId: string) => Promise<void>;
  setFavorites: (ids: string[]) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const [favorites, setFavoritesState] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* -------------------------------------------------------
     CHARGER LES FAVORIS AU LOGIN (avec queueMicrotask)
  -------------------------------------------------------- */
  useEffect(() => {
    if (!user) {
      queueMicrotask(() => setFavoritesState([]));
      queueMicrotask(() => setLoading(false));
      return;
    }

    queueMicrotask(() => setLoading(true));

    getFavorites(user.id)
      .then((data) => {
        const ids = data.map((f) => String(f.propertyId));
        queueMicrotask(() => setFavoritesState(ids));
      })
      .catch((err: unknown) => {
        queueMicrotask(() =>
          setError(
            err instanceof Error
              ? err.message
              : "Erreur lors du chargement des favoris"
          )
        );
      })
      .finally(() => {
        queueMicrotask(() => setLoading(false));
      });
  }, [user]);

  /* -------------------------------------------------------
     MEMOIZATION DES FONCTIONS
  -------------------------------------------------------- */

  // ⭐ setFavorites stable
  const setFavorites = useCallback((ids: string[]) => {
    queueMicrotask(() => setFavoritesState(ids));
  }, []);

  // ⭐ isFavorite stable
  const isFavorite = useCallback(
    (propertyId: string) => favorites.includes(propertyId),
    [favorites]
  );

  // ⭐ toggle stable
  const toggle = useCallback(
    async (propertyId: string) => {
      if (!user) return;

      const currentlyFavorite = favorites.includes(propertyId);

      // Optimistic UI
      queueMicrotask(() =>
        setFavoritesState((prev) =>
          currentlyFavorite
            ? prev.filter((id) => id !== propertyId)
            : [...prev, propertyId]
        )
      );

      try {
        await apiToggleFavorite(propertyId, currentlyFavorite);
      } catch (err: unknown) {
        // rollback
        queueMicrotask(() =>
          setFavoritesState((prev) =>
            currentlyFavorite
              ? [...prev, propertyId]
              : prev.filter((id) => id !== propertyId)
          )
        );

        queueMicrotask(() =>
          setError(
            err instanceof Error
              ? err.message
              : "Erreur lors de la mise à jour des favoris"
          )
        );
      }
    },
    [favorites, user]
  );

  /* -------------------------------------------------------
     MEMOIZATION DE LA VALUE DU CONTEXTE
  -------------------------------------------------------- */
  const value = useMemo(
    () => ({
      favorites,
      loading,
      error,
      isFavorite,
      toggle,
      setFavorites,
    }),
    [favorites, loading, error, isFavorite, toggle, setFavorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error(
      "useFavoritesContext must be used within FavoritesProvider"
    );
  return ctx;
}
