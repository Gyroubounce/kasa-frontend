import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";
import { Property } from "@/types/property";

export async function getAllProperties(): Promise<Property[]> {
  return apiFetch<Property[]>(`${API_URL}/properties`);
}

export async function getPropertyById(id: string): Promise<Property> {
  return apiFetch<Property>(`${API_URL}/properties/${id}`);
}
