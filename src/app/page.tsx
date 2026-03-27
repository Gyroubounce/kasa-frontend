import Hero from "@/components/home/Hero";
import PropertyCard from "@/components/home/PropertyCard";
import { getAllProperties } from "@/lib/api/properties";

export default async function HomePage() {
  let properties = [];

  try {
    properties = await getAllProperties();
  } catch (err) {
    return (
      <main className="max-w-[1240px] mx-auto px-4 py-10">
        <Hero />
        <p className="text-center text-main-red text-lg mt-10">
          Impossible de charger les logements.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-[1240px] mx-auto px-4 py-10">
      <Hero />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </section>
    </main>
  );
}
