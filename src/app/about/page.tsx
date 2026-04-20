import Image from "next/image";
import About_01 from "@/../public/images/About_01.png";
import About_02 from "@/../public/images/About_02.png";

export const metadata = {
  title: "À propos – Kasa",
  description:
    "Découvrez l’histoire, les valeurs et la mission de Kasa, plateforme de location d’hébergements entre particuliers.",
  alternates: {
    canonical: "https://kasa-frontend-taupe.vercel.app/about",
  },
  openGraph: {
    title: "À propos – Kasa",
    description:
      "Découvrez l’histoire, les valeurs et la mission de Kasa.",
    url: "https://kasa-frontend-taupe.vercel.app/about",
    siteName: "Kasa",
    images: [
      {
        url: "https://kasa-frontend-taupe.vercel.app/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "À propos de Kasa",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos – Kasa",
    description:
      "Découvrez l’histoire, les valeurs et la mission de Kasa.",
    images: ["https://kasa-frontend-taupe.vercel.app/og-about.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD AboutPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "À propos de Kasa",
            url: "https://kasa-frontend-taupe.vercel.app/about",
            mainEntity: {
              "@type": "Organization",
              name: "Kasa",
              url: "https://kasa-frontend-taupe.vercel.app",
              logo: "https://kasa-frontend-taupe.vercel.app/logo.png",
              description:
                "Kasa est une plateforme de location d’hébergements entre particuliers.",
              sameAs: [
                "https://www.facebook.com/",
                "https://www.instagram.com/",
                "https://www.linkedin.com/",
              ],
            },
          }),
        }}
      />

      {/* CONTENU DE LA PAGE */}
      <article className="w-full bg-light-orange">
        <div className="w-full max-w-89.5 md:max-w-278.75 mx-auto py-8">
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

          <section className="max-w-89.5 mx-auto lg:max-w-278.75 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="w-full lg:w-151.5 mx-auto flex flex-col justify-center">
              <h2 className="text-[18px] font-bold text-main-red order-1">
                Notre mission est simple :
              </h2>

              <ul className="mt-4 space-y-4 text-[14px] text-black font-normal leading-relaxed order-2">
                <li>1. Offrir une plateforme fiable et simple d’utilisation</li>
                <li>2. Proposer des hébergements variés et de qualité</li>
                <li>3. Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
              </ul>

              <div className="order-3 lg:hidden mt-6">
                <Image
                  src={About_02}
                  alt="Illustration Kasa"
                  width={494}
                  height={458}
                  className="w-full h-auto object-cover rounded-20"
                />
              </div>

              <p className="mt-6 text-[18px] font-medium text-main-red leading-relaxed order-4">
                Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer
                ou un chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne
                un souvenir inoubliable.
              </p>
            </div>

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
    </>
  );
}
