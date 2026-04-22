import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";

import { 
  PropertyBase, 
  PropertyDetail, 
  PropertyCreate, 
  PropertyUpdate 
} from "@/types/property";

/**
 * Récupère la liste des propriétés (version allégée).
 *
 * @async
 * @function getPropertyBase
 * @returns {Promise<PropertyBase[]>} Liste des propriétés
 * @throws {Error} Si la requête échoue
 */
export async function getPropertyBase(): Promise<PropertyBase[]> {
  return apiFetch<PropertyBase[]>(`${API_URL}/api/properties`);
}

/**
 * Récupère les détails complets d'une propriété.
 *
 * @async
 * @function getPropertyDetail
 * @param {string} id - Identifiant de la propriété
 * @returns {Promise<PropertyDetail>} Détails complets de la propriété
 * @throws {Error} Si la requête échoue
 */
export async function getPropertyDetail(id: string): Promise<PropertyDetail> {
  return apiFetch<PropertyDetail>(`${API_URL}/api/properties/${id}`);
}

/**
 * Crée une nouvelle propriété.
 *
 * @async
 * @function createProperty
 * @param {PropertyCreate} data - Données de création de la propriété
 * @returns {Promise<PropertyDetail>} Propriété créée
 * @throws {Error} Si la requête échoue
 */
export async function createProperty(
  data: PropertyCreate
): Promise<PropertyDetail> {
  return apiFetch<PropertyDetail>(`${API_URL}/api/properties`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Met à jour une propriété existante.
 *
 * @async
 * @function updateProperty
 * @param {string} id - Identifiant de la propriété
 * @param {PropertyUpdate} data - Données à mettre à jour
 * @returns {Promise<PropertyDetail>} Propriété mise à jour
 * @throws {Error} Si la requête échoue
 */
export async function updateProperty(
  id: string,
  data: PropertyUpdate
): Promise<PropertyDetail> {
  return apiFetch<PropertyDetail>(`${API_URL}/api/properties/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
