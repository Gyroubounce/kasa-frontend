"use client";

import { Rating } from "@/types/Rating";
import RatingItem from "./RatingItem";

interface RatingListProps {
  ratings: Rating[];
}

export default function RatingList({ ratings }: RatingListProps) {
  if (!ratings.length) {
    return (
      <p className="text-gray-600 text-[14px] mt-2">
        Aucun avis pour le moment.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      {ratings.map((rating) => (
        <RatingItem key={rating.id} rating={rating} />
      ))}
    </div>
  );
}
