import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";

import { 
  PropertyBase, 
  PropertyDetail, 
  PropertyCreate, 
  PropertyUpdate 
} from "@/types/property";

/* ----------------------------------------------------
 * GET — Liste des propriétés (PropertyBase[])
 * ---------------------------------------------------- */
export async function getPropertyBase(): Promise<PropertyBase[]> {
  return apiFetch<PropertyBase[]>(`${API_URL}/api/properties`);
}

/* ----------------------------------------------------
 * GET — Détail d'une propriété (PropertyDetail)
 * ---------------------------------------------------- */
export async function getPropertyDetail(id: string): Promise<PropertyDetail> {
  return apiFetch<PropertyDetail>(`${API_URL}/api/properties/${id}`);
}

/* ----------------------------------------------------
 * POST — Création d'une propriété (PropertyCreate)
 * ---------------------------------------------------- */
export async function createProperty(
  data: PropertyCreate
): Promise<PropertyDetail> {
  return apiFetch<PropertyDetail>(`${API_URL}api//properties`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}


/* ----------------------------------------------------
 * PATCH — Mise à jour d'une propriété (PropertyUpdate)
 * ---------------------------------------------------- */
export async function updateProperty(
  id: string,
  data: PropertyUpdate
): Promise<PropertyDetail> {
  return apiFetch<PropertyDetail>(`${API_URL}/api/properties/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
