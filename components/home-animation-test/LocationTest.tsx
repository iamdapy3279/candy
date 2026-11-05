"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Clock, MapPin, Phone, ExternalLink } from "lucide-react";
import { websiteContent } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CroissantIllustration } from "./FinalSvgIllustrations";

export default function LocationTest() {
  const locations = websiteContent.locations;
  const lineRef = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced && lineRef.current) {
      const len = lineRef.current.getTotalLength();
      lineRef.current.style.strokeDasharray = `${len} ${len}`;
      lineRef.current.style.strokeDashoffset = `${len}`;

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#locations-test",
          start: "top 85%",
          end: "bottom 30%",
          scrub: 1,
        },
      });
    }

    if (!prefersReduced && mobileLineRef.current) {
      const len = mobileLineRef.current.getTotalLength();
      mobileLineRef.current.style.strokeDasharray = `${len} ${len}`;
      mobileLineRef.current.style.strokeDashoffset = `${len}`;

      gsap.to(mobileLineRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#locations-test",
          start: "top 85%",
          end: "bottom 30%",
          scrub: 1,
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
        {/* Desktop Procedural Flowing Line */}
        <svg
          className="hidden lg:block w-full h-full overflow-visible"
          viewBox="0 0 1440 900"
          fill="none"
        >
          <path
            ref={lineRef}
            d="M -20 160 C 250 170 520 110 780 110 C 1020 110 1200 160 1320 220 C 1400 290 1380 390 1280 440 C 1180 490 1020 460 920 520 C 800 590 740 680 770 760 C 800 840 920 860 1080 840 C 1240 820 1380 870 1480 890"
            stroke="#111111"
            strokeWidth="1.9"
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
            d="M 10 120 C 80 160 180 220 210 300 C 240 390 190 440 150 520 C 110 610 120 720 180 790 C 230 840 310 880 340 940"
            stroke="#111111"
            strokeWidth="1.9"
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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-6 border-b border-[#211714]/10 gap-6 lg:gap-8">
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

        {/* Viewport-Led Procedural Croissant Illustration from /final */}
        <div className="w-full flex justify-center lg:justify-start my-4 sm:my-6 select-none">
          <CroissantIllustration
            className="w-36 sm:w-48 lg:w-56 aspect-[178/83]"
            strokeColor="#111111"
            strokeWidth={1.9}
            startTrigger="top 85%"
            endTrigger="center 50%"
          />
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
                {/* 1. Header with Landmark Description */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 pr-2">
                    <span className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-2">
                      {loc.area}
                    </span>
                    <h3 className="font-serif italic text-2xl sm:text-[26px] lg:text-[28px] font-medium text-navy-800 leading-snug">
                      {loc.landmark}
                    </h3>
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
