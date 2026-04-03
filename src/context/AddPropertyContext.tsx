"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { PropertyCreate } from "@/types/property";

interface AddPropertyContextValue {
  formData: PropertyCreate;
  updateField: <K extends keyof PropertyCreate>(
  field: K,
  value: PropertyCreate[K]
) => void;


  // Images
  setCover: (url: string) => void;
  addPicture: (url: string) => void;

  // Equipments
  toggleEquipment: (equipment: string) => void;

  // Tags
  toggleTag: (tag: string) => void;
  addCustomTag: (tag: string) => void;

  resetForm: () => void;
}

const AddPropertyContext = createContext<AddPropertyContextValue | undefined>(
  undefined
);

export function AddPropertyProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<PropertyCreate>({
    title: "",
    description: "",
    cover: "",
    location: "",
    price_per_night: 0,
    host_id: "", // sera rempli automatiquement via l'utilisateur connecté
    pictures: [],
    equipments: [],
    tags: [],
  });

  // Mise à jour générique
  function updateField<K extends keyof PropertyCreate>(
    field: K,
    value: PropertyCreate[K]
    ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    }


  // Images
  function setCover(url: string) {
    setFormData((prev) => ({ ...prev, cover: url }));
  }

  function addPicture(url: string) {
    setFormData((prev) => ({
      ...prev,
      pictures: [...(prev.pictures || []), url],
    }));
  }

  // Equipments
  function toggleEquipment(equipment: string) {
    setFormData((prev) => {
      const exists = prev.equipments?.includes(equipment);
      return {
        ...prev,
        equipments: exists
          ? prev.equipments?.filter((e) => e !== equipment)
          : [...(prev.equipments || []), equipment],
      };
    });
  }

  // Tags
  function toggleTag(tag: string) {
    setFormData((prev) => {
      const exists = prev.tags?.includes(tag);
      return {
        ...prev,
        tags: exists
          ? prev.tags?.filter((t) => t !== tag)
          : [...(prev.tags || []), tag],
      };
    });
  }

  function addCustomTag(tag: string) {
    const clean = tag.trim();
    if (!clean) return;

    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.includes(clean)
        ? prev.tags
        : [...(prev.tags || []), clean],
    }));
  }

  // Reset complet
  function resetForm() {
    setFormData({
      title: "",
      description: "",
      cover: "",
      location: "",
      price_per_night: 0,
      host_id: "",
      pictures: [],
      equipments: [],
      tags: [],
    });
  }

  return (
    <AddPropertyContext.Provider
      value={{
        formData,
        updateField,
        setCover,
        addPicture,
        toggleEquipment,
        toggleTag,
        addCustomTag,
        resetForm,
      }}
    >
      {children}
    </AddPropertyContext.Provider>
  );
}

export function useAddProperty() {
  const ctx = useContext(AddPropertyContext);
  if (!ctx) {
    throw new Error("useAddProperty must be used inside AddPropertyProvider");
  }
  return ctx;
}
