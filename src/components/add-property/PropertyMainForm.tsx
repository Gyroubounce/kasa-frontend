"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddProperty } from "@/context/AddPropertyContext";

export default function PropertyMainForm({
  onErrorsChange,
}: {
  onErrorsChange: (errors: { [key: string]: string }) => void;
}) {

  const router = useRouter();
  const { formData, updateField } = useAddProperty();
  const [zipcode, setZipcode] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function validate() {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "Le titre est obligatoire.";
    if (!formData.description?.trim())
    newErrors.description = "La description est obligatoire.";

    if (!formData.price_per_night || formData.price_per_night <= 0)
      newErrors.price_per_night = "Le prix doit être supérieur à 0.";
    if (!formData.location.trim())
      newErrors.location = "La localisation est obligatoire.";
    if (!zipcode.trim()) newErrors.zipcode = "Le code postal est obligatoire.";
    if (!formData.cover?.trim())
    newErrors.cover = "Une photo de couverture est obligatoire.";
    if (!formData.cover?.trim())
   newErrors.cover = "Une photo de couverture est obligatoire.";
    if (!formData.pictures || formData.pictures.length === 0)
      newErrors.pictures = "Veuillez ajouter au moins une photo.";
    if (!formData.equipments || formData.equipments.length === 0)
   newErrors.equipments = "Veuillez sélectionner au moins un équipement.";

    if (!formData.tags || formData.tags.length === 0)
   newErrors.tags = "Veuillez sélectionner au moins une catégorie.";


    setErrors(newErrors);
    onErrorsChange(newErrors); 
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    const finalLocation = `${zipcode} ${formData.location}`;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
        method: "POST",
        credentials: "include",
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

      await res.json();

      router.push(`/`);

    } catch (err) {
      console.error("Erreur lors de la création :", err);
    }
  }


  return (
    <form
      id="property-form"
      onSubmit={handleSubmit}
        onKeyDown={(e) => {
    if (e.key === "Enter") e.preventDefault();
  }}
      className="w-88.75 lg:w-xl border border-gray-light bg-white flex flex-col mt-2 lg:mt-6 gap-4 px-4 py-4 lg:px-24 lg:py-20"
      aria-labelledby="add-property-title"
    >
      {/* TITRE */}
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-[14px] font-medium">
          Titre
        </label>

        <input
          id="title"
          type="text"
          value={formData.title}
          placeholder="Ex : Appartement cosy au cœur de Paris"
          onChange={(e) => updateField("title", e.target.value)}
          required
          aria-required="true"
          aria-invalid="false"
          
          className="text-[12px] text-gray-dark border border-gray-light rounded-[4px] px-3 lg:w-104 h-10"
        />

        {errors.title && (
          <p id="error-title" className="text-red-500 text-[12px]" aria-live="assertive">
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
          required
          className="text-[12px] text-gray-dark border border-gray-light rounded-[4px] px-3 py-2 lg:w-104 h-30"
        />

        {errors.description && (
          <p className="text-red-500 text-[12px]" aria-live="assertive">
            {errors.description}
          </p>
        )}

      </div>

      {/* CODE POSTAL */}
      <div className="flex flex-col gap-1">
        <label htmlFor="zipcode" className="text-[14px] font-medium">
          Code postal
        </label>

        <input
          id="zipcode"
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          required
          aria-required="true"
          aria-invalid="false"
          
          className="border border-gray-light rounded-[4px] px-3 lg:w-104 h-10"
        />

        {errors.zipcode && (
          <p id="error-zipcode" className="text-red-500 text-[12px]" aria-live="assertive">
            {errors.zipcode}
          </p>
        )}
      </div>

      {/* LOCALISATION */}
      <div className="flex flex-col gap-1">
        <label htmlFor="location" className="text-[14px] font-medium">
          Localisation
        </label>

        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={(e) => updateField("location", e.target.value)}
          required
          aria-required="true"
          aria-invalid="false"
          
          className="border border-gray-light rounded-[4px] px-3 lg:w-104 h-10"
        />

        {errors.location && (
          <p id="error-location" className="text-red-500 text-[12px]" aria-live="assertive">
            {errors.location}
          </p>
        )}
      </div>

      {/* PRIX */}
      <div className="flex flex-col gap-1">
        <label htmlFor="price" className="text-[14px] font-medium">
          Prix par nuit (€)
        </label>

        <input
          id="price"
          name="price_per_night"
          type="number"
          value={formData.price_per_night}
          onChange={(e) => updateField("price_per_night", Number(e.target.value))}
          required
          aria-required="true"
          aria-invalid="false"
          
          className="border border-gray-light rounded-[4px] px-3 lg:w-104 h-10"
        />

        {errors.price_per_night && (
          <p id="error-price" className="text-red-500 text-[12px]" aria-live="assertive">
            {errors.price_per_night}
          </p>
        )}
      </div>
    </form>
  );
}
