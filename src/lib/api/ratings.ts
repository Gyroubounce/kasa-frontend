import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";

export async function rateProperty(
  propertyId: string,
  rating: number
): Promise<{ success: boolean }> {
  return apiFetch(`${API_URL}/ratings`, {
    method: "POST",
    body: JSON.stringify({ propertyId, rating }),
  });
}
