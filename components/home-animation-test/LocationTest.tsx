"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Clock, MapPin, Phone, ExternalLink } from "lucide-react";
import { websiteContent } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { croissantStrokes } from "./artworkStrokes";

export default function LocationTest() {
  const locations = websiteContent.locations;
  const sectionRef = useRef<HTMLElement>(null);
  const lineInRef = useRef<SVGPathElement>(null);
  const lineOutRef = useRef<SVGPathElement>(null);
  const croissantGroupRef = useRef<SVGGElement>(null);

  // Mobile refs
  const mobileLineInRef = useRef<SVGPathElement>(null);
  const mobileLineOutRef = useRef<SVGPathElement>(null);
  const mobileCroissantGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Helper to setup stroke dasharray/offset
      const prepPath = (path: SVGPathElement | null) => {
        if (!path) return 0;
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len} ${len}`;
        path.style.strokeDashoffset = `${len}`;
        return len;
      };

      // Desktop Setup
      prepPath(lineInRef.current);
      prepPath(lineOutRef.current);
      const cPaths = croissantGroupRef.current
        ? Array.from(croissantGroupRef.current.querySelectorAll<SVGPathElement>("path"))
        : [];
      cPaths.forEach(prepPath);

      if (sectionRef.current && lineInRef.current && lineOutRef.current && cPaths.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center 45%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Step 1: The black ink line enters Locations and travels toward the Croissant
        tl.to(lineInRef.current, { strokeDashoffset: 0, duration: 1.5, ease: "none" });

        // Step 2: The ink line sequentially constructs the Croissant stroke by stroke
        cPaths.forEach((path) => {
          tl.to(path, { strokeDashoffset: 0, duration: 0.35, ease: "none" });
        });

        // Step 3: The ink line exits the Croissant and travels behind the location cards
        tl.to(lineOutRef.current, { strokeDashoffset: 0, duration: 1.6, ease: "none" });
      }

      // Mobile Setup
      prepPath(mobileLineInRef.current);
      prepPath(mobileLineOutRef.current);
      const mobileCPaths = mobileCroissantGroupRef.current
        ? Array.from(mobileCroissantGroupRef.current.querySelectorAll<SVGPathElement>("path"))
        : [];
      mobileCPaths.forEach(prepPath);

      if (sectionRef.current && mobileLineInRef.current && mobileLineOutRef.current && mobileCPaths.length > 0) {
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        mobileTl.to(mobileLineInRef.current, { strokeDashoffset: 0, duration: 1.4, ease: "none" });
        mobileCPaths.forEach((path) => {
          mobileTl.to(path, { strokeDashoffset: 0, duration: 0.3, ease: "none" });
        });
        mobileTl.to(mobileLineOutRef.current, { strokeDashoffset: 0, duration: 1.4, ease: "none" });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="locations-test"
      className="py-12 md:py-20 bg-cream-100 relative overflow-visible isolate"
    >
      {/* ============================================================== */}
      {/* 1. DEDICATED CONTINUOUS INK STROKE CANVAS (BEHIND CONTENT, z-0)*/}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible select-none">
        {/* Desktop Canvas: Continuous ink line drawing the Croissant */}
        <svg
          className="hidden lg:block w-full h-full overflow-visible"
          viewBox="0 0 1440 900"
          fill="none"
        >
          {/* A. Entrance Line: Sweeps through whitespace, flows into Croissant */}
          <path
            ref={lineInRef}
            d="M -20 120 C 60 70 120 40 217.9 89.1"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* B. The Croissant: Drawn sequentially stroke by stroke by the ink line */}
          <g
            ref={croissantGroupRef}
            transform="translate(180, 50) scale(1.15)"
            stroke="#111111"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {croissantStrokes.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {/* C. Exit Line: Continues from Croissant, weaves behind location cards */}
          <path
            ref={lineOutRef}
            d="M 311.1 128.2 C 450 170 650 160 720 250 C 760 380 680 500 720 620 C 760 740 860 820 1020 840 C 1220 860 1350 870 1460 890"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mobile Canvas: Compact flowing line physically drawing the Croissant */}
        <svg
          className="block lg:hidden w-full h-full overflow-visible"
          viewBox="0 0 390 900"
          fill="none"
        >
          <path
            ref={mobileLineInRef}
            d="M 10 60 C 25 40 45 35 60 48"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g
            ref={mobileCroissantGroupRef}
            transform="translate(45, 30) scale(0.65)"
            stroke="#111111"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {croissantStrokes.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          <path
            ref={mobileLineOutRef}
            d="M 120 74 C 180 120 220 220 210 320 C 190 440 150 560 180 700 C 210 800 280 850 340 920"
            stroke="#111111"
            strokeWidth="2"
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

        {/* 2-Column Locations Layout: Side-by-Side on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-8">
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
