"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login, error } = useAuthContext();

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      await login(email, password);
      router.push("/");
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-[450px] flex flex-col gap-6"
    >
      {/* MESSAGE D'ERREUR */}
      {error && (
        <p className="text-red-600 text-[14px] font-medium text-center">
          {error}
        </p>
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
        disabled={submitting}
        className="w-[230px] h-[36px] bg-main-red text-white text-[14px] font-medium rounded-[10px] mx-auto disabled:opacity-50"
      >
        {submitting ? "Connexion..." : "Se connecter"}
      </button>

      {/* LIEN INSCRIPTION */}
      <p className="mt-4 text-[14px] text-black font-normal mx-auto">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-main-red font-normal">
          Inscrivez-vous
        </Link>
      </p>
    </form>
  );
}
