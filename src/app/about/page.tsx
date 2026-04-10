import Image from "next/image";
import About_01 from "@/../public/images/About_01.png";
import About_02 from "@/../public/images/About_02.png";

export default function AboutPage() {
  return (
    <article className="w-full bg-light-orange">
      {/* CONTAINER GLOBAL */}
      <div className="w-full max-w-89.5 md:max-w-278.75 mx-auto py-8">

        {/* SECTION 1 — TITRE + TEXTE */}
        <section>
          <h1 className="text-[32px] text-center font-bold text-main-red">
            À propos
          </h1>

          <p className="max-w-185.5 mt-1 text-[14px] mx-auto text-center font-normal text-black leading-relaxed">
            Chez Kasa, nous croyons que chaque voyage<br className="block md:hidden" /> mérite un lieu unique où se sentir bien.
            <span className="block h-3"></span>
            Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité
            avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.
          </p>

        </section>

        {/* SECTION 2 — IMAGE LARGE */}
        <section className="mt-9 px-0 md:px-4 lg:px-0">
        <Image
          src={About_01}
          alt="Illustration Kasa"
          width={1115}
          height={458}
          className="w-full h-114.5 object-cover rounded-20"
          priority
        />

        </section>

        {/* SECTION 3 — BLOC 2 COLONNES */}
      <section className="max-w-89.5 mx-auto lg:max-w-278.75 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* COLONNE GAUCHE */}
          <div className="w-full lg:w-151.5 mx-auto flex flex-col justify-center">

            <h2 className="text-[18px] font-bold text-main-red order-1">
              Notre mission est simple :
            </h2>

            <ul className="mt-4 space-y-4 text-[14px] text-black font-normal leading-relaxed order-2">
              <li>1. Offrir une plateforme fiable et simple d’utilisation</li>
              <li>2. Proposer des hébergements variés et de qualité</li>
              <li>3. Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
            </ul>

            {/* IMAGE — placée avant le paragraphe en mobile */}
            <div className="order-3 lg:hidden mt-6">
              <Image
                src={About_02}
                alt="Illustration Kasa"
                width={494}
                height={458}
                className="w-full h-auto object-cover rounded-20"
              />
            </div>

            {/* PARAGRAPHE */}
            <p className="mt-6 text-[18px] font-medium text-main-red leading-relaxed order-4">
              Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer
              ou un chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne
              un souvenir inoubliable.
            </p>
          </div>

          {/* COLONNE DROITE — IMAGE (desktop only) */}
          <div className="hidden lg:block">
            <Image
              src={About_02}
              alt="Illustration d'une maison Kasa"
              width={494}
              height={458}
              className="w-123.5 ml-auto h-auto object-cover rounded-20"
            />
          </div>

        </section>


      </div>
    </article>
  );
}
