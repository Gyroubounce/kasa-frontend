import Image from "next/image";
import logo from "@/../public/images/Picto-kasa.png"

export default function Footer() {
  return (
    <footer className="w-full flex justify-center bg-white">
      <div className="w-full max-w-97.5 md:max-w-360 h-footer px-2 flex justify-between items-center md:px-6">
        <Image
          src={logo}
          alt="Kasa logo"
          className="w-11.5 h-13.5"
        />

        <p className="text-[12px] text-gray-dark">
          © 2020 Kasa. All rights reserved
        </p>
      </div>
    </footer>
  );
}
