import { ApiError } from "@/lib/errors/ApiError";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
   

    const res = await fetch(endpoint, {
      ...options,
      credentials: "include", // ⭐ OBLIGATOIRE POUR ENVOYER LE COOKIE HTTP-ONLY
      headers: {
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

    const json = await res.json();


    return json as T;
  } catch (err) {
 

    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError("Erreur réseau ou serveur", 500);
  }
}
