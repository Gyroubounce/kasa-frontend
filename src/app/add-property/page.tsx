"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@/hooks/useAuth";
import { AddPropertyProvider, useAddProperty } from "@/context/AddPropertyContext";

import PropertyMainForm from "@/components/add-property/PropertyMainForm";
import PropertyImages from "@/components/add-property/PropertyImages";
import PropertyEquipments from "@/components/add-property/PropertyEquipments";
import PropertyTags from "@/components/add-property/PropertyTags";

import backIcon from "@/../public/images/icons/back.svg"; // adapte ton chemin

function AddPropertyContent() {
  const { user, loading } = useAuth();
  const { updateField } = useAddProperty();

  // Toujours appeler les hooks AVANT les returns conditionnels
  useEffect(() => {
    if (user?.id) {
      updateField("host_id", user.id);
    }
  }, [user, updateField]);

  // Conditions APRÈS les hooks
  if (loading) return null;

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="w-full flex flex-col items-center py-10 gap-8">

      {/* RETOUR */}
      <div className="w-full max-w-[1168px] mb-6">
        <Link
          href="/"
          className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-[10px] px-3 h-[36px] text-[14px] font-medium text-gray-700 w-fit"
        >
          <Image src={backIcon} alt="Retour" className="w-3 h-3" />
          Retour
        </Link>
      </div>

      {/* HEADER + BTN AJOUTER */}
      <div className="flex flex-row justify-between items-center w-full max-w-[1200px]">
        <h1 className="text-[24px] font-semibold">Ajouter une propriété</h1>

        <button
          type="submit"
          form="property-form"
          className="w-[96px] h-[36px] bg-main-red text-white text-[14px] font-medium rounded-[10px]"
        >
          Ajouter
        </button>
      </div>

      {/* CONTAINER 1 : Main form + Images */}
      <section className="w-full max-w-[1200px] flex justify-between mb-12">
        <PropertyMainForm />
        <PropertyImages />
      </section>

      {/* CONTAINER 2 : Equipments + Tags */}
      <section className="w-full max-w-[1200px] flex justify-between">
        <PropertyEquipments />
        <PropertyTags />
      </section>
    </main>
  );
}

export default function AddPropertyPage() {
  return (
    <AddPropertyProvider>
      <AddPropertyContent />
    </AddPropertyProvider>
  );
}
