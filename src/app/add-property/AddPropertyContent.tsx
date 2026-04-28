"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { AddPropertyProvider, useAddProperty } from "@/context/AddPropertyContext";

import PropertyMainForm from "@/components/add-property/PropertyMainForm";
import PropertyImages from "@/components/add-property/PropertyImages";
import PropertyEquipments from "@/components/add-property/PropertyEquipments";
import PropertyTags from "@/components/add-property/PropertyTags";
import PropertyHostInfo from "@/components/add-property/PropertyHostInfo";

import backIcon from "@/../public/images/icons/back.svg";

import type { AuthUser } from "@/types/auth";
type User = AuthUser;

function AddPropertyContentInner({ user }: { user: User }) {
  const { updateField } = useAddProperty();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user?.id) {
      updateField("host_id", String(user.id));
    }
  }, [user, updateField]);

  return (
    <article className="w-full flex flex-col items-center bg-light-orange py-4 gap-3">

      {/* RETOUR */}
      <div className="w-97.5 md:w-3xl lg:max-w-292 lg:w-full md:ml-4 mb-8">
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
        flex flex-row justify-between items-center w-97.5 md:max-w-3xl md:w-full lg:max-w-292 lg:w-full 
      ">
        <h1 id="add-property-title" className="text-[24px] font-semibold ml-2">
          Ajouter une propriété
        </h1>

        <button
          type="submit"
          form="property-form"
          className="w-24 h-9 bg-main-red text-white text-[14px] font-medium rounded-10 hover:bg-dark-orange transition"
        >
          Ajouter
        </button>
      </div>

      {/* CONTAINER 1 */}
      <section 
        className="
          w-97.5 md:w-3xl lg:w-292
          flex flex-col md:flex-row 
          items-center md:items-start 
          gap-3
          mb-6
        "
      >
        <PropertyMainForm onErrorsChange={setErrors} />

        <div className="flex flex-col gap-2 lg:gap-2">
          <PropertyImages errors={errors} />
          <PropertyHostInfo />
        </div>
      </section>

      {/* CONTAINER 2 */}
      <section 
        className="
          w-97.5 md:w-3xl lg:w-292
          flex flex-col md:flex-row 
          items-center md:items-start 
          gap-4 
          mb-6
        "
      >
        <PropertyEquipments errors={errors} />
        <PropertyTags errors={errors} />
      </section>

    </article>
  );
}


export default function AddPropertyContent({ user }: { user: User }) {
  return (
    <AddPropertyProvider>
      <AddPropertyContentInner user={user} />
    </AddPropertyProvider>
  );
}
