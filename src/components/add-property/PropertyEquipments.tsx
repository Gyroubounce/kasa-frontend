"use client";

import { useState } from "react";

export default function PropertyEquipments() {
  const [selected, setSelected] = useState<string[]>([]);

  const equipmentsCol1 = [
    "Micro-Ondes",
    "Douche italienne",
    "Frigo",
    "WIFI",
    "Parking",
    "Sèche Cheveux",
    "Machine à laver",
    "Cuisine équipée",
    "Télévision",
    "Chambre Séparée",
    "Climatisation",
    "Frigo Américain",
  ];

  const equipmentsCol2 = [
    "Clic clac",
    "Four",
    "Rangements",
    "Lit",
    "Bouilloire",
    "SDB",
    "Toilettes sèches",
    "Cintres",
    "Baie vitrée",
    "Hotte",
    "Baignoire",
    "Vue Parc",
  ];

  function toggleEquipment(equipment: string) {
    setSelected((prev) =>
      prev.includes(equipment)
        ? prev.filter((e) => e !== equipment)
        : [...prev, equipment]
    );
  }

  return (
    <section
      aria-labelledby="equipments-title"
      className="w-[576px] flex flex-col gap-6"
    >
      <h2 id="equipments-title" className="text-[14px] font-medium text-black">
        Équipements
      </h2>

      <fieldset className="flex gap-10" aria-describedby="equipments-help">
        <legend className="sr-only">Liste des équipements disponibles</legend>

        {/* COLONNE 1 */}
        <div className="flex flex-col gap-3">
          {equipmentsCol1.map((item) => (
            <label key={item} className="flex items-center gap-2 text-[12px] text-gray-700">
              <input
                type="checkbox"
                name="equipments"
                value={item}
                checked={selected.includes(item)}
                onChange={() => toggleEquipment(item)}
                className="w-[12px] h-[12px]"
              />
              {item}
            </label>
          ))}
        </div>

        {/* COLONNE 2 */}
        <div className="flex flex-col gap-3">
          {equipmentsCol2.map((item) => (
            <label key={item} className="flex items-center gap-2 text-[12px] text-gray-700">
              <input
                type="checkbox"
                name="equipments"
                value={item}
                checked={selected.includes(item)}
                onChange={() => toggleEquipment(item)}
                className="w-[12px] h-[12px]"
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <p id="equipments-help" className="sr-only">
        Sélectionnez les équipements présents dans votre logement.
      </p>
    </section>
  );
}
