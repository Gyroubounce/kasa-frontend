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
      <div  data-testid="placeholder" className="w-full h-89.5 md:h-135 bg-gray-light rounded-10" />
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
    <div className="flex flex-col md:flex-row gap-2">
      {/* Grande image */}
      <div className="relative w-89.5 h-105.25 md:w-75.75 md:h-89.5 rounded-10 overflow-hidden">
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
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-light rounded-full items-center justify-center"
            >
              <span className="text-gray-dark text-[14px] font-bold">‹</span>
            </button>

            <button
              onClick={next}
              aria-label="Image suivante"
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-light rounded-full items-center justify-center"
            >
              <span className="text-gray-dark text-[14px] font-bold">›</span>
            </button>
          </>
        )}

        {/* Pagination */}
        {hasMultiple && (
          <div className="absolute bottom-3 right-3 text-gray-dark text-[12px] bg-gray-light px-2 py-1 rounded">
            {index + 1} / {pictures.length}
          </div>
        )}
      </div>

      {/* Miniatures verticales (desktop) */}
      {hasMultiple && (
        <div className="hidden md:grid grid-cols-2 gap-2 w-75.75 h-89.5 overflow-y-auto max-h-89.5">
          {pictures.map((pic, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label="Image précédente"
              className={`relative w-36.5 h-43.5 rounded-10 overflow-hidden border ${
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
        <div className="md:hidden flex gap-2 overflow-x-auto max-w-89.5">
            {pictures.map((pic, i) => (
            <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label="Image suivante"
                className={`relative min-w-20.75 h-27.25 rounded-6 overflow-hidden border ${
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
