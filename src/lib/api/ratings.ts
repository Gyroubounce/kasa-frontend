import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";
import { Rating, RatingCreate } from "@/types/Rating";

export async function rateProperty(
  propertyId: string,
  payload: RatingCreate
): Promise<Rating> {
  return apiFetch<Rating>(`${API_URL}/properties/${propertyId}/ratings`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
