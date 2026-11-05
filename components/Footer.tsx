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
        {/* Seamless row of pure logo icons: Cafe Logo, Swiggy, Zomato, Instagram */}
        <div className="flex items-center justify-center gap-5 sm:gap-7">
          {/* 1. Cafe Logo */}
          <Link
            href="/"
            aria-label="X&Y Bakehouse Home"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden hover:scale-110 active:scale-95 transition-transform duration-300 block cursor-pointer"
          >
            <Image
              src="/Logo.png"
              alt="X&Y Bakehouse"
              width={48}
              height={48}
              className="w-full h-full object-cover rounded-full"
            />
          </Link>

          {/* 2. Swiggy Logo (No container, just the image) */}
          <a
            href="https://www.swiggy.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on Swiggy"
            title="Order on Swiggy"
            className="w-10 h-10 sm:w-11 sm:h-11 hover:scale-110 active:scale-95 transition-transform duration-300 block cursor-pointer"
          >
            <Image
              src="/icons/swiggy.png"
              alt="Swiggy"
              width={44}
              height={44}
              className="w-full h-full object-contain"
            />
          </a>

          {/* 3. Zomato Logo (No container, just the image) */}
          <a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on Zomato"
            title="Order on Zomato"
            className="w-10 h-10 sm:w-11 sm:h-11 hover:scale-110 active:scale-95 transition-transform duration-300 block cursor-pointer"
          >
            <Image
              src="/icons/zomato.png"
              alt="Zomato"
              width={44}
              height={44}
              className="w-full h-full object-contain"
            />
          </a>

          {/* 4. Instagram Logo (No container, just the image) */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            title="Follow on Instagram"
            className="w-10 h-10 sm:w-11 sm:h-11 hover:scale-110 active:scale-95 transition-transform duration-300 block cursor-pointer"
          >
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width={44}
              height={44}
              className="w-full h-full object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
