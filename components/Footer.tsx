"use client";

import Image from "next/image";
import Link from "next/link";
import { websiteContent } from "@/lib/content";

export default function Footer() {
  const instagramUrl = websiteContent.footer?.instagram?.url || "https://www.instagram.com";

  return (
    <footer
      aria-label="Footer"
      className="bg-cream-100 py-12 sm:py-16 border-t border-[#E8DCCB]/60 select-none transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center">
        {/* Seamless minimal row of logos: Cafe Logo, Swiggy, Zomato, Instagram */}
        <div className="flex items-center justify-center gap-5 sm:gap-7">
          {/* 1. Cafe Logo */}
          <Link
            href="/"
            aria-label="X&Y Bakehouse Home"
            className="w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden border border-[#DECDB6] shadow-2xs hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 bg-white flex items-center justify-center p-0.5 cursor-pointer"
          >
            <Image
              src="/Logo.png"
              alt="X&Y Bakehouse"
              width={52}
              height={52}
              className="w-full h-full object-cover rounded-full"
            />
          </Link>

          {/* 2. Swiggy Logo */}
          <a
            href="https://www.swiggy.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on Swiggy"
            title="Order on Swiggy"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-[#FE5005]/20 shadow-2xs hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center p-2 cursor-pointer"
          >
            <div className="relative w-full h-full">
              <Image
                src="/icons/SwiggyAppIcon.png"
                alt="Swiggy"
                fill
                className="object-contain"
              />
            </div>
          </a>

          {/* 3. Zomato Logo */}
          <a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on Zomato"
            title="Order on Zomato"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#E23744] border border-white/20 shadow-2xs hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center p-2.5 cursor-pointer"
          >
            <div className="relative w-full h-full">
              <Image
                src="/icons/ZomatoAppIcon.png"
                alt="Zomato"
                fill
                className="object-contain"
              />
            </div>
          </a>

          {/* 4. Instagram Logo */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            title="Follow on Instagram"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-[#DECDB6] shadow-2xs hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center p-2 cursor-pointer"
          >
            <div className="relative w-full h-full">
              <Image
                src="/icons/InstagramAppIcon.png"
                alt="Instagram"
                fill
                className="object-contain"
              />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
