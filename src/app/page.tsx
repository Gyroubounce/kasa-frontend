import Hero from "@/components/home/Hero";
import PropertyList from "@/components/home/PropertyList";
import HowItWorks from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section
        className="mt-16"
        aria-labelledby="properties-title"
      >
        <h2 id="properties-title" className="sr-only">
          Liste des logements disponibles
        </h2>

        <div className="max-w-278.75 mx-auto">
          <PropertyList />
        </div>

      </section>

      <HowItWorks />
    </>
  );
}
