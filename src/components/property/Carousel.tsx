"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface CarouselProps {
  pictures: string[];
}

export default function Carousel({ pictures }: CarouselProps) {
  const validPictures = pictures?.filter((p) => p && p.trim() !== "") ?? [];
  const [index, setIndex] = useState(0);

  const hasMultiple = validPictures.length > 1;

  // Swipe mobile
  const startX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
  const diff = startX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }

  };


  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasMultiple) return;
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % validPictures.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + validPictures.length) % validPictures.length);
  };

  if (validPictures.length === 0) {
    return (
      <div
        data-testid="placeholder"
        className="w-full h-89.5 md:h-135 bg-gray-light rounded-10"
      />
    );
  }

  return (
    <div
      className="flex flex-col md:flex-row gap-2 select-none"
      role="region"
      aria-label="Carousel d’images"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Grande image */}
      <div
        className="relative w-89.5 h-105.25 md:w-75.75 md:h-89.5 rounded-10 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-live="polite"
      >
         <Image
          src={validPictures[index]}
          alt={`Image ${index + 1} sur ${validPictures.length}`}
          fill
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, 580px"
          className="object-cover object-center transition-transform duration-300 ease-out"
          unoptimized
        />

        {/* Flèches (desktop) */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              aria-label="Image précédente"
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-light rounded-full items-center justify-center"
            >
              ‹
            </button>

            <button
              onClick={next}
              aria-label="Image suivante"
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-light rounded-full items-center justify-center"
            >
              ›
            </button>
          </>
        )}

        {/* Pagination */}
        {hasMultiple && (
          <div className="absolute bottom-3 right-3 text-gray-dark text-[12px] bg-gray-light px-2 py-1 rounded">
            {index + 1} / {validPictures.length}
          </div>
        )}
      </div>

      {/* Miniatures desktop */}
      {hasMultiple && (
        <div className="hidden md:grid grid-cols-2 gap-2 w-75.75 h-89.5 overflow-y-auto no-scrollbar">
          {validPictures.map((pic, i) => (
            <button
              key={i}
              onMouseEnter={() => setIndex(i)}
              aria-label={`Afficher l’image ${i + 1}`}
              className={`relative w-36.5 h-43.5 rounded-10 overflow-hidden border ${
                i === index ? "border-main-red" : "border-gray-300"
              }`}
            >
               <Image
                src={pic}
                alt={`Miniature ${i + 1}`}
                fill
                sizes="150px"
                className="object-cover object-center"
                unoptimized
              />
            
            </button>
          ))}
        </div>
      )}

      {/* Miniatures mobile */}
      {hasMultiple && (
        <div className="md:hidden flex gap-2 overflow-x-auto no-scrollbar max-w-89.5">
          {validPictures.map((pic, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Afficher l’image ${i + 1}`}
              className={`relative min-w-20.75 h-27.25 rounded-6 overflow-hidden border ${
                i === index ? "border-main-red" : "border-gray-300"
              }`}
            >
              <Image
                src={pic}
                alt={`Miniature ${i + 1}`}
                fill
                sizes="100px"
                className="object-cover object-center"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
