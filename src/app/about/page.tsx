import Image from "next/image";
import About_01 from "@/../public/images/About_01.png";
import About_02 from "@/../public/images/About_02.png";

export default function AboutPage() {
  return (
    <main className="w-full bg-light-orange">
      {/* CONTAINER GLOBAL */}
      <div className="w-full max-w-[1115px] mx-auto px-4 py-12">

        {/* SECTION 1 — TITRE + TEXTE */}
        <section>
          <h1 className="text-[32px] text-center font-bold text-main-red">
            À propos
          </h1>

          <p className="mt-4 text-[14px] text-center font-normal text-black leading-relaxed">
            Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.
            <br /><br />
            Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité
            avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.
          </p>
        </section>

        {/* SECTION 2 — IMAGE LARGE */}
        <section className="mt-12">
        <Image
          src={About_01}
          alt="Illustration Kasa"
          width={1115}
          height={458}
          className="w-full h-[458px] object-cover rounded-[20px]"
          priority
        />

        </section>

        {/* SECTION 3 — BLOC 2 COLONNES */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* COLONNE GAUCHE */}
          <div className="flex flex-col justify-between">

            <h2 className="text-[18px] font-bold text-main-red">
              Notre mission est simple :
            </h2>

            <ul className="mt-4 space-y-3 text-[14px] text-black font-normal leading-relaxed">
              <li>1. Offrir une plateforme fiable et simple d’utilisation</li>
              <li>2. Proposer des hébergements variés et de qualité</li>
              <li>3. Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
            </ul>

            <p className="mt-6 text-[18px] font-medium text-main-red leading-relaxed">
              Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer
              ou un chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne
              un souvenir inoubliable.
            </p>
          </div>

          {/* COLONNE DROITE — IMAGE */}
          <div>
            <Image
              src={About_02}
              alt="Illustration Kasa"
              width={494}
              height={458}
              className="w-full h-[458px] object-cover rounded-[20px]"
            />

          </div>

        </section>
      </div>
    </main>
  );
}
