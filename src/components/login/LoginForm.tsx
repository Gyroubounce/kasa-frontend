"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL } from "@/lib/env";
import type { ApiError, AuthResponse } from "@/types/auth";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: AuthResponse | ApiError = await res.json();

        if (!res.ok) {
        const errorData = data as ApiError;
        setError(errorData.message || "Identifiants incorrects.");
        return;
}
      const auth = data as AuthResponse;

      // Stocker token + user
      localStorage.setItem("token", auth.token);
      localStorage.setItem("user", JSON.stringify(auth.user));

      router.push("/"); // redirection après connexion

    } catch {
      setError("Impossible de contacter le serveur.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 w-full max-w-[450px] flex flex-col gap-6">

      {error && (
        <p className="text-red-600 text-[14px] font-medium text-center">{error}</p>
      )}

      {/* EMAIL */}
      <div className="flex flex-col items-start">
        <label htmlFor="email" className="text-[14px] font-medium text-black mb-1">
          Adresse email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Votre email"
          className="w-full h-[40px] border border-gray-300 rounded-[8px] px-3 text-[14px]"
        />
      </div>

      {/* MOT DE PASSE */}
      <div className="flex flex-col items-start">
        <label htmlFor="password" className="text-[14px] font-medium text-black mb-1">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Votre mot de passe"
          className="w-full h-[40px] border border-gray-300 rounded-[8px] px-3 text-[14px]"
        />
      </div>

      {/* BOUTON */}
      <button
        type="submit"
        className="w-[230px] h-[36px] bg-main-red text-white text-[14px] font-medium rounded-[10px] mx-auto"
      >
        Se connecter
      </button>

      <p className="mt-4 text-[14px] text-black font-normal mx-auto">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-main-red font-normal">
          Inscrivez-vous
        </Link>
      </p>
    </form>
  );
}
