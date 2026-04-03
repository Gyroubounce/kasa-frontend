"use client";

import { useState } from "react";
import Image from "next/image";
import { useUpload } from "@/hooks/useUpload";
import { useAddProperty } from "@/context/AddPropertyContext";
import { UploadResponse } from "@/types/UploadResponse";

export default function PropertyImages() {
  const { formData, updateField } = useAddProperty();
  const { uploadFile, loading, error } = useUpload();

  const [uploadMessage, setUploadMessage] = useState("");

  // -----------------------------
  // UPLOAD COVER
  // -----------------------------
  async function handleUploadCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadMessage("Téléchargement de l’image de couverture…");

    const uploaded: UploadResponse | null = await uploadFile(file, "cover");
    if (!uploaded) {
      setUploadMessage("Erreur lors de l’upload.");
      return;
    }

    updateField("cover", uploaded.url);
    setUploadMessage("Image de couverture ajoutée.");
  }

  // -----------------------------
  // UPLOAD GALLERY IMAGE
  // -----------------------------
  async function handleUploadPicture(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadMessage("Téléchargement de l’image…");

    const uploaded: UploadResponse | null = await uploadFile(file, "gallery");
    if (!uploaded) {
      setUploadMessage("Erreur lors de l’upload.");
      return;
    }

    const newList = [...(formData.pictures || []), uploaded.url];
    updateField("pictures", newList);

    setUploadMessage("Image ajoutée.");
  }

  // -----------------------------
  // REMOVE IMAGE
  // -----------------------------
  function removeImage(url: string) {
    const newList = (formData.pictures || []).filter((img) => img !== url);
    updateField("pictures", newList);

    if (formData.cover === url) {
      updateField("cover", "");
    }
  }

  return (
    <section
      aria-labelledby="property-images-title"
      className="w-[576px] flex flex-col gap-10"
    >
      <h2 id="property-images-title" className="sr-only">
        Images de la propriété
      </h2>

      {/* Zone d’annonce vocale */}
      <div aria-live="polite" className="text-[12px] text-gray-600">
        {uploadMessage}
        {loading && " Upload en cours…"}
        {error && <span className="text-red-500">{error}</span>}
      </div>

      {/* BLOC 1 — Image de couverture */}
      <div className="flex flex-col gap-3">
        <label className="text-[14px] font-medium text-black">
          Image de couverture
        </label>

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            id="cover-upload"
            className="hidden"
            onChange={handleUploadCover}
          />

          <input
            type="text"
            placeholder="Aucune image sélectionnée"
            value={formData.cover ? "Image sélectionnée" : ""}
            readOnly
            className="w-[371px] h-[40px] border border-gray-300 rounded-[8px] px-3 text-[14px] bg-gray-50"
          />

          <label
            htmlFor="cover-upload"
            aria-label="Ajouter une image de couverture"
            className="w-[37px] h-[37px] border border-main-red text-main-red rounded-[5px] flex items-center justify-center cursor-pointer text-[18px] font-bold"
          >
            +
          </label>
        </div>

        {/* Preview cover */}
        {formData.cover && (
          <div className="w-[200px] h-[120px] rounded-[8px] overflow-hidden border mt-2">
            <Image
              src={formData.cover}
              alt="Image de couverture"
              width={200}
              height={120}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* BLOC 2 — Images du logement */}
      <div className="flex flex-col gap-3">
        <label className="text-[14px] font-medium text-black">
          Images du logement
        </label>

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            id="picture-upload"
            className="hidden"
            onChange={handleUploadPicture}
          />

          <input
            type="text"
            placeholder="Aucune image sélectionnée"
            readOnly
            className="w-[371px] h-[40px] border border-gray-300 rounded-[8px] px-3 text-[14px] bg-gray-50"
          />

          <label
            htmlFor="picture-upload"
            aria-label="Ajouter une image du logement"
            className="w-[37px] h-[37px] border border-main-red text-main-red rounded-[5px] flex items-center justify-center cursor-pointer text-[18px] font-bold"
          >
            +
          </label>
        </div>

        {/* Liste des images ajoutées */}
        <div className="flex flex-wrap gap-3 mt-2">
          {(formData.pictures || []).map((pic, index) => (
            <div
              key={index}
              className="relative w-[80px] h-[80px] rounded-[8px] overflow-hidden border"
            >
              <Image
                src={pic}
                alt={`Image ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />

              {/* Bouton suppression */}
              <button
                onClick={() => removeImage(pic)}
                aria-label="Supprimer cette image"
                className="absolute top-1 right-1 bg-main-red text-white text-[10px] px-1 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* Bouton +Ajouter une image */}
        <label
          htmlFor="picture-upload"
          className="text-main-red text-[14px] font-normal cursor-pointer"
        >
          + Ajouter une image
        </label>
      </div>
    </section>
  );
}
