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
import PropertyHostInfo from "@/components/add-property/PropertyHostInfo";

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
  // 🚨 AJOUT : Vérification du rôle
if (!loading && user && user.role !== "owner") {
  redirect("/unauthorized");
}

  return (
    <article className="w-full flex flex-col items-center bg-light-orange py-4 gap-3">

      {/* RETOUR */}
      <div className="w-97.5 md:w-3xl lg:w-292 mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 bg-gray-light rounded-10 px-3 h-9 text-[14px] font-medium text-gray-dark w-fit"
        >
          <Image src={backIcon} alt="Retour au tableau de bord" className="w-3 h-3" />
          Retour
        </Link>
      </div>

      {/* HEADER + BTN AJOUTER */}
      <div className="
        flex flex-row justify-between items-center w-97.5 md:w-3xl lg:w-292
      ">
        <h1 id="add-property-title"className="text-[24px] font-semibold">Ajouter une propriété</h1>

        <button
          type="submit"
          form="property-form"
          className="w-24 h-9 bg-main-red text-white text-[14px] font-medium rounded-10 hover:bg-dark-orange transition"
        >
          Ajouter
        </button>
      </div>

      {/* CONTAINER 1 : Main form + Images */}
      <section 
        className="
          w-97.5 md:w-3xl lg:w-292
          flex flex-col md:flex-row 
          items-center md:items-start 
          gap-8 lg:gap-6
          mb-12
        "
      >
        <PropertyMainForm />
         <div className="flex flex-col gap-8 w-full md:w-auto">
          <PropertyImages />
          <PropertyHostInfo />
        </div>
      </section>

      {/* CONTAINER 2 : Equipments + Tags */}
      <section 
        className="
          w-97.5 md:w-3xl lg:w-292
          flex flex-col md:flex-row 
          items-center md:items-start 
          gap-8 lg:gap-6
          mb-12
        "
      >
        <PropertyEquipments />
        <PropertyTags />
      </section>

    </article>

  );
}

export default function AddPropertyPage() {
  return (
    <AddPropertyProvider>
      <AddPropertyContent />
    </AddPropertyProvider>
  );
}
