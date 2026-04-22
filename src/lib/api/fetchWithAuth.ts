import { API_URL } from "@/lib/env";

/**
 * Effectue une requête HTTP authentifiée en envoyant automatiquement
 * le cookie HTTP-only grâce à `credentials: "include"`.
 *
 * @async
 * @function fetchWithAuth
 * @param {string} endpoint - Chemin de l'endpoint API (ex: "/api/properties")
 * @param {RequestInit} [options={}] - Options fetch supplémentaires
 * @returns {Promise<any>} Réponse JSON du backend
 * @throws {Error} Si la requête échoue ou si le backend renvoie une erreur
 */
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
    } catch {}

    throw new Error(message);
  }

  return res.json();
}
