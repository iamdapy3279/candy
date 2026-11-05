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
  const cupRef = useRef<SVGGElement>(null);
  const steamRef = useRef<SVGGElement>(null);
  const mobileCupRef = useRef<SVGGElement>(null);

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
      ...initPaths(cupRef.current),
      ...initPaths(steamRef.current),
    ];

    if (!prefersReduced && desktopPaths.length > 0) {
      desktopPaths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len} ${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#philosophy-test",
          start: "top 80%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });

      if (lineRef.current) {
        tl.to(lineRef.current, { strokeDashoffset: 0, duration: 1.2, ease: "none" });
      }
      if (steamRef.current) {
        tl.to(steamRef.current.querySelectorAll("path"), {
          strokeDashoffset: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "none",
        }, "-=0.3");
      }
      if (cupRef.current) {
        tl.to(cupRef.current.querySelectorAll("path"), {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "none",
        }, "-=0.2");
      }
    }

    // Mobile stroke animation
    const mobilePaths = [
      ...(mobileLineRef.current ? [mobileLineRef.current] : []),
      ...initPaths(mobileCupRef.current),
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
          trigger: "#philosophy-test",
          start: "top 85%",
          end: "bottom 35%",
          scrub: 0.8,
        },
      });
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
        {/* Desktop Procedural SVG Flowing Line + COFFEE CUP WITH SAUCER & STEAM */}
        <svg
          className="hidden lg:block w-full h-full overflow-visible"
          viewBox="0 0 1440 700"
          fill="none"
        >
          {/* Flowing Line */}
          <path
            ref={lineRef}
            d="M -30 110 C 140 100 130 280 180 390 C 230 500 320 570 480 560 C 620 550 670 440 820 410 C 960 380 1040 340 1120 280 C 1170 240 1200 200 1220 160"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 
            COFFEE CUP (cup.svg) + STEAM (steam.svg)
            Positioned in the upper-right whitespace of Philosophy
          */}
          <g transform="translate(1080, 50) scale(0.95)">
            {/* Steam Trails */}
            <g ref={steamRef} stroke="#171717" strokeWidth="2.2" strokeLinecap="round">
              <path id="steam-1" d="M75 55 C49 25 92 4 71 -27 C57 -47 59 -66 74 -87" />
              <path id="steam-2" d="M116 55 C89 24 132 0 110 -32 C95 -54 102 -74 118 -93" />
              <path id="steam-3" d="M157 55 C132 27 172 6 153 -22 C140 -41 145 -60 159 -76" />
            </g>

            {/* Coffee Cup with Saucer, Rim, Body, Handle & Coffee Surface */}
            <g ref={cupRef} stroke="#171717" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path id="rim" d="M35 65 C72 48 183 48 220 65 C183 83 72 83 35 65Z"/>
              <path id="coffee-surface" d="M57 66 C92 76 163 76 198 66"/>
              <path id="body" d="M40 67 C45 110 56 153 78 169 C95 181 160 181 177 169 C199 153 210 110 215 67"/>
              <path id="handle" d="M215 87 C252 77 264 100 253 128 C245 149 224 154 199 143"/>
              <path id="saucer" d="M13 180 C66 197 194 197 247 180 C224 204 39 207 13 180Z"/>
            </g>
          </g>

          {/* Continuation line exiting saucer base towards Locations */}
          <path
            d="M 1240 230 C 1280 270 1340 330 1480 340"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mobile Procedural SVG Line + Compact Coffee Cup */}
        <svg
          className="block lg:hidden w-full h-full overflow-visible"
          viewBox="0 0 390 700"
          fill="none"
        >
          <path
            ref={mobileLineRef}
            d="M 15 30 C 35 150 25 280 85 360 C 135 440 200 480 240 500"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Mobile Coffee Cup */}
          <g ref={mobileCupRef} transform="translate(210, 470) scale(0.65)" stroke="#171717" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M35 65 C72 48 183 48 220 65 C183 83 72 83 35 65Z"/>
            <path d="M57 66 C92 76 163 76 198 66"/>
            <path d="M40 67 C45 110 56 153 78 169 C95 181 160 181 177 169 C199 153 210 110 215 67"/>
            <path d="M215 87 C252 77 264 100 253 128 C245 149 224 154 199 143"/>
            <path d="M13 180 C66 197 194 197 247 180 C224 204 39 207 13 180Z"/>
          </g>
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
