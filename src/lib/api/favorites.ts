import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";
import { PropertyBase } from "@/types/property";

/**
 * Récupère la liste des favoris d'un utilisateur.
 *
 * @async
 * @function getFavorites
 * @param {string} userId - Identifiant de l'utilisateur
 * @returns {Promise<PropertyBase[]>} Liste des propriétés favorites
 */
export async function getFavorites(userId: string): Promise<PropertyBase[]> {
  // 🚫 Bloque TOUT si userId est invalide
  if (!userId || userId === "null" || userId === "undefined" || isNaN(Number(userId))) {
    return [];
  }

  return apiFetch<PropertyBase[]>(`${API_URL}/api/users/${userId}/favorites`);
}

/**
 * Ajoute ou supprime une propriété des favoris de l'utilisateur.
 *
 * @async
 * @function toggleFavorite
 * @param {string} propertyId - Identifiant de la propriété
 * @param {boolean} isFavorite - Indique si la propriété est déjà en favori
 * @returns {Promise<{ success: boolean }>} Résultat de l'opération
 */
export async function toggleFavorite(
  propertyId: string,
  isFavorite: boolean
): Promise<{ success: boolean }> {
  if (!propertyId) return { success: false };

  return apiFetch(`${API_URL}/api/properties/${propertyId}/favorite`, {
    method: isFavorite ? "DELETE" : "POST",
  });
}
