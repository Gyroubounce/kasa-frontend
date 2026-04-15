"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import { useAuthContext } from "@/context/AuthContext";
import { apiFetch } from "@/lib/utils/fetcher";
import { API_URL } from "@/lib/env";
import { PropertyBase } from "@/types/property";

interface FavoritesContextType {
  favorites: string[];
  properties: PropertyBase[];
  loading: boolean;
  error: string | null;
  isFavorite: (propertyId: string) => boolean;
  toggle: (propertyId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [properties, setProperties] = useState<PropertyBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* -------------------------------------------------------
     FETCH FAVORIS + PROPRIÉTÉS
  -------------------------------------------------------- */
  const refreshFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setProperties([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch<PropertyBase[]>(
        `${API_URL}/api/users/${user.id}/favorites`
      );

      setFavorites(data.map((p) => String(p.id)));
      setProperties(data);
      setError(null);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement des favoris"
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  /* -------------------------------------------------------
     AUTO-LOAD QUAND USER CHANGE
  -------------------------------------------------------- */
  useEffect(() => {
    refreshFavorites();
  }, [user, refreshFavorites]);

  /* -------------------------------------------------------
     CHECK FAVORI
  -------------------------------------------------------- */
  const isFavorite = useCallback(
    (propertyId: string) => favorites.includes(propertyId),
    [favorites]
  );

  /* -------------------------------------------------------
     TOGGLE FAVORI
  -------------------------------------------------------- */
  const toggle = useCallback(
    async (propertyId: string) => {
      if (!user) return;

      const currentlyFavorite = favorites.includes(propertyId);

      // Optimistic UI
      setFavorites((prev) =>
        currentlyFavorite
          ? prev.filter((id) => id !== propertyId)
          : [...prev, propertyId]
      );

      try {
        await apiFetch(
          `${API_URL}/api/users/${user.id}/favorites/${propertyId}`,
          {
            method: currentlyFavorite ? "DELETE" : "POST",
          }
        );

        // Recharger les propriétés pour rester synchro
        refreshFavorites();
      } catch (err: unknown) {
        // rollback
        setFavorites((prev) =>
          currentlyFavorite
            ? [...prev, propertyId]
            : prev.filter((id) => id !== propertyId)
        );

        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors de la mise à jour des favoris"
        );
      }
    },
    [favorites, user, refreshFavorites]
  );

  /* -------------------------------------------------------
     VALUE MEMOIZÉE
  -------------------------------------------------------- */
  const value = useMemo(
    () => ({
      favorites,
      properties,
      loading,
      error,
      isFavorite,
      toggle,
      refreshFavorites,
    }),
    [favorites, properties, loading, error, isFavorite, toggle, refreshFavorites]
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
