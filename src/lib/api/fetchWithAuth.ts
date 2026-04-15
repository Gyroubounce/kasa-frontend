import { API_URL } from "@/lib/env";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  console.log("🔵 fetchWithAuth → appel :", endpoint);

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include", // ⭐ OBLIGATOIRE POUR ENVOYER LE COOKIE
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  console.log("📥 fetchWithAuth → status :", res.status);

  if (!res.ok) {
    let message = "Erreur API";

    try {
      const error = await res.json();
      console.log("🔴 fetchWithAuth → erreur JSON :", error);
      message = error.message || message;
    } catch {
      console.log("🔴 fetchWithAuth → erreur sans JSON");
    }

    throw new Error(message);
  }

  const json = await res.json();
  console.log("🟢 fetchWithAuth → JSON :", json);

  return json;
}
