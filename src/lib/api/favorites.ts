import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";
import { Favorite } from "@/types/favorites";

/**
 * Récupère la liste des favoris d'un utilisateur.
 *
 * @async
 * @function getFavorites
 * @param {string} userId - Identifiant de l'utilisateur
 * @returns {Promise<Favorite[]>} Liste des propriétés favorites
 * @throws {Error} Si la requête échoue
 */
export async function getFavorites(userId: string): Promise<Favorite[]> {
  return apiFetch<Favorite[]>(`${API_URL}/api/users/${userId}/favorites`);
}

/**
 * Ajoute ou supprime une propriété des favoris de l'utilisateur.
 *
 * @async
 * @function toggleFavorite
 * @param {string} propertyId - Identifiant de la propriété
 * @param {boolean} isFavorite - Indique si la propriété est déjà en favori
 * @returns {Promise<{ success: boolean }>} Résultat de l'opération
 * @throws {Error} Si la requête échoue
 */
export async function toggleFavorite(
  propertyId: string,
  isFavorite: boolean
): Promise<{ success: boolean }> {
  return apiFetch(`${API_URL}/api/properties/${propertyId}/favorite`, {
    method: isFavorite ? "DELETE" : "POST",
  });
}
