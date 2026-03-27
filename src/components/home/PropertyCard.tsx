import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types/property";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/property/${property.id}`}
      className="block rounded-xl overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="relative w-full h-[200px]">
        <Image
          src={property.cover}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{property.title}</h3>
        <p className="text-gray-dark text-sm">{property.location}</p>
      </div>
    </Link>
  );
}
