import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full flex justify-center items-center py-20">
      <div className="w-[342px] h-[343px] flex flex-col items-center text-center">

        {/* 404 */}
        <h1 className="text-[100px] font-black text-main-red leading-none">
          404
        </h1>

        {/* TEXTE */}
        <p className="mt-4 text-[14px] font-normal text-black leading-relaxed">
          Il semble que la page que vous cherchez ait pris des vacances…<br />
          ou n’ait jamais existé.
        </p>

        {/* BOUTONS */}
        <div className="mt-8 flex flex-col gap-4 w-full items-center">

          {/* BTN ACCUEIL */}
          <Link
            href="/"
            className="w-[200px] h-[38px] bg-main-red text-white text-[14px] font-medium rounded-[10px] flex items-center justify-center"
          >
            Accueil
          </Link>

          {/* BTN LOGEMENTS */}
          <Link
            href="/properties"
            className="w-[200px] h-[38px] border border-main-red text-main-red text-[14px] font-medium rounded-[10px] flex items-center justify-center"
          >
            Logements
          </Link>

        </div>
      </div>
    </main>
  );
}
