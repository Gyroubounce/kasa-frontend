import { API_URL } from "@/lib/env";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {


  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include", // ⭐ OBLIGATOIRE POUR ENVOYER LE COOKIE
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });


  if (!res.ok) {
    let message = "Erreur API";

    try {
      const error = await res.json();
     
      message = error.message || message;
    } catch {
      
    }

    throw new Error(message);
  }

  const json = await res.json();
  

  return json;
}
