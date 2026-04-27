import { ApiError } from "@/lib/errors/ApiError";

/**
 * Effectue une requête HTTP avec gestion avancée des erreurs
 * et envoie automatiquement le cookie HTTP-only grâce à `credentials: "include"`.
 *
 * ⚠️ IMPORTANT :
 * - Ne PAS envoyer `Content-Type: application/json` sur les requêtes GET.
 *   Cela déclenche un preflight CORS strict et bloque les cookies sur Vercel.
 * - Ce fetcher corrige ce problème en appliquant `Content-Type` uniquement
 *   sur les requêtes non-GET.
 *
 * @template T
 * @async
 * @function apiFetch
 * @param {string} endpoint - URL complète de l'endpoint API
 * @param {RequestInit} [options={}] - Options fetch supplémentaires
 * @returns {Promise<T>} Réponse JSON typée
 * @throws {ApiError} Si la requête échoue ou si le backend renvoie une erreur
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const method = options.method?.toUpperCase() || "GET";
    const isGet = method === "GET";

    const res = await fetch(endpoint, {
      ...options,
      credentials: "include", // ⭐ Obligatoire pour envoyer le cookie HTTP-only
      headers: isGet
        ? options.headers // ❗ PAS de Content-Type sur GET
        : {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
      cache: "no-store",
    });

    if (!res.ok) {
      let message = "Erreur API";

      try {
        const data = await res.json();
        message = data.error || data.message || message;
      } catch {
        const text = await res.text();
        if (text) message = text;
      }

      throw new ApiError(message, res.status);
    }

    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError("Erreur réseau ou serveur", 500);
  }
}
