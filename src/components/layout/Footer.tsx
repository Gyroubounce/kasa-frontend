import Image from "next/image";
import logo from "@/../public/images/Picto-kasa.png"

export default function Footer() {
  return (
    <footer className="w-full flex justify-center py-6 bg-white">
      <div className="w-[1440px] flex justify-between items-center px-6">
        <Image
          src={logo}
          alt="Kasa"
          className="w-10 h-10"
        />

        <p className="text-[12px] text-gray-dark">
          © 2020 Kasa. All rights reserved
        </p>
      </div>
    </footer>
  );
}
