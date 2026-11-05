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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (lineRef.current) {
      const len = lineRef.current.getTotalLength();
      lineRef.current.style.strokeDasharray = `${len} ${len}`;
      lineRef.current.style.strokeDashoffset = prefersReduced ? "0" : `${len}`;

      if (!prefersReduced) {
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#locations-test",
            start: "top 80%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        });
      }
    }

    if (mobileLineRef.current) {
      const mLen = mobileLineRef.current.getTotalLength();
      mobileLineRef.current.style.strokeDasharray = `${mLen} ${mLen}`;
      mobileLineRef.current.style.strokeDashoffset = prefersReduced ? "0" : `${mLen}`;

      if (!prefersReduced) {
        gsap.to(mobileLineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#locations-test",
            start: "top 85%",
            end: "bottom 35%",
            scrub: 0.8,
          },
        });
      }
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
        {/* Desktop Procedural Flowing Line (weaves behind the 2 location cards) */}
        <svg
          className="hidden lg:block w-full h-full overflow-visible"
          viewBox="0 0 1440 900"
          fill="none"
        >
          <path
            ref={lineRef}
            d="M 1480 30 C 1320 40 1180 120 980 110 C 820 100 680 180 580 250 C 470 320 370 290 260 360 C 150 430 80 550 110 660 C 140 760 300 810 500 790 C 700 770 910 820 1120 810 C 1290 800 1410 860 1490 890"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mobile Procedural Flowing Line */}
        <svg
          className="block lg:hidden w-full h-full overflow-visible"
          viewBox="0 0 390 900"
          fill="none"
        >
          <path
            ref={mobileLineRef}
            d="M 345 20 C 335 120 280 200 210 260 C 140 320 80 430 70 540 C 60 670 120 750 200 820 C 260 870 320 900 340 950"
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
