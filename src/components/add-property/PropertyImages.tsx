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
      className=" w-88.75 lg:w-xl border border-gray-light bg-white flex flex-col mt-2 lg:mt-6 gap-4 px-4 py-4 lg:px-24 lg:py-10"
    >
      <h2 id="property-images-title" className="sr-only">
        Images de la propriété
      </h2>

      {/* Zone d’annonce vocale */}
      <div aria-live="polite" className="text-[12px] text-gray-dark">
        {uploadMessage}
        {loading && " Upload en cours…"}
        {error && <span className="text-red-500">{error}</span>}
      </div>

      {/* BLOC 1 — Image de couverture */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cover-upload" className="text-[14px] font-medium text-black">
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
            aria-label="Aucune image sélectionnée pour la couverture"           
            value={formData.cover ? "Image sélectionnée" : ""}
            readOnly
            className="w-70.25 lg:w-92.75 h-10 border border-gray-light rounded-8 px-3 text-[12px] text-gray-dark bg-white"
          />

          <button
            type="button"
            onClick={() => document.getElementById("cover-upload")?.click()}
            aria-label="Ajouter une image de couverture"
            className="w-9.25 h-9.25 bg-main-red text-white rounded-[5px] flex items-center justify-center cursor-pointer text-[18px] font-bold hover:bg-dark-orange transition"
            >
            +
          </button>

        </div>

        {/* Preview cover */}
        {formData.cover && (
          <div className="w-50 h-30 rounded-8 overflow-hidden border mt-2">
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
      <div className="flex flex-col gap-1">
        <p  className="text-[14px] font-medium text-black">
          Images du logement
        </p>

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
            aria-label="Aucune image sélectionnée pour les images du logement"
            value={formData.pictures?.length ? "Images sélectionnées" : ""}
            readOnly
            className="w-70.25 lg:w-92.75 h-10 border border-gray-light rounded-8 px-3 text-[12px] bg-white text-gray-dark"
          />


          <button
            type="button"
            onClick={() => document.getElementById("picture-upload")?.click()}
            aria-label="Ajouter une image du logement"
            className="w-9.25 h-9.25 bg-main-red text-white rounded-[5px] flex items-center justify-center cursor-pointer text-[18px] font-bold hover:bg-dark-orange transition"
          >
            +
          </button>

        </div>

        {/* Liste des images ajoutées */}
        <div className="flex flex-wrap gap-3">
          {(formData.pictures || []).map((pic, index) => (
            <div
              key={index}
              className="relative w-20 h-20 rounded-8 overflow-hidden border"
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
