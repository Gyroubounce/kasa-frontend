import Hero from "@/components/home/Hero";
import PropertyList from "@/components/home/PropertyList";
import HowItWorks from "@/components/home/HowItWorks";

export const metadata = {
  title: "Kasa – Locations d’hébergements partout en France",
  description:
    "Trouvez des logements uniques, confortables et vérifiés partout en France. Réservez facilement votre prochain séjour avec Kasa.",
  alternates: {
    canonical: "https://kasa-frontend-taupe.vercel.app/",
  },
  openGraph: {
    title: "Kasa – Locations d’hébergements partout en France",
    description:
      "Trouvez des logements uniques, confortables et vérifiés partout en France.",
    url: "https://kasa-frontend-taupe.vercel.app/",
    siteName: "Kasa",
    images: [
      {
        url: "https://kasa-frontend-taupe.vercel.app/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Kasa – Trouvez votre logement idéal",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kasa – Locations d’hébergements partout en France",
    description:
      "Trouvez des logements uniques, confortables et vérifiés partout en France.",
    images: ["https://kasa-frontend-taupe.vercel.app/og-home.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Kasa",
            url: "https://kasa-frontend-taupe.vercel.app",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://kasa-frontend-taupe.vercel.app/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Kasa",
            url: "https://kasa-frontend-taupe.vercel.app",
            logo: "https://kasa-frontend-taupe.vercel.app/logo.png",
          }),
        }}
      />

      <Hero />

      <section className="mt-16" aria-labelledby="properties-title">
        <h2 id="properties-title" className="sr-only">
          Liste des logements disponibles
        </h2>

        <div className="max-w-278.75 mx-auto">
          <PropertyList />
        </div>
      </section>

      <HowItWorks />
    </>
  );
}
