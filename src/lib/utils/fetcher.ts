import { ApiError } from "@/lib/errors/ApiError";

export async function apiFetch<T>(
  
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {

    const res = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store",
      ...options,
    });

    // Si la réponse n'est pas OK → on gère l'erreur
    if (!res.ok) {
      let message = "Erreur API";

      try {
        // Essaye de lire un JSON d'erreur
        const data = await res.json();
        message = data.error || data.message || message;
      } catch {
        // Sinon lit le texte brut
        const text = await res.text();
        if (text) message = text;
      }

      throw new ApiError(message, res.status);
    }

    // Réponse OK → JSON typé
    return res.json() as Promise<T>;
  } catch (err) {
    // Erreur réseau (pas de réponse HTTP)
    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError("Erreur réseau ou serveur", 500);
  }
}
