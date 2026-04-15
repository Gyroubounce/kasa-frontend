"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropertyDetail } from "@/types/property";
import { useMessaging } from "@/context/MessagingContext";

export default function HostCard({ property }: { property: PropertyDetail }) {
  const router = useRouter();
  const messaging = useMessaging();

  const handleContact = () => {
    const message = `Bonjour, j’aimerais avoir quelques informations concernant votre logement (ID: ${property.id}).`;
    const threadId = messaging.startConversationWithHost(property.host, message);
    router.push(`/messaging/${threadId}`);
  };

  const handleSendMessage = () => {
    const message = `Bonjour, je suis intéressé par votre logement (ID: ${property.id}). Est-il toujours disponible ?`;
    const threadId = messaging.startConversationWithHost(property.host, message);
    router.push(`/messaging/${threadId}`);
  };

  return (
    <div className="w-86.25 h-70.25 border border-gray-light rounded-10 p-4 bg-white">
      <h3 className="text-[16px] font-medium text-black">Votre hôte</h3>

      <div className="flex items-center gap-3 mt-6">
        <div className="relative w-20.5 h-20.5 rounded-10 overflow-hidden">
          <Image
            src={property.host.picture ?? "/images/default-avatar.png"}
            alt={`Photo de ${property.host.name}`}
            fill
            sizes="82px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-row items-center gap-4">
          <p className="text-[14px] font-medium">{property.host.name}</p>
          <div className="flex items-center justify-center bg-gray-light rounded-10 w-12.5 h-9.75 gap-1">
            <p className="text-main-red text-[23px]">★</p>
            <p className="text-black text-[16px] leading-none">
              {property.rating_avg}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleContact}
        className="mt-6 w-74.25 h-9 bg-main-red text-white rounded-10 text-[14px] font-medium"
      >
        Contacter l’hôte
      </button>

      <button
        onClick={handleSendMessage}
        className="mt-2 w-74.25 h-9 bg-main-red text-white rounded-10 text-[14px] font-medium"
      >
        Envoyer un message
      </button>
    </div>
  );
}
