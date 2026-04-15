import { ApiError } from "@/lib/errors/ApiError";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    console.log("📡 apiFetch → appel :", {
      endpoint,
      method: options.method || "GET",
    });

    const res = await fetch(endpoint, {
      ...options,
      credentials: "include", // ⭐ OBLIGATOIRE POUR ENVOYER LE COOKIE HTTP-ONLY
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store",
    });

    console.log("📥 apiFetch → réponse brute :", res.status, res.statusText);

    if (!res.ok) {
      let message = "Erreur API";

      try {
        const data = await res.json();
        console.log("⚠️ apiFetch → erreur JSON :", data);
        message = data.error || data.message || message;
      } catch {
        const text = await res.text();
        console.log("⚠️ apiFetch → erreur TEXT :", text);
        if (text) message = text;
      }

      throw new ApiError(message, res.status);
    }

    const json = await res.json();
    console.log("✅ apiFetch → réponse JSON :", json);

    return json as T;
  } catch (err) {
    console.log("💥 apiFetch → exception attrapée :", err);

    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError("Erreur réseau ou serveur", 500);
  }
}
