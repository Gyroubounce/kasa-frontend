console.log("🔥 SITEMAP FICHIER CHARGÉ");

import { MetadataRoute } from "next";
import type { PropertyBase } from "@/types/property";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log("🛰️ [SITEMAP] Génération du sitemap…");
  console.log("🌍 API utilisée :", process.env.NEXT_PUBLIC_API_URL);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
      next: { revalidate: 60 },
    });

    console.log("📡 [SITEMAP] Status API :", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ [SITEMAP] Erreur API :", text);
      return [];
    }

    const properties: PropertyBase[] = await res.json();
    console.log("📦 [SITEMAP] Nombre de propriétés :", properties.length);

    const propertyUrls = properties.map((p) => ({
      url: `https://kasa-frontend-taupe.vercel.app/properties/${p.id}`,
      lastModified: new Date().toISOString(),
    }));

    return [
      {
        url: "https://kasa-frontend-taupe.vercel.app",
        lastModified: new Date().toISOString(),
      },
      {
        url: "https://kasa-frontend-taupe.vercel.app/favorites",
        lastModified: new Date().toISOString(),
      },
      {
        url: "https://kasa-frontend-taupe.vercel.app/properties",
        lastModified: new Date().toISOString(),
      },
      {
        url: "https://kasa-frontend-taupe.vercel.app/about",
        lastModified: new Date().toISOString(),
      },
      {
        url: "https://kasa-frontend-taupe.vercel.app/contact",
        lastModified: new Date().toISOString(),
      },
      {
        url: "https://kasa-frontend-taupe.vercel.app/legal",
        lastModified: new Date().toISOString(),
      },
      {
        url: "https://kasa-frontend-taupe.vercel.app/privacy-policy",
        lastModified: new Date().toISOString(),
      },
      ...propertyUrls,
    ];
  } catch (err) {
    console.error("🔥 [SITEMAP] Exception attrapée :", err);
    return [];
  }
}
