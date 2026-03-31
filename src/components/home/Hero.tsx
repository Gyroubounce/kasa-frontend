import Image from "next/image";
import banner from "@/../public/images/hero-home.png";

export default function Hero() {
  return (
    <section
      className="w-full max-w-[1115px] flex flex-col items-center mt-10 mx-auto"
      aria-labelledby="hero-title"
    >
      <h1
        id="hero-title"
        className="text-main-red text-3xl sm:text-4xl font-semibold text-center"
      >
        Chez vous, partout et ailleurs
      </h1>

      <p className="text-[14px] text-black mt-2 text-center max-w-[600px]">
        Trouvez le logement idéal pour vos prochaines aventures
      </p>

      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[458px] mt-8">
        <Image
          src={banner}
          alt="Illustration d’un paysage accueillant représentant le confort et le voyage"
          fill
          className="object-cover rounded-[20px]"
          priority
        />
      </div>
    </section>
  );
}
