import Hero from "@/components/home/Hero";
import PropertyList from "@/components/home/PropertyList";
import HowItWorks from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <main
      className="w-full flex flex-col items-center bg-light-orange"
      aria-label="Page d’accueil de Kasa"
    >
      <Hero />

      <section
        className="w-[1115px] mt-16"
        aria-labelledby="properties-title"
      >
        <h2 id="properties-title" className="sr-only">
          Liste des logements disponibles
        </h2>

        <PropertyList columns={3} />
      </section>

      <HowItWorks />
    </main>
  );
}
