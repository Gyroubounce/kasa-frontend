import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/app/Providers";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* -------------------------------------------------------
   METADATA OPTIMISÉES (SEO minimaliste, juste web)
-------------------------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL("https://kasa-frontend-taupe.vercel.app"),

  title: {
    default: "Kasa — Locations entre particuliers",
    template: "%s | Kasa",
  },

  description:
    "Trouvez un logement chaleureux partout en France. Appartements, maisons, hébergements uniques : réservez facilement avec Kasa.",

  keywords: [
    "location",
    "logement",
    "appartement",
    "maison",
    "hébergement",
    "France",
    "Kasa",
    "voyage",
    "vacances",
  ],

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://kasa-frontend-taupe.vercel.app",
    siteName: "Kasa",
    title: "Kasa — Locations entre particuliers",
    description:
      "Trouvez un logement chaleureux partout en France. Appartements, maisons, hébergements uniques : réservez facilement avec Kasa.",
  },

  twitter: {
    card: "summary",
    title: "Kasa — Locations entre particuliers",
    description:
      "Trouvez un logement chaleureux partout en France. Appartements, maisons, hébergements uniques : réservez facilement avec Kasa.",
  },
};

/* -------------------------------------------------------
   SCHEMA.ORG GLOBAL (Organization + WebSite)
-------------------------------------------------------- */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kasa",
  url: "https://kasa-frontend-taupe.vercel.app",
  logo: "https://kasa-frontend-taupe.vercel.app/logo.png",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kasa",
  url: "https://kasa-frontend-taupe.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://kasa-frontend-taupe.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

/* -------------------------------------------------------
   ROOT LAYOUT
-------------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <a href="#main" className="skip-link">
            Aller au contenu
          </a>

          <Header />

          <main
            id="main"
            className="flex-1 flex flex-col items-center bg-light-orange"
            aria-label="Page d’accueil de Kasa"
          >
            {children}
          </main>

          <Footer />

          {/* SCHEMA.ORG GLOBAL */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteSchema),
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
