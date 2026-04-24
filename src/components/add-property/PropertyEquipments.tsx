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
      className="w-88.75 lg:w-xl border border-gray-light bg-white flex flex-col lg:mt-1 gap-4 px-4 py-8 lg:px-24 lg:py-20"
    >
      <h2 id="equipments-title" className="text-[14px] font-medium text-black">
        Équipements
      </h2>

      <fieldset className="flex gap-10 lg:gap-30" aria-describedby="equipments-help">
        <legend className="sr-only">Liste des équipements disponibles</legend>

        {/* COLONNE 1 */}
        <div className="flex flex-col gap-3">
          {equipmentsCol1.map((item) => (
            <label key={item} className="flex items-center gap-2 text-[12px] text-gray-dark">
              <input
                type="checkbox"
                name="equipments"
                value={item}
                checked={selected.includes(item)}
                onChange={() => toggleEquipment(item)}
                className="w-3 h-3"
              />
              {item}
            </label>
          ))}
        </div>

        {/* COLONNE 2 */}
        <div className="flex flex-col gap-3">
          {equipmentsCol2.map((item) => (
            <label key={item} className="flex items-center gap-2 text-[12px] text-gray-dark">
              <input
                type="checkbox"
                name="equipments"
                value={item}
                checked={selected.includes(item)}
                onChange={() => toggleEquipment(item)}
                className="w-3 h-3"
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
