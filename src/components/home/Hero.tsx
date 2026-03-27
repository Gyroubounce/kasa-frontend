import Image from "next/image";
import banner from "@/../public/images/hero-home.png";

export default function Hero() {
  return (
    <section className="relative w-full h-[220px] md:h-[300px] rounded-xl overflow-hidden mb-10">
      <Image
        src={banner}
        alt="Bannière Kasa"
        fill
        className="object-cover brightness-75"
        priority
      />

      <h1 className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-4xl font-semibold px-4 text-center">
        Chez vous, partout et ailleurs
      </h1>
    </section>
  );
}
