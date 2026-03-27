import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-main-red font-bold text-8xl md:text-[200px] leading-none">
        404
      </h1>

      <p className="text-gray-dark text-lg md:text-2xl mt-6">
        Oups! La page que vous demandez n&apos;existe pas.
      </p>

      <Link
        href="/"
        className="mt-10 text-main-red underline text-base md:text-lg hover:opacity-80 transition"
      >
        Retourner sur la page d’accueil
      </Link>
    </main>
  );
}
