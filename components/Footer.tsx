"use client";

import { websiteContent } from "@/lib/content";

export default function Footer() {
  const instagramUrl =
    websiteContent.footer?.instagram?.url || "https://www.instagram.com/xandy.india/";

  return (
    <footer
      aria-label="Footer"
      className="bg-cream-100 pt-16 sm:pt-20 md:pt-24 pb-0 relative overflow-hidden select-none transition-colors w-full flex flex-col items-center justify-between"
    >
      {/* Top Centered Content: Description Text & Tiny Buttons */}
      <div className="max-w-2xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
        {/* Brand Description */}
        <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed max-w-xl mx-auto">
          Where every table is yours. An artisanal bakehouse &amp; bistro in Kolkata crafted for mornings, lingering lunches, and slow evenings.
        </p>

        {/* Tiny Buttons in Words (Instagram, Zomato, Swiggy) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-7">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-[#211714]/25 hover:border-[#211714] bg-transparent hover:bg-[#211714] text-[#211714] hover:text-white font-sans text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Instagram
          </a>
          <a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-[#211714]/25 hover:border-[#211714] bg-transparent hover:bg-[#211714] text-[#211714] hover:text-white font-sans text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Zomato
          </a>
          <a
            href="https://www.swiggy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-[#211714]/25 hover:border-[#211714] bg-transparent hover:bg-[#211714] text-[#211714] hover:text-white font-sans text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Swiggy
          </a>
        </div>
      </div>

      {/* Giant Cut-Off Brand Name at Bottom */}
      <div className="w-full flex justify-center mt-10 sm:mt-14 md:mt-16 overflow-hidden pointer-events-none select-none">
        <span className="font-sans font-bold text-[17vw] sm:text-[18vw] leading-[0.72] tracking-[0.02em] uppercase text-[#E8DCCB] whitespace-nowrap translate-y-[22%] sm:translate-y-[25%] block">
          X &amp; Y Cafe
        </span>
      </div>
    </footer>
  );
}
