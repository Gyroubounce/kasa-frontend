"use client";

import { useState } from "react";

export default function PropertyTags() {
  // Tags existants (tu pourras les remplacer par ceux venant du backend)
  const existingTags = [
    "Parc",
    "Night Life",
    "Culture",
    "Nature",
    "Touristique",
    "Vue sur mer",
    "Pour les couples",
    "Famille",
    "Forêt",
    "Centre-ville",
    "Montagne",
    "Calme",
  ];

  const [selected, setSelected] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");

  function toggleTag(tag: string) {
    setSelected((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }

  function addCustomTag() {
    const tag = customTag.trim();
    if (!tag) return;
    if (!selected.includes(tag)) {
      setSelected((prev) => [...prev, tag]);
    }
    setCustomTag("");
  }

  return (
    <section
      aria-labelledby="tags-title"
      className="w-[416px] flex flex-col gap-6"
    >
      <h2 id="tags-title" className="text-[14px] font-medium text-black">
        Tags
      </h2>

      {/* Groupe de tags */}
      <div
        role="group"
        aria-labelledby="tags-title"
        className="w-[416px] h-[144px] border border-gray-300 rounded-[8px] p-3 flex flex-wrap gap-2 overflow-y-auto"
      >
        {existingTags.map((tag) => {
          const isSelected = selected.includes(tag);

          return (
            <button
              key={tag}
              type="button"
              aria-pressed="true"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-[12px] border transition
                ${
                  isSelected
                    ? "bg-main-red text-white border-main-red"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }
              `}
            >
              {tag}
            </button>
          );
        })}

        {/* Tags personnalisés déjà ajoutés */}
        {selected
          .filter((tag) => !existingTags.includes(tag))
          .map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed="true"
              onClick={() => toggleTag(tag)}
              className="px-3 py-1 rounded-full text-[12px] bg-main-red text-white border border-main-red"
            >
              {tag}
            </button>
          ))}
      </div>

      {/* Ajout d’un tag personnalisé */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Ajouter un tag"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          className="w-[300px] h-[36px] border border-gray-300 rounded-[8px] px-3 text-[14px]"
        />

        <button
          type="button"
          onClick={addCustomTag}
          aria-label="Ajouter un tag personnalisé"
          className="w-[37px] h-[37px] border border-main-red text-main-red rounded-[5px] flex items-center justify-center text-[18px] font-bold"
        >
          +
        </button>
      </div>
    </section>
  );
}
