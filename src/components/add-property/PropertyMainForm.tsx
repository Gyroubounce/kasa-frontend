"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddProperty } from "@/context/AddPropertyContext";

export default function PropertyMainForm() {
  const router = useRouter();
  const { formData, updateField } = useAddProperty();
    const [zipcode, setZipcode] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function validate() {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "Le titre est obligatoire.";
    if (!formData.price_per_night || formData.price_per_night <= 0)
      newErrors.price_per_night = "Le prix doit être supérieur à 0.";
    if (!formData.location.trim())
      newErrors.location = "La localisation est obligatoire.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!validate()) return;

    const finalLocation = `${zipcode} ${formData.location}`;

    try {
        const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...formData,
            location: finalLocation,
        }),
        });

        if (!res.ok) {
        console.error("Erreur API :", await res.text());
        return;
        }

        const created = await res.json();
        router.push(`/property/${created.slug}`);
    } catch (err) {
        console.error("Erreur lors de la création :", err);
    }
    }

  return (
    <form
      id="property-form"
      onSubmit={handleSubmit}
      className="w-[48%] flex flex-col gap-6"
      aria-labelledby="add-property-title"
    >
      {/* TITRE */}
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-[14px] font-medium">
          Titre *
        </label>

        <input
          id="title"
          type="text"
          value={formData.title}
          placeholder="Ex : Appartement cosy au cœur de Paris"
          onChange={(e) => updateField("title", e.target.value)}
          aria-required="true"
          aria-invalid="true"
          aria-describedby={errors.title ? "error-title" : undefined}
          className="border border-gray-300 rounded-[10px] px-3 h-[40px]"
        />

        {errors.title && (
          <p
            id="error-title"
            className="text-red-500 text-[12px]"
            aria-live="assertive"
          >
            {errors.title}
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-[14px] font-medium">
          Description
        </label>

        <textarea
          id="description"
          value={formData.description || ""}
          placeholder="Décrivez votre propriété en détail…"
          onChange={(e) => updateField("description", e.target.value)}
          className="border border-gray-300 rounded-[10px] px-3 py-2 h-[120px]"
        />
      </div>

        {/* CODE POSTAL */}
        <div className="flex flex-col gap-1">
            <label htmlFor="zipcode" className="text-[14px] font-medium">
                Code postal *
            </label>

            <input
                id="zipcode"
                type="text"
                placeholder="Ex : 75001"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                aria-required="true"
                aria-invalid="true"
                aria-describedby={errors.zipcode ? "error-zipcode" : undefined}
                className="border border-gray-300 rounded-[10px] px-3 h-[40px]"
            />

            {errors.zipcode && (
                <p
                id="error-zipcode"
                className="text-red-500 text-[12px]"
                aria-live="assertive"
                >
                {errors.zipcode}
                </p>
            )}
        </div>


      {/* LOCALISATION */}
      <div className="flex flex-col gap-1">
        <label htmlFor="location" className="text-[14px] font-medium">
          Localisation *
        </label>

        <input
          id="location"
          name="location"
          type="text"
          placeholder="Ex : Paris, France"
          value={formData.location}
          onChange={(e) => updateField("location", e.target.value)}
          aria-required="true"
          aria-invalid="true"
          aria-describedby={errors.location ? "error-location" : undefined}
          className="border border-gray-300 rounded-[10px] px-3 h-[40px]"
        />

        {errors.location && (
          <p
            id="error-location"
            className="text-red-500 text-[12px]"
            aria-live="assertive"
          >
            {errors.location}
          </p>
        )}
      </div>

      {/* PRIX */}
      <div className="flex flex-col gap-1">
        <label htmlFor="price" className="text-[14px] font-medium">
          Prix par nuit (€) *
        </label>

        <input
          id="price"
          name="price_per_night"
          type="number"
          placeholder="Ex : 120"
          value={formData.price_per_night}
          onChange={(e) =>
            updateField("price_per_night", Number(e.target.value))
          }
          aria-required="true"
          aria-invalid="true"
          aria-describedby={
            errors.price_per_night ? "error-price" : undefined
          }
          className="border border-gray-300 rounded-[10px] px-3 h-[40px]"
        />

        {errors.price_per_night && (
          <p
            id="error-price"
            className="text-red-500 text-[12px]"
            aria-live="assertive"
          >
            {errors.price_per_night}
          </p>
        )}
      </div>
    </form>
  );
}
