import { useFavoritesContext } from "@/context/FavoritesContext";

export function useFavorites() {
  const ctx = useFavoritesContext();
  if (!ctx) {
    throw new Error("useFavorites must be used inside <FavoritesProvider>");
  }
  return ctx;
}
