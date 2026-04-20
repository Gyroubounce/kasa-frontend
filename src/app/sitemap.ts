import { MetadataRoute } from "next";
import type { PropertyBase } from "@/types/property";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`, {
    next: { revalidate: 60 },
  });

  const properties = await res.json();

  const propertyUrls = properties.map((p: PropertyBase) => ({
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
    ...propertyUrls,
  ];
}
