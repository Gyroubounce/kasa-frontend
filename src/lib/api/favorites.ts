import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";
import { Favorite } from "@/types/favorites";

// GET /api/users/{id}/favorites
export async function getFavorites(userId: string): Promise<Favorite[]> {
  return apiFetch<Favorite[]>(`${API_URL}/api/users/${userId}/favorites`);
}

// POST ou DELETE /api/properties/{propertyId}/favorite
export async function toggleFavorite(
  propertyId: string,
  isFavorite: boolean
): Promise<{ success: boolean }> {
  return apiFetch(`${API_URL}/api/properties/${propertyId}/favorite`, {
    method: isFavorite ? "DELETE" : "POST",
  });
}
