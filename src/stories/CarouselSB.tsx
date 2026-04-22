/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import "./carousel-sb.css";

interface CarouselProps {
  pictures: string[];
}

export default function CarouselSB({ pictures }: CarouselProps) {
  const validPictures = pictures?.filter((p) => p && p.trim() !== "") ?? [];
  const [index, setIndex] = useState(0);

  const hasMultiple = validPictures.length > 1;

  if (validPictures.length === 0) {
    return (
      <div className="carousel-sb-placeholder" />

    );
  }

  return (
    <div className="carousel-sb">
      <div className="carousel-sb-main">
        <img
          src={validPictures[index]}
          alt={`Image ${index + 1} sur ${validPictures.length}`}
        />

        {hasMultiple && (
          <>
            <button
              className="carousel-sb-arrow left"
              onClick={() =>
                setIndex((prev) => (prev - 1 + validPictures.length) % validPictures.length)
              }
            >
              ‹
            </button>

            <button
              className="carousel-sb-arrow right"
              onClick={() =>
                setIndex((prev) => (prev + 1) % validPictures.length)
              }
            >
              ›
            </button>
          </>
        )}

        {hasMultiple && (
          <div className="carousel-sb-pagination">
            {index + 1} / {validPictures.length}
          </div>
        )}
      </div>

      {hasMultiple && (
        <div className="carousel-sb-thumbs">
          {validPictures.map((pic, i) => (
            <button
              key={i}
              className={`carousel-sb-thumb ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            >
              <img src={pic} alt={`Miniature ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
