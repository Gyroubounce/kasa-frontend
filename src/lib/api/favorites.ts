import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";
import { Favorite } from "@/types/favorites";

export async function getFavorites(userId: string): Promise<Favorite[]> {
  return apiFetch<Favorite[]>(`${API_URL}/api/favorites/${userId}`);
}

export async function toggleFavorite(
  userId: string,
  propertyId: string
): Promise<{ success: boolean }> {
  return apiFetch(`${API_URL}/api/favorites/toggle`, {
    method: "POST",
    body: JSON.stringify({ userId, propertyId }),
  });
}
