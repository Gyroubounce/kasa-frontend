"use client";

import { useState } from "react";
import Image from "next/image";

interface CarouselProps {
  pictures: string[];
}

export default function Carousel({ pictures }: CarouselProps) {
  const [index, setIndex] = useState(0);

  // Cas : aucune image
  if (!pictures || pictures.length === 0) {
    return (
      <div  data-testid="placeholder" className="w-full h-[358px] md:h-[540px] bg-gray-200 rounded-[10px]" />
    );
  }

  const hasMultiple = pictures.length > 1;

  const next = () => {
    if (!hasMultiple) return;
    setIndex((prev) => (prev + 1) % pictures.length);
  };

  const prev = () => {
    if (!hasMultiple) return;
    setIndex((prev) => (prev - 1 + pictures.length) % pictures.length);
  };

  return (
    <div className="flex gap-4 w-full">
      {/* Grande image */}
      <div className="relative w-full md:w-[580px] h-[358px] md:h-[358px] rounded-[10px] overflow-hidden">
        <Image
          src={pictures[index]}
          alt={`Image ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 580px"
          className="object-cover"
        />

        {/* Flèches desktop */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              aria-label="Image précédente"
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full items-center justify-center"
            >
              <span className="text-black text-[14px] font-bold">‹</span>
            </button>

            <button
              onClick={next}
              aria-label="Image suivante"
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full items-center justify-center"
            >
              <span className="text-black text-[14px] font-bold">›</span>
            </button>
          </>
        )}

        {/* Pagination */}
        {hasMultiple && (
          <div className="absolute bottom-3 right-3 text-gray-700 text-[12px] bg-white/80 px-2 py-1 rounded">
            {index + 1} / {pictures.length}
          </div>
        )}
      </div>

      {/* Miniatures verticales (desktop) */}
      {hasMultiple && (
        <div className="hidden md:flex flex-col gap-2 w-[83px] overflow-y-auto max-h-[358px]">
          {pictures.map((pic, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label="Image précédente"
              className={`relative w-[83px] h-[101px] rounded-[10px] overflow-hidden border ${
                i === index ? "border-main-red" : "border-gray-300"
              }`}
            >
              <Image src={pic} alt={`Miniature ${i + 1}`} fill sizes="83px" className="object-cover" />
            </button>
          ))}
        </div>
        )}

        {/* Miniatures horizontales (mobile) */}
        {hasMultiple && (
        <div className="md:hidden flex gap-2 mt-3 overflow-x-auto">
            {pictures.map((pic, i) => (
            <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label="Image suivante"
                className={`relative min-w-[83px] h-[101px] rounded-[10px] overflow-hidden border ${
                i === index ? "border-main-red" : "border-gray-300"
                }`}
            >
                <Image src={pic} alt={`Miniature ${i + 1}`} fill className="object-cover" />
            </button>
            ))}
        </div>
        )}
      
    </div>
  );
}
