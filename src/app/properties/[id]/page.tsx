import { getPropertyDetail } from "@/lib/api/properties";
import Carousel from "@/components/property/Carousel";
import HostCard from "@/components/property/HostCard";
import RatingList from "@/components/property/RatingList";

import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  let property;

  try {
    property = await getPropertyDetail(id); // 🟦 CORRECTION ICI
  
  } catch {
    notFound();
  }

  return (
    <main className="w-[971px] mx-auto mt-10" role="main">
      <Link
        href="/"
        aria-label="Retour aux annonces"
        className="flex items-center gap-2 w-[189px] h-[36px] bg-gray-100 rounded-[10px] px-3 text-gray-700 text-[14px] font-medium"
      >
        <span aria-hidden="true" className="text-black text-[12px]">‹</span>
        Retour aux annonces
      </Link>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <Carousel pictures={property.pictures} />
        </div>

        <div className="hidden md:block w-[345px]">
          <HostCard property={property} />
        </div>
      </div>

      <h1 className="mt-6 text-[24px] font-medium">{property.title}</h1>
      <p className="text-[14px] text-gray-600">{property.location}</p>

      <p className="mt-4 text-[14px]">{property.description}</p>

      <h2 className="mt-6 text-[14px] font-medium">Équipements</h2>
      <div className="grid grid-cols-3 gap-2 w-[316px] mt-2">
        {property.equipments.map((eq, i) => (
          <span key={i} className="text-[12px] border rounded-[5px] h-[33px] flex items-center justify-center">
            {eq}
          </span>
        ))}
      </div>

      <h2 className="mt-6 text-[14px] font-medium">Catégorie</h2>
      <div className="flex gap-2 mt-2">
        {property.tags.map((tag, i) => (
          <span key={i} className="text-[12px] border rounded-[5px] px-3 py-2">
            {tag}
          </span>
        ))}
      </div>

      <h2 className="mt-6 text-[14px] font-medium">Avis</h2>
      <RatingList ratings={property.ratings ?? []} />

      <div className="md:hidden mt-8">
        <HostCard property={property} />
      </div>
    </main>
  );
}
