"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-[24px] font-semibold text-main-red">Accès refusé</h1>
      <p className="mt-2 text-[14px] text-gray-dark max-w-75">
        Vous devez être propriétaire pour ajouter une propriété.
      </p>

      <Link
        href="/"
        className="mt-4 text-main-red underline underline-offset-2"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
