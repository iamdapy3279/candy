"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { websiteContent } from "@/lib/content";
import GlowingBorder from "@/components/ui/GlowingBorder";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coffeeMugStrokes } from "./artworkStrokes";

export default function PhilosophyTest() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineInRef = useRef<SVGPathElement>(null);
  const lineOutRef = useRef<SVGPathElement>(null);
  const mugGroupRef = useRef<SVGGElement>(null);

  // Mobile refs
  const mobileLineInRef = useRef<SVGPathElement>(null);
  const mobileLineOutRef = useRef<SVGPathElement>(null);
  const mobileMugGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Helper to setup stroke dasharray/offset
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
      const mugPaths = mugGroupRef.current
        ? Array.from(mugGroupRef.current.querySelectorAll<SVGPathElement>("path"))
        : [];
      mugPaths.forEach(prepPath);

      if (sectionRef.current && lineInRef.current && lineOutRef.current && mugPaths.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center 45%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Step 1: The black ink line flows through whitespace toward the coffee mug
        tl.to(lineInRef.current, { strokeDashoffset: 0, duration: 1.6, ease: "none" });

        // Step 2: The ink line sequentially draws each stroke of the coffee mug
        mugPaths.forEach((path) => {
          tl.to(path, { strokeDashoffset: 0, duration: 0.45, ease: "none" });
        });

        // Step 3: The ink line exits the mug and continues its journey towards Locations
        tl.to(lineOutRef.current, { strokeDashoffset: 0, duration: 1.4, ease: "none" });
      }

      // Mobile Setup
      prepPath(mobileLineInRef.current);
      prepPath(mobileLineOutRef.current);
      const mobileMugPaths = mobileMugGroupRef.current
        ? Array.from(mobileMugGroupRef.current.querySelectorAll<SVGPathElement>("path"))
        : [];
      mobileMugPaths.forEach(prepPath);

      if (sectionRef.current && mobileLineInRef.current && mobileLineOutRef.current && mobileMugPaths.length > 0) {
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
        mobileMugPaths.forEach((path) => {
          mobileTl.to(path, { strokeDashoffset: 0, duration: 0.4, ease: "none" });
        });
        mobileTl.to(mobileLineOutRef.current, { strokeDashoffset: 0, duration: 1.2, ease: "none" });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy-test"
      className="py-12 md:py-20 bg-cream-100 relative overflow-visible isolate"
    >
      {/* ============================================================== */}
      {/* 1. DEDICATED CONTINUOUS INK STROKE CANVAS (BEHIND CONTENT, z-0)*/}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible select-none">
        {/* Desktop Canvas: Continuous ink line drawing the Coffee Mug */}
        <svg
          className="hidden lg:block w-full h-full overflow-visible"
          viewBox="0 0 1440 720"
          fill="none"
        >
          {/* A. Entrance Line: Sweeps through whitespace, flows directly into Mug rim */}
          <path
            ref={lineInRef}
            d="M -20 110 C 140 100 130 280 180 390 C 230 500 320 570 480 560 C 620 550 670 440 820 410 C 940 380 990 260 1080 180 C 1110 150 1120 125 1142.9 108.8"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* B. The Coffee Mug: Drawn sequentially stroke by stroke by the ink line */}
          <g
            ref={mugGroupRef}
            transform="translate(1030, 80) scale(1.05)"
            stroke="#111111"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {coffeeMugStrokes.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {/* C. Exit Line: Seamlessly flows out of saucer edge towards Locations */}
          <path
            ref={lineOutRef}
            d="M 1151.8 146.2 C 1220 200 1300 320 1460 380"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mobile Canvas: Compact flowing line physically drawing the Coffee Mug */}
        <svg
          className="block lg:hidden w-full h-full overflow-visible"
          viewBox="0 0 390 720"
          fill="none"
        >
          <path
            ref={mobileLineInRef}
            d="M 10 30 C 35 120 25 240 75 320 C 110 375 160 410 208.5 423.8"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g
            ref={mobileMugGroupRef}
            transform="translate(190, 405) scale(0.68)"
            stroke="#111111"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {coffeeMugStrokes.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          <path
            ref={mobileLineOutRef}
            d="M 268.8 449.2 C 290 490 320 560 350 660"
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

              {/* Floating Seal Badge */}
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

          {/* Right Column: Editorial Text */}
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
