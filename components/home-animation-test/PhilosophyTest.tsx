"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { websiteContent } from "@/lib/content";
import GlowingBorder from "@/components/ui/GlowingBorder";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PhilosophyTest() {
  const lineRef = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Desktop stroke animation
    if (lineRef.current) {
      const len = lineRef.current.getTotalLength();
      lineRef.current.style.strokeDasharray = `${len} ${len}`;
      lineRef.current.style.strokeDashoffset = prefersReduced ? "0" : `${len}`;

      if (!prefersReduced) {
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#philosophy-test",
            start: "top 80%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        });
      }
    }

    // Mobile stroke animation
    if (mobileLineRef.current) {
      const mLen = mobileLineRef.current.getTotalLength();
      mobileLineRef.current.style.strokeDasharray = `${mLen} ${mLen}`;
      mobileLineRef.current.style.strokeDashoffset = prefersReduced ? "0" : `${mLen}`;

      if (!prefersReduced) {
        gsap.to(mobileLineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#philosophy-test",
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
      id="philosophy-test"
      className="py-12 md:py-20 bg-cream-100 relative overflow-visible isolate"
    >
      {/* ============================================================== */}
      {/* 1. DEDICATED BACKGROUND SVG LAYER (BEHIND CONTENT, z-0)         */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible select-none">
        {/* Desktop Procedural SVG Flowing Line (hidden on mobile) */}
        <svg
          className="hidden lg:block w-full h-full overflow-visible"
          viewBox="0 0 1440 700"
          fill="none"
        >
          {/* 
            Trajectory from reference mockup:
            Enters from upper left margin -> curves down along left of cathedral arch ->
            sweeps under arch and seal badge -> curves across whitespace under narrative ->
            exits toward Locations section
          */}
          <path
            ref={lineRef}
            d="M -30 110 C 140 100 130 280 180 390 C 230 500 320 570 480 560 C 620 550 670 440 820 410 C 960 380 1120 460 1280 440 C 1370 430 1420 370 1490 380"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mobile Procedural SVG Line (mostly vertical, safe in margin) */}
        <svg
          className="block lg:hidden w-full h-full overflow-visible"
          viewBox="0 0 390 700"
          fill="none"
        >
          <path
            ref={mobileLineRef}
            d="M 15 30 C 35 150 25 320 85 430 C 135 520 220 560 280 610 C 320 640 335 670 345 720"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Cathedral Arch Photo Frame (Opaque, occludes the line naturally) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[460px] aspect-[4/5] bg-cream-100">
              <GlowingBorder
                className="relative w-full h-full shadow-elevated"
                borderWidth={3}
                borderRadius="9999px 9999px 1.5rem 1.5rem"
                innerBorderRadius="9999px 9999px 1.35rem 1.35rem"
                duration={8}
                glowIntensity="subtle"
                beamColor="#D4A34A"
              >
                <div className="relative w-full h-full overflow-hidden bg-cream-200">
                  <Image
                    src={websiteContent.philosophy.image}
                    alt="X&Y Bakehouse Warm Interior"
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, 460px"
                  />
                </div>
              </GlowingBorder>

              {/* Floating Seal Badge (Sits in front of the line) */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -right-4 sm:-right-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#293477] text-[#f2ba1e] flex flex-col items-center justify-center border-4 border-cream-100 shadow-xl z-20"
              >
                <div className="text-center px-2">
                  <span className="block font-serif text-[11px] sm:text-xs tracking-[0.25em] text-[#f2ba1e] font-bold uppercase">
                    X &amp; Y
                  </span>
                  <div className="w-8 h-[1px] bg-[#f2ba1e]/50 my-1 mx-auto" />
                  <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#f2ba1e] font-semibold">
                    Bakehouse
                  </span>
                  <span className="block font-sans text-[7px] tracking-[0.15em] uppercase text-[#f2ba1e]/85 mt-0.5 font-medium">
                    Est. 2024
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text (Clean, Classical Layout) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="philosophy-label block mb-4">
              {websiteContent.philosophy.tag}
            </span>

            <h2 className="hidden md:block philosophy-heading text-[#293477] mb-6">
              {websiteContent.philosophy.title}
            </h2>
            <h2 className="md:hidden philosophy-heading text-[#293477] text-3xl leading-[1.08] mb-4">
              {websiteContent.philosophy.mobileTitle || "Food Made With Pure Intention"}
            </h2>

            <p className="hidden md:block philosophy-body text-charcoal-800/90 mb-8 max-w-xl">
              {websiteContent.philosophy.description}
            </p>
            <p className="md:hidden philosophy-body text-charcoal-800/90 text-[0.875rem] leading-[1.45] mb-6 line-clamp-2">
              {websiteContent.philosophy.mobileDescription ||
                "At the heart of our restaurant is a deep love for authentic, sustainable cuisine."}
            </p>

            <div className="h-[2px] w-16 bg-gold-500 mb-6" />

            {/* Quote */}
            <p className="font-sans italic font-medium text-base sm:text-lg text-[#211714]">
              “The best cafe is the one you never want to leave.”
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
