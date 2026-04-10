"use client";

import { useState } from "react";
import Image from "next/image";
import { useUpload } from "@/hooks/useUpload";
import { useAddProperty } from "@/context/AddPropertyContext";
import { UploadResponse } from "@/types/UploadResponse";

export default function PropertyHostInfo() {
  const { formData, updateField } = useAddProperty();
  const { uploadFile, loading, error } = useUpload();

  const [uploadMessage, setUploadMessage] = useState("");


  // -----------------------------
  // UPLOAD PHOTO DE PROFIL
  // -----------------------------
  async function handleUploadProfile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadMessage("Téléchargement de la photo de profil…");

    const uploaded: UploadResponse | null = await uploadFile(file, "host");
    if (!uploaded) {
      setUploadMessage("Erreur lors de l’upload.");
      return;
    }

    

    updateField("host", {
     ...formData.host,
      picture: uploaded.url,
    });

    setUploadMessage("Photo de profil ajoutée.");
  }

  // -----------------------------
  // REMOVE PROFILE
  // -----------------------------
  function removeProfile() {
   

    updateField("host", {

      picture: "",
    });
  }

  return (
    <section
      aria-labelledby="host-info-title"
      className="w-88.75 lg:w-xl border border-gray-light bg-white flex flex-col mt-2 lg:mt-6 gap-4 px-4 py-4 lg:px-24 lg:py-10"
    >
      <h2 id="host-info-title" className="sr-only">
        Informations de l’hôte
      </h2>

      {/* Zone d’annonce vocale */}
      <div aria-live="polite" className="text-[12px] text-gray-dark">
        {uploadMessage}
        {loading && " Upload en cours…"}
        {error && <span className="text-red-500">{error}</span>}
      </div>

      {/* BLOC 1 — Nom de l’hôte */}
      <div className="flex flex-col gap-1">
        <p className="text-[14px] font-medium text-black">
          Nom de l’hôte
        </p>

        <input
          type="text"
          aria-label="Nom de l’hôte"
          value={formData.host?.name || ""}
          onChange={(e) => {
          
            updateField("host", {
              ...formData.host,
              name: e.target.value,
            });
          }}
          className="w-92.5 h-10 border border-gray-light rounded-8 px-3 text-[12px] text-gray-dark bg-white"
        />
      </div>

      {/* BLOC 2 — Photo de profil */}
      <div className="flex flex-col gap-1">
        <p className="text-[14px] font-medium text-black">
          Photo de profil
        </p>

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            id="profile-upload"
            className="hidden"
            onChange={handleUploadProfile}
          />

          <input
            type="text"
            aria-label="Aucune image sélectionnée"
            value={formData.host?.picture ? "Image sélectionnée" : ""}
            readOnly
            className="w-70.25 lg:w-92.75 h-10 border border-gray-light rounded-8 px-3 text-[12px] text-gray-dark bg-white"
          />

          <button
            type="button"
            onClick={() => document.getElementById("profile-upload")?.click()}
            aria-label="Ajouter une photo de profil"
            className="w-9.25 h-9.25 bg-main-red text-white rounded-[5px] flex items-center justify-center cursor-pointer text-[18px] font-bold hover:bg-dark-orange transition"
            >
            +
          </button>

        </div>

        {/* Preview */}
        {formData.host?.picture && (
          <div className="relative w-20 h-20 rounded-8 overflow-hidden border mt-2">
            <Image
              src={formData.host.picture}
              alt="Photo de profil"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />

            <button
              onClick={removeProfile}
              aria-label="Supprimer la photo"
              className="absolute top-1 right-1 bg-main-red text-white text-[10px] px-1 rounded"
            >
              X
            </button>
          </div>
        )}

          {/* Bouton + Ajouter une image */}
        <label
            htmlFor="profile-upload"
            className="text-main-red text-[14px] font-normal cursor-pointer"
        >
            + Ajouter une image
        </label>
      </div>
    </section>
  );
}
