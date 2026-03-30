import PropertyCard from "@/components/properties/PropertyCard";
import { getPropertyBase } from "@/lib/api/properties";
import { PropertyBase } from "@/types/property";

interface PropertyListProps {
  columns?: number;
}

export default async function PropertyList({ columns = 3 }: PropertyListProps) {
  let properties: PropertyBase[] = [];

  try {
    properties = await getPropertyBase();
  } catch {
    return (
      <p className="text-center text-main-red text-lg mt-10" role="alert">
        Impossible de charger les logements.
      </p>
    );
  }

  return (
    <section
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-6 mt-10`}
      aria-label="Liste des logements disponibles"
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
}
