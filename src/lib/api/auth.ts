import { API_URL } from "@/lib/env";
import type { AuthResponse } from "@/types/auth";

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur de connexion");
  }

  return res.json();
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur lors de l'inscription");
  }

  return res.json();
}
