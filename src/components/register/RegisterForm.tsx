"use client";

import Link from "next/link";

export default function RegisterForm() {
  return (
    <form className="mt-10 w-full max-w-[450px] flex flex-col gap-6">

      {/* NOM */}
      <div className="flex flex-col items-start">
        <label htmlFor="lastname" className="text-[14px] font-medium text-black mb-1">
          Nom
        </label>
        <input
          id="lastname"
          type="text"
          placeholder="Votre nom"
          className="w-full h-[40px] border border-gray-300 rounded-[8px] px-3 text-[14px]"
        />
      </div>

      {/* PRÉNOM */}
      <div className="flex flex-col items-start">
        <label htmlFor="firstname" className="text-[14px] font-medium text-black mb-1">
          Prénom
        </label>
        <input
          id="firstname"
          type="text"
          placeholder="Votre prénom"
          className="w-full h-[40px] border border-gray-300 rounded-[8px] px-3 text-[14px]"
        />
      </div>

      {/* EMAIL */}
      <div className="flex flex-col items-start">
        <label htmlFor="email" className="text-[14px] font-medium text-black mb-1">
          Adresse email
        </label>
        <input
          id="email"
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
          type="password"
          placeholder="Votre mot de passe"
          className="w-full h-[40px] border border-gray-300 rounded-[8px] px-3 text-[14px]"
        />
      </div>

      {/* CHECKBOX */}
      <label className="flex items-center gap-2 text-[14px] text-black font-normal cursor-pointer">
        <input
          type="checkbox"
          className="w-[16px] h-[16px] accent-main-red"
        />
        J’accepte les conditions générales d’utilisation
      </label>

      {/* BOUTON S'INSCRIRE */}
      <button
        type="submit"
        className="w-[230px] h-[36px] bg-main-red text-white text-[14px] font-medium rounded-[10px] mx-auto"
      >
        S&apos;inscrire
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
