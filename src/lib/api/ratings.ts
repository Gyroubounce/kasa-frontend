import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";
import { Rating, RatingCreate } from "@/types/Rating";

/**
 * Crée ou met à jour une note pour une propriété.
 *
 * @async
 * @function rateProperty
 * @param {string} propertyId - Identifiant de la propriété
 * @param {RatingCreate} payload - Données de notation (score, userId)
 * @returns {Promise<Rating>} Note créée ou mise à jour
 * @throws {Error} Si la requête échoue
 */
export async function rateProperty(
  propertyId: string,
  payload: RatingCreate
): Promise<Rating> {
  return apiFetch<Rating>(`${API_URL}/api/properties/${propertyId}/ratings`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
