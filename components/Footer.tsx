"use client";

import Link from "next/link";
import { websiteContent } from "@/lib/content";

export default function Footer() {
  const instagramUrl =
    websiteContent.footer?.instagram?.url || "https://www.instagram.com/xandy.india/";

  return (
    <footer
      aria-label="Footer"
      className="bg-cream-100 py-6 sm:py-8 select-none transition-colors w-full"
    >
      <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
        {/* Desktop / Tablet View (Spread edge-to-edge: Instagram on far left, Links & Button on far right) */}
        <div className="hidden sm:flex items-center justify-between w-full gap-6">
          {/* Far Left: Instagram Icon */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="w-9 h-9 rounded-full bg-[#211714] text-white hover:bg-gold-500 hover:text-[#211714] flex items-center justify-center transition-colors duration-200 active:scale-95 cursor-pointer shrink-0"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Far Right: Location, Philosophy & Order Catering */}
          <div className="flex items-center gap-6 lg:gap-8 shrink-0">
            <Link
              href="#locations"
              className="font-serif font-bold text-base lg:text-[17px] text-[#211714] hover:text-gold-700 transition-colors tracking-tight"
            >
              Location
            </Link>
            <Link
              href="#philosophy"
              className="font-serif font-bold text-base lg:text-[17px] text-[#211714] hover:text-gold-700 transition-colors tracking-tight"
            >
              Philosophy
            </Link>

            <a
              href="#locations"
              className="inline-block bg-[#211714] hover:bg-gold-500 hover:text-[#211714] text-white font-serif font-bold text-base lg:text-[17px] px-6 py-2.5 transition-colors duration-200 cursor-pointer shadow-xs"
            >
              Order Catering
            </a>
          </div>
        </div>

        {/* Mobile View: Centered Instagram, Links & Button */}
        <div className="flex sm:hidden flex-col items-center gap-5 py-2">
          {/* Centered Instagram Icon */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="w-9 h-9 rounded-full bg-[#211714] text-white hover:bg-gold-500 hover:text-[#211714] flex items-center justify-center transition-colors duration-200 active:scale-95 cursor-pointer shrink-0"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Links Row */}
          <div className="flex items-center justify-center gap-6 text-center">
            <Link
              href="#locations"
              className="font-serif font-bold text-base text-[#211714] hover:text-gold-700 transition-colors"
            >
              Location
            </Link>
            <Link
              href="#philosophy"
              className="font-serif font-bold text-base text-[#211714] hover:text-gold-700 transition-colors"
            >
              Philosophy
            </Link>
          </div>

          {/* Order Catering Button */}
          <div className="w-full flex justify-center pt-1">
            <a
              href="#locations"
              className="inline-block bg-[#211714] hover:bg-gold-500 hover:text-[#211714] text-white font-serif font-bold text-base px-8 py-2.5 transition-colors duration-200 cursor-pointer shadow-xs text-center"
            >
              Order Catering
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
