export default function HowItWorks() {
  return (
    <section
      className="w-[1440px] flex flex-col items-center mt-20 mb-20"
      aria-labelledby="how-it-works-title"
    >
      <h2
        id="how-it-works-title"
        className="text-[24px] font-semibold text-center text-black"
      >
        Comment ça marche ?
      </h2>

      <p className="text-[14px] text-black mt-2 text-center max-w-[600px]">
        Découvrez comment utiliser notre plateforme en quelques étapes simples.
      </p>

      <div className="flex gap-6 mt-10" role="list">
        {/* Carte 1 */}
        <article
          role="listitem"
          className="w-[270px] h-[199px] bg-dark-orange rounded-[10px] p-5 text-white"
        >
          <h3 className="text-[18px] font-medium">1. Recherchez</h3>
          <p className="text-[12px] mt-2">
            Explorez notre catalogue de logements partout en France.
          </p>
        </article>

        {/* Carte 2 */}
        <article
          role="listitem"
          className="w-[270px] h-[199px] bg-dark-orange rounded-[10px] p-5 text-white"
        >
          <h3 className="text-[18px] font-medium">2. Réservez</h3>
          <p className="text-[12px] mt-2">
            Choisissez vos dates et réservez en toute simplicité.
          </p>
        </article>

        {/* Carte 3 */}
        <article
          role="listitem"
          className="w-[270px] h-[199px] bg-dark-orange rounded-[10px] p-5 text-white"
        >
          <h3 className="text-[18px] font-medium">3. Profitez</h3>
          <p className="text-[12px] mt-2">
            Installez‑vous et profitez de votre séjour en toute tranquillité.
          </p>
        </article>
      </div>
    </section>
  );
}
