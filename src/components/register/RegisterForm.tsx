"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { register, error } = useAuthContext();

  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // 🔐 Validation frontend du mot de passe
  function validatePassword(password: string): string | null {
    if (password.length < 8) {
      return "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (!/[A-Z]/.test(password)) {
      return "Le mot de passe doit contenir au moins une lettre majuscule";
    }
    if (!/[a-z]/.test(password)) {
      return "Le mot de passe doit contenir au moins une lettre minuscule";
    }
    if (!/[0-9]/.test(password)) {
      return "Le mot de passe doit contenir au moins un chiffre";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)";
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setLocalError(null);

    const form = e.target as HTMLFormElement;

    const lastname = (form.elements.namedItem("lastname") as HTMLInputElement).value;
    const firstname = (form.elements.namedItem("firstname") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const fullName = `${firstname} ${lastname}`.trim();

    // 🔥 Vérification du mot de passe AVANT l'appel API
    const passwordError = validatePassword(password);
    if (passwordError) {
      setLocalError(passwordError);
      setSubmitting(false);
      return;
    }

    try {
      await register(fullName, email, password);
      router.push("/");
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 pb-2 w-full max-w-81.5 md:max-w-90 flex flex-col gap-5"
    >
      {/* MESSAGE D'ERREUR BACKEND OU FRONTEND */}
      {(error || localError) && (
        <p className="text-red-600 text-[14px] font-medium text-center">
          {localError || error}
        </p>
      )}

      {/* NOM */}
      <div className="flex flex-col items-start">
        <label htmlFor="lastname" className="text-[14px] font-medium text-black mb-1">
          Nom
        </label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          className="w-full h-10 border border-gray-light rounded-8 px-3 text-[14px]"
          required
        />
      </div>

      {/* PRÉNOM */}
      <div className="flex flex-col items-start">
        <label htmlFor="firstname" className="text-[14px] font-medium text-black mb-1">
          Prénom
        </label>
        <input
          id="firstname"
          name="firstname"
          type="text"
          className="w-full h-10 border border-gray-light rounded-8 px-3 text-[14px]"
          required
        />
      </div>

      {/* EMAIL */}
      <div className="flex flex-col items-start">
        <label htmlFor="email" className="text-[14px] font-medium text-black mb-1">
          Adresse email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full h-10 border border-gray-light rounded-8 px-3 text-[14px]"
          required
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
          className="w-full h-10 border border-gray-light rounded-8 px-3 text-[14px]"
          required
        />
      </div>

      {/* CHECKBOX */}
      <label className="flex items-center gap-2 text-[12px] text-gray-dark font-normal ml-4 mt-2">
        <input
          type="checkbox"
          className="w-3 h-3 accent-main-red text-gray-dark"
          required
        />

        <span className="text-[12px] text-gray-dark font-normal ml-1">
          J’accepte les{" "}
          <a
            href="/conditions-generales"
            className="underline underline-offset-2 text-gray-dark hover:text-dark-orange transition-colors"
          >
            conditions générales d’utilisation
          </a>
        </span>
      </label>

      {/* BOUTON S'INSCRIRE */}
      <button
        type="submit"
        disabled={submitting}
        className="w-57.5 h-9 bg-main-red text-white text-[14px] font-medium rounded-10 mx-auto mt-4 hover:bg-dark-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Inscription..." : "S'inscrire"}
      </button>

      {/* DÉJÀ MEMBRE */}
      <p className="text-[14px] text-main-red font-normal mx-auto">
        Déjà membre ?{" "}
        <Link href="/login" className="text-main-red font-medium hover:text-dark-orange transition-colors">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
