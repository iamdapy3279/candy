"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Clock, MapPin, Phone, ExternalLink } from "lucide-react";
import { websiteContent } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 1. House Icon from new SVG Asset Pack (for Salt Lake)
function HouseIcon({ className = "w-10 h-10 sm:w-12 sm:h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 150 140"
      fill="none"
      className={className}
      aria-label="Sector 2 Landmark"
      role="img"
    >
      <g stroke="#171717" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 66 L75 12 L138 66" />
        <path d="M28 57 V126 H122 V57" />
        <path d="M61 126 V83 H91 V126" />
        <path d="M43 77 H54 V89 H43Z M98 77 H109 V89 H98Z" />
        <path d="M75 12 V35 H94 V28" />
      </g>
    </svg>
  );
}

// 2. Car Icon from new SVG Asset Pack (for Alipore)
function CarIcon({ className = "w-12 h-8 sm:w-14 sm:h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 190 110"
      fill="none"
      className={className}
      aria-label="Valet Landmark"
      role="img"
    >
      <g stroke="#171717" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 69 L29 42 C33 32 42 27 54 27 H126 C138 27 147 34 153 46 L166 69 L174 75 V91 H15 V76Z" />
        <path d="M42 41 H132 L146 66 H31Z" />
        <circle cx="48" cy="90" r="12" />
        <circle cx="141" cy="90" r="12" />
        <path d="M18 70 H169" />
      </g>
    </svg>
  );
}

export default function LocationTest() {
  const locations = websiteContent.locations;
  const lineRef = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<SVGPathElement>(null);
  const croissantRef = useRef<SVGGElement>(null);
  const mobileCroissantRef = useRef<SVGGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Helper to init paths
    const initPaths = (el: Element | null) => {
      if (!el) return [];
      const paths = Array.from(el.querySelectorAll<SVGPathElement>("path"));
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len} ${len}`;
        p.style.strokeDashoffset = prefersReduced ? "0" : `${len}`;
      });
      return paths;
    };

    const desktopPaths = [
      ...(lineRef.current ? [lineRef.current] : []),
      ...initPaths(croissantRef.current),
    ];

    if (!prefersReduced && desktopPaths.length > 0) {
      desktopPaths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len} ${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#locations-test",
          start: "top 80%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });

      if (croissantRef.current) {
        tl.to(croissantRef.current.querySelectorAll("path"), {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "none",
        });
      }

      if (lineRef.current) {
        tl.to(lineRef.current, { strokeDashoffset: 0, duration: 1.5, ease: "none" }, "-=0.3");
      }
    }

    const mobilePaths = [
      ...(mobileLineRef.current ? [mobileLineRef.current] : []),
      ...initPaths(mobileCroissantRef.current),
    ];

    if (!prefersReduced && mobilePaths.length > 0) {
      mobilePaths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len} ${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      gsap.to(mobilePaths, {
        strokeDashoffset: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: "#locations-test",
          start: "top 85%",
          end: "bottom 35%",
          scrub: 0.8,
        },
      });
    }
  }, []);

  return (
    <section
      id="locations-test"
      className="py-12 md:py-20 bg-cream-100 relative overflow-visible isolate"
    >
      {/* ============================================================== */}
      {/* 1. DEDICATED BACKGROUND SVG LAYER (BEHIND CONTENT, z-0)         */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible select-none">
        {/* Desktop Procedural Flowing Line + CROISSANT ILLUSTRATION */}
        <svg
          className="hidden lg:block w-full h-full overflow-visible"
          viewBox="0 0 1440 900"
          fill="none"
        >
          {/* CROISSANT (croissant.svg) nestled in whitespace near top transition */}
          <g
            ref={croissantRef}
            transform="translate(180, 20) scale(0.85)"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              id="outline"
              d="M18 151 C36 111 61 72 99 51 C126 36 148 48 163 76 C182 41 210 17 245 21 C288 25 309 77 322 111 C333 137 343 151 351 160 C316 145 289 146 263 164 C235 183 210 197 185 184 C174 178 166 165 160 151 C140 179 113 190 86 177 C58 164 37 153 18 151Z"
            />
            <path id="fold-1" d="M99 51 C94 90 120 130 160 151" />
            <path id="fold-2" d="M145 49 C132 90 150 133 178 177" />
            <path id="fold-3" d="M163 76 C165 111 174 153 185 184" />
            <path id="fold-4" d="M245 21 C216 66 219 119 239 177" />
            <path id="fold-5" d="M290 63 C265 99 279 134 312 151" />
          </g>

          {/* Flowing Line weaving from croissant behind location cards */}
          <path
            ref={lineRef}
            d="M 480 160 C 650 170 820 110 980 110 C 1120 110 1250 160 1320 220 C 1400 290 1380 390 1280 440 C 1180 490 1020 460 920 520 C 800 590 740 680 770 760 C 800 840 920 860 1080 840 C 1240 820 1380 870 1480 890"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mobile Procedural Flowing Line + Mobile Croissant */}
        <svg
          className="block lg:hidden w-full h-full overflow-visible"
          viewBox="0 0 390 900"
          fill="none"
        >
          {/* Mobile Croissant */}
          <g
            ref={mobileCroissantRef}
            transform="translate(40, 30) scale(0.6)"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M18 151 C36 111 61 72 99 51 C126 36 148 48 163 76 C182 41 210 17 245 21 C288 25 309 77 322 111 C333 137 343 151 351 160 C316 145 289 146 263 164 C235 183 210 197 185 184 C174 178 166 165 160 151 C140 179 113 190 86 177 C58 164 37 153 18 151Z"
            />
            <path d="M99 51 C94 90 120 130 160 151" />
            <path d="M145 49 C132 90 150 133 178 177" />
            <path d="M163 76 C165 111 174 153 185 184" />
            <path d="M245 21 C216 66 219 119 239 177" />
            <path d="M290 63 C265 99 279 134 312 151" />
          </g>

          <path
            ref={mobileLineRef}
            d="M 240 120 C 300 160 330 220 310 300 C 280 390 190 440 150 520 C 110 610 120 720 180 790 C 230 840 310 880 340 940"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* 2. SECTION CONTENT WRAPPER (ABOVE SVG, z-10)                   */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading & Kolkata Architectural Illustration */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-14 pb-6 border-b border-[#211714]/10 gap-6 lg:gap-8">
          {/* Kolkata Architectural Illustration */}
          <div className="order-1 lg:order-2 w-full flex justify-center items-center my-3 mb-6 sm:my-5 sm:mb-8 lg:my-0 lg:w-auto lg:ml-auto shrink-0">
            <div className="relative w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[640px] xl:max-w-[680px] aspect-[1024/436] pointer-events-none select-none">
              <Image
                src="/locations/KolkataMonumentTransparent.png"
                alt="Two neighbourhoods in Kolkata — Salt Lake and Alipore"
                fill
                className="object-contain object-center lg:object-right-bottom"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 560px, 680px"
              />
            </div>
          </div>

          {/* Section Titles */}
          <div className="order-2 lg:order-1 shrink-0 max-w-sm lg:max-w-md">
            <span className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-2 sm:mb-3">
              FIND OUR BAKEHOUSES
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#293477] tracking-tight leading-[1.1]">
              Our Locations
            </h2>
            <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 mt-2 sm:mt-3 leading-relaxed">
              Two neighbourhoods in Kolkata. The same X&amp;Y experience.
            </p>
          </div>
        </div>

        {/* Prominent Artisanal Croissant from Reference Pack */}
        <div className="w-full flex justify-center lg:justify-start my-4 sm:my-6 pointer-events-none select-none">
          <div className="relative w-32 sm:w-44 lg:w-48 aspect-[178/83]">
            <Image
              src="/illustrations/exact-artwork/croissant.svg"
              alt="Artisanal Croissant"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 2-Column Locations Layout: Side-by-Side on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {locations.map((loc, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={loc.id}
                className={`flex flex-col justify-between h-full ${
                  !isFirst
                    ? "pt-10 border-t border-[#211714]/10 lg:pt-0 lg:border-t-0 lg:border-l lg:border-[#211714]/10 lg:pl-12 xl:pl-16"
                    : "lg:pr-4"
                }`}
              >
                {/* 1. Header with Landmark Description & SVG Asset Icon */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 pr-2">
                    <span className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-2">
                      {loc.area}
                    </span>
                    <h3 className="font-serif italic text-2xl sm:text-[26px] lg:text-[28px] font-medium text-navy-800 leading-snug">
                      {loc.landmark}
                    </h3>
                  </div>

                  {/* SVG Asset: House for Salt Lake, Car for Alipore */}
                  <div className="shrink-0 flex items-center justify-center pt-1">
                    {isFirst ? (
                      <HouseIcon className="w-10 h-10 sm:w-11 sm:h-11" />
                    ) : (
                      <CarIcon className="w-12 h-7 sm:w-13 sm:h-8" />
                    )}
                  </div>
                </div>

                {/* 2. Photograph (Opaque, occludes the background SVG line) */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-elevated border border-[#E8DCCB] mb-6 bg-cream-200">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                </div>

                {/* 3. Address & Hours */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-sans text-[11px] uppercase tracking-wider text-charcoal-800/60 font-semibold block">
                        Address
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-charcoal-800 font-medium">
                        {loc.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-gold-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-sans text-[11px] uppercase tracking-wider text-charcoal-800/60 font-semibold block">
                        Hours
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-charcoal-800 font-medium">
                        {loc.hours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-gold-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-sans text-[11px] uppercase tracking-wider text-charcoal-800/60 font-semibold block">
                        Telephone
                      </span>
                      <a
                        href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
                        className="font-sans text-xs sm:text-sm text-charcoal-800 font-medium hover:text-gold-700 transition-colors"
                      >
                        {loc.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* 4. Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-sans text-xs uppercase tracking-wider font-semibold transition-all active:scale-95 shadow-xs"
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={13} />
                  </a>

                  <a
                    href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-charcoal-800/20 hover:border-charcoal-800 text-charcoal-800 font-sans text-xs uppercase tracking-wider font-semibold transition-all active:scale-95 bg-white/50"
                  >
                    Call Outlet
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
