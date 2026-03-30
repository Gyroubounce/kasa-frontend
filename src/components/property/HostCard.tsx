import Image from "next/image";
import { PropertyDetail } from "@/types/property";

export default function HostCard({ property }: { property: PropertyDetail }) {
  return (
    <div className="w-[345px] h-[281px] border border-gray-300 rounded-[10px] p-4 bg-white">
      <h3 className="text-[16px] font-medium text-black">Votre hôte</h3>

      <div className="flex items-center gap-3 mt-3">
        <div className="relative w-[82px] h-[82px] rounded-[10px] overflow-hidden">
          <Image
            src={property.host.picture ?? "/images/default-avatar.png"}
            alt={property.host.name}
            fill
            sizes="82px"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-[14px] font-medium">{property.host.name}</p>
          <p className="text-main-red text-[14px] font-medium">
            ★ {property.rating_avg}
          </p>

        </div>
      </div>

      <button className="mt-4 w-[297px] h-[36px] bg-main-red text-white rounded-[5px] text-[14px] font-medium">
        Contacter l’hôte
      </button>

      <button className="mt-2 w-[297px] h-[36px] border border-main-red text-main-red rounded-[5px] text-[14px] font-medium">
        Envoyer un message
      </button>
    </div>
  );
}
