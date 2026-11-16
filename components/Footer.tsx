"use client";

import { websiteContent } from "@/lib/content";

export default function Footer() {
  const instagramUrl =
    websiteContent.footer?.instagram?.url || "https://www.instagram.com/xandy.india/";

  return (
    <footer
      aria-label="Footer"
      className="bg-cream-100 pt-14 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-14 select-none transition-colors w-full flex flex-col items-center justify-between"
    >
      {/* Top Centered Content: Tag, Headline & Tiny Buttons */}
      <div className="max-w-2xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
        {/* Eyebrow Tag */}
        <span className="font-sans text-xs sm:text-[13px] tracking-[0.25em] uppercase text-gold-700 font-semibold block mb-2 sm:mb-3">
          FOLLOW YOUR HEART
        </span>

        {/* Headline */}
        <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-[#211714] tracking-tight leading-[1.18] max-w-md sm:max-w-lg text-center">
          Coffee tastes better <br className="hidden sm:inline" />
          with two.
        </h2>

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

      {/* Full Brand Name at Bottom */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 flex justify-center mt-10 sm:mt-12 md:mt-14 pointer-events-none select-none">
        <span className="font-sans font-bold text-[9vw] sm:text-[9.5vw] md:text-[10vw] lg:text-[120px] xl:text-[135px] leading-none tracking-[0.03em] sm:tracking-[0.05em] uppercase text-[#E8DCCB] whitespace-nowrap block text-center">
          X &amp; Y Cafe
        </span>
      </div>
    </footer>
  );
}
