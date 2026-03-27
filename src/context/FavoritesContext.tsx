"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/api/favorites";
import { Favorite } from "@/types/favorites";
import { useAuth } from "@/hooks/useAuth";

interface FavoritesContextType {
  favorites: string[]; // liste des propertyId
  loading: boolean;
  error: string | null;
  isFavorite: (propertyId: string) => boolean;
  toggle: (propertyId: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les favoris au login
  useEffect(() => {
    if (!user) {
        queueMicrotask(() => {
        setFavorites([]);
        });

        queueMicrotask(() => {
        setLoading(false);
        });

        return;
    }

     queueMicrotask(() => {
        setLoading(true);
    });

    getFavorites(user.id)
        .then((data) => {
        const ids = data.map((f) => f.propertyId);
        queueMicrotask(() => {
            setFavorites(ids);
        });
        })
        .catch((err: unknown) => {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Erreur lors du chargement des favoris");
        }
        })
        .finally(() => {
        queueMicrotask(() => {
            setLoading(false);
        });
        });
    }, [user]);


  function isFavorite(propertyId: string) {
    return favorites.includes(propertyId);
  }

  async function toggle(propertyId: string) {
    if (!user) return;

    try {
      await toggleFavorite(user.id, propertyId);

      setFavorites((prev) =>
        prev.includes(propertyId)
          ? prev.filter((id) => id !== propertyId)
          : [...prev, propertyId]
      );
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Erreur lors de la mise à jour des favoris");
        }
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
  return useContext(FavoritesContext);
}
