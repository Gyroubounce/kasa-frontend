import { getPropertyDetail } from "@/lib/api/properties";
import Carousel from "@/components/property/Carousel";
import HostCard from "@/components/property/HostCard";

import { notFound } from "next/navigation";
import { BackButton } from "@/components/messaging/BackButton";
import type { PropertyDetail } from "@/types/property";

/* -------------------------------------------------------
   METADATA DYNAMIQUE — SEO + Canonical + OpenGraph
-------------------------------------------------------- */
export async function generateMetadata({ params }: { params: { id: string } }) {
 
     const { id } = await params; // ✔ obligatoire dans Turbopack

  try {
    const property = await getPropertyDetail(id);

    return {
      title: `${property.title} – Kasa`,
      description: property.description,
      alternates: {
        canonical: `https://kasa-frontend-taupe.vercel.app/properties/${property.id}`,
      },
      openGraph: {
        title: property.title,
        description: property.description,
        url: `https://kasa-frontend-taupe.vercel.app/properties/${property.id}`,
        siteName: "Kasa",
        images: property.pictures,
        locale: "fr_FR",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: property.title,
        description: property.description,
        images: property.pictures,
      },
    };
  } catch { 
  
   return null;
  }
}


export default async function PropertyPage({ params }: { params: { id: string } }) {
  // ✔ Tu veux garder await → je le garde
  const { id } = await params;

  let property: PropertyDetail;

  try {
    property = await getPropertyDetail(id);
  } catch {
    notFound();
  }

  /* -------------------------------------------------------
     SCHEMA.ORG DYNAMIQUE — construit AVANT le return
  -------------------------------------------------------- */
  const apartmentSchema = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: property.title,
    description: property.description,
    url: `https://kasa-frontend-taupe.vercel.app/properties/${property.id}`,
    image: property.pictures,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location,
      addressCountry: "FR",
    },
  };

  const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://kasa-frontend-taupe.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Propriétés",
          item: "https://kasa-frontend-taupe.vercel.app/properties",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: property.title,
          item: `https://kasa-frontend-taupe.vercel.app/properties/${property.id}`,
        },
      ],
    };

  return (
    <>
         {/* SCHEMA.ORG — APARTMENT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(apartmentSchema),
        }}
      />

      {/* SCHEMA.ORG — BREADCRUMB */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* CONTENU DE LA PAGE */}
      <article className="w-89.5 md:w-242.75 h-auto mx-auto md:mt-20">
        <BackButton to="/" label="Retour aux annonces" />

        <div className="mt-2 md:mt-10 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Carousel pictures={property.pictures} />
          </div>

          <div className="hidden md:block w-86.25">
            <HostCard property={property} />
          </div>
        </div>

        <div className="bg-white w-89.5 md:w-154 rounded-10 mt-6 md:py-6">
          <h1 className="text-[24px] font-medium">{property.title}</h1>
          <p className="text-[14px] mt-3 text-gray-600">{property.location}</p>

          <p className="mt-7 text-[14px]">{property.description}</p>

          <h2 className="mt-8 text-[14px] font-medium">Équipements</h2>
          <div className="grid grid-cols-3 gap-2 w-79 mt-5">
            {property.equipments.map((eq, i) => (
              <span
                key={i}
                className="text-[12px] rounded-5 w-25 h-8.25 bg-gray-light text-gray-dark flex items-center justify-center"
              >
                {eq}
              </span>
            ))}
          </div>

          <h2 className="mt-6 text-[14px] font-medium">Catégorie</h2>
          <div className="flex gap-2 mt-2">
            {property.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[12px] bg-gray-light text-gray-dark rounded-5 px-3 py-2"
              >
                {tag}
              </span>
            ))}
          </div>

         
          <div className="md:hidden mt-8">
            <HostCard property={property} />
          </div>
        </div>
      </article>
    </>
  );
}
