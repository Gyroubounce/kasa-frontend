import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/app/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Kasa — Locations entre particuliers",
  description: "Trouvez un logement chaleureux, partout en France.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable}`}>
      <body>
        <Providers>
          <a href="#main" className="skip-link">Aller au contenu</a>

          <Header />

          <main id="main" className="flex flex-col items-center bg-light-orange"
          aria-label="Page d’accueil de Kasa">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
