"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { register, error } = useAuthContext();

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target as HTMLFormElement;

    const lastname = (form.elements.namedItem("lastname") as HTMLInputElement).value;
    const firstname = (form.elements.namedItem("firstname") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    // Ton backend attend un champ "name"
    const fullName = `${firstname} ${lastname}`.trim();

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
      className="mt-10 w-full max-w-[450px] flex flex-col gap-6"
    >
      {/* MESSAGE D'ERREUR */}
      {error && (
        <p className="text-red-600 text-[14px] font-medium text-center">
          {error}
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
          placeholder="Votre nom"
          className="w-full h-[40px] border border-gray-300 rounded-[8px] px-3 text-[14px]"
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
          placeholder="Votre prénom"
          className="w-full h-[40px] border border-gray-300 rounded-[8px] px-3 text-[14px]"
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
          placeholder="Votre email"
          className="w-full h-[40px] border border-gray-300 rounded-[8px] px-3 text-[14px]"
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
          placeholder="Votre mot de passe"
          className="w-full h-[40px] border border-gray-300 rounded-[8px] px-3 text-[14px]"
          required
        
        />
      </div>

      {/* CHECKBOX */}
      <label className="flex items-center gap-2 text-[14px] text-black font-normal cursor-pointer">
        <input
          type="checkbox"
          className="w-[16px] h-[16px] accent-main-red"
          required
        />
        J’accepte les conditions générales d’utilisation
      </label>

      {/* BOUTON S'INSCRIRE */}
      <button
        type="submit"
        disabled={submitting}
        className="w-[230px] h-[36px] bg-main-red text-white text-[14px] font-medium rounded-[10px] mx-auto disabled:opacity-50"
      >
        {submitting ? "Inscription..." : "S'inscrire"}
      </button>

      {/* DÉJÀ MEMBRE */}
      <p className="mt-4 text-[14px] text-black font-normal mx-auto">
        Déjà membre ?{" "}
        <Link href="/login" className="text-main-red font-normal">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
