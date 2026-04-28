"use client";

import { useState, useEffect } from "react";
import { useAddProperty } from "@/context/AddPropertyContext";

export default function PropertyTags({
  errors,
}: {
  errors: { [key: string]: string };
}) {
  const { formData, updateField } = useAddProperty();

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

  const [selected, setSelected] = useState<string[]>(formData.tags || []);
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

  // 🔥 Sync local → global formData
  useEffect(() => {
    updateField("tags", selected);
  }, [selected, updateField]);

  return (
    <section
      aria-labelledby="tags-title"
      className=" w-88.75 lg:w-xl border border-gray-light bg-white flex flex-col lg:mt-1 px-4 py-6 lg:px-24 lg:py-20"
    >
      <div className="w-81.5 lg:w-104 gap-2 flex flex-col">
        <h2 id="tags-title" className="text-[14px] font-medium text-black">
          Catégories
        </h2>

        {/* Groupe de tags */}
        <div
          role="group"
          aria-labelledby="tags-title"
          className="w-full rounded-10 mt-2 flex flex-wrap gap-2 overflow-y-auto"
        >
          {existingTags.map((tag) => {
            const isSelected = selected.includes(tag);

            return (
              <button
                key={tag}
                type="button"
                aria-pressed="true"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-[5px] text-[12px] border transition
                  ${
                    isSelected
                      ? "bg-main-red text-white border-main-red"
                      : "bg-gray-100 text-gray-dark border-gray-light"
                  }
                `}
              >
                {tag}
              </button>
            );
          })}

          {/* Tags personnalisés */}
          {selected
            .filter((tag) => !existingTags.includes(tag))
            .map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed="true"
                onClick={() => toggleTag(tag)}
                className="px-3 py-1 rounded-[5px] text-[12px] bg-main-red text-white border border-main-red"
              >
                {tag}
              </button>
            ))}
        </div>

        {/* Ajout d’un tag personnalisé */}
        <div className="flex flex-col gap-1">
          <p className="text-[14px] font-medium text-black">
            Ajouter une catégorie personnalisée 
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              aria-label="Nouveau tag personnalisé"
              placeholder="Nouveau tag"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              className="w-70.25 lg:w-92.5 h-10 border border-gray-light rounded-8 text-[14px]"
            />

            <button
              type="button"
              onClick={addCustomTag}
              aria-label="Ajouter un tag personnalisé"
              className="w-9.25 h-9.25  text-white bg-main-red rounded-[5px] flex items-center justify-center text-[18px] font-bold hover:bg-dark-orange transition"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={addCustomTag}
            className="text-main-red text-[14px] font-normal cursor-pointer w-fit"
          >
            + Ajouter un tag
          </button>

          {/* 🔥 Affichage de l’erreur */}
          {errors.tags && (
            <p className="text-red-500 text-[12px]" aria-live="assertive">
              {errors.tags}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
