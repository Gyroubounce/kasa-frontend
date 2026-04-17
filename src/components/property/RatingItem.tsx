"use client";

import Image from "next/image";
import { Rating } from "@/types/Rating";

interface RatingItemProps {
  rating: Rating;
}

export default function RatingItem({ rating }: RatingItemProps) {
  return (
    <article className="flex gap-4 p-4 border rounded-10 bg-white shadow-sm">
      {/* Avatar */}
      <div className="w-12 h-12 relative rounded-full overflow-hidden">
        <Image
          src={rating.user.picture ?? "/images/default-avatar.png"}
          alt={`Photo de ${rating.user.name}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Contenu */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="text-[16px] font-medium">{rating.user.name}</h3>
          <span className="text-[12px] text-gray-500">
            {new Date(rating.created_at).toLocaleDateString("fr-FR")}
          </span>
        </div>

        {/* Score */}
        <p className="text-main-red font-semibold text-[14px]">
          {rating.score}/5
        </p>

        {/* Commentaire */}
        {rating.comment && (
          <p className="text-[14px] text-gray-700">{rating.comment}</p>
        )}
      </div>
    </article>
  );
}
