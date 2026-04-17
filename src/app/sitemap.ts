import { MetadataRoute } from "next";
import type { PropertyBase } from "@/types/property";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`);
  const properties = await res.json();

  const propertyUrls = properties.map((p: PropertyBase) => ({
    url: `https://kasa.com/properties/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
    }));


  return [
    {
      url: "https://kasa.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://kasa.com/favoris",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...propertyUrls,
  ];
}
