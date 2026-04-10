import { getPropertyDetail } from "@/lib/api/properties";
import Carousel from "@/components/property/Carousel";
import HostCard from "@/components/property/HostCard";
import RatingList from "@/components/property/RatingList";

import { notFound } from "next/navigation";
import { BackButton } from "@/components/messaging/BackButton";

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  let property;

  try {
    property = await getPropertyDetail(id); // 🟦 CORRECTION ICI
  
  } catch {
    notFound();
  }

  return (
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
            <span key={i} className="text-[12px] rounded-5 w-25 h-8.25 bg-gray-light text-gray-dark  flex items-center justify-center">
              {eq}
            </span>
          ))}
        </div>

        <h2 className="mt-6 text-[14px] font-medium">Catégorie</h2>
        <div className="flex gap-2 mt-2">
          {property.tags.map((tag, i) => (
            <span key={i} className="text-[12px] bg-gray-light text-gray-dark rounded-5 px-3 py-2">
              {tag}
            </span>
          ))}
        </div>
      

        <h2 className="mt-6 text-[14px] font-medium">Avis</h2>
        <RatingList ratings={property.ratings ?? []} />

        <div className="md:hidden mt-8">
          <HostCard property={property} />
        </div>

      </div>
    </article>
  );
}
