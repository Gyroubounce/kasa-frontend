import { API_URL } from "@/lib/env";
import { apiFetch } from "@/lib/utils/fetcher";
import { User } from "@/types/user";

export async function login(email: string, password: string): Promise<User> {
  return apiFetch<User>(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(email: string, password: string): Promise<User> {
  return apiFetch<User>(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
