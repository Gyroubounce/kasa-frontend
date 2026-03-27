import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center py-6 bg-white">
      <div className="w-[1440px] flex justify-between items-center px-6">
        <Image
          src="/images/picto-kasa.png"
          alt="Kasa"
          width={40}
          height={40}
        />

        <p className="text-[12px] text-gray-dark">
          © 2020 Kasa. All rights reserved
        </p>
      </div>
    </footer>
  );
}
