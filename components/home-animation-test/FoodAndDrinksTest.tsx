"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { websiteContent } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { rollingPinStrokes, whiskStrokes } from "./artworkStrokes";

export default function FoodAndDrinksTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dishes = websiteContent.foodAndDrinks.dishes;

  const sectionRef = useRef<HTMLElement>(null);
  const lineInRef = useRef<SVGPathElement>(null);
  const lineMidRef = useRef<SVGPathElement>(null);
  const lineOutRef = useRef<SVGPathElement>(null);
  const rollingPinGroupRef = useRef<SVGGElement>(null);
  const whiskGroupRef = useRef<SVGGElement>(null);

  // Mobile refs
  const mobileLineInRef = useRef<SVGPathElement>(null);
  const mobileLineOutRef = useRef<SVGPathElement>(null);
  const mobilePinGroupRef = useRef<SVGGElement>(null);
  const mobileWhiskGroupRef = useRef<SVGGElement>(null);

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
      prepPath(lineMidRef.current);
      prepPath(lineOutRef.current);
      const pinPaths = rollingPinGroupRef.current
        ? Array.from(rollingPinGroupRef.current.querySelectorAll<SVGPathElement>("path"))
        : [];
      pinPaths.forEach(prepPath);
      const whiskPaths = whiskGroupRef.current
        ? Array.from(whiskGroupRef.current.querySelectorAll<SVGPathElement>("path"))
        : [];
      whiskPaths.forEach(prepPath);

      if (sectionRef.current && lineInRef.current && lineMidRef.current && lineOutRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center 45%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // 1. Line enters toward the Rolling Pin on the left
        tl.to(lineInRef.current, { strokeDashoffset: 0, duration: 1.2, ease: "none" });

        // 2. Line physically draws the Rolling Pin stroke by stroke
        pinPaths.forEach((path) => {
          tl.to(path, { strokeDashoffset: 0, duration: 0.5, ease: "none" });
        });

        // 3. Line sweeps underneath the card deck through center whitespace to the Whisk
        tl.to(lineMidRef.current, { strokeDashoffset: 0, duration: 1.4, ease: "none" });

        // 4. Line physically draws the Whisk stroke by stroke
        whiskPaths.forEach((path) => {
          tl.to(path, { strokeDashoffset: 0, duration: 0.4, ease: "none" });
        });

        // 5. Line exits downward towards the press section
        tl.to(lineOutRef.current, { strokeDashoffset: 0, duration: 1.2, ease: "none" });
      }

      // Mobile Setup
      prepPath(mobileLineInRef.current);
      prepPath(mobileLineOutRef.current);
      const mobilePinPaths = mobilePinGroupRef.current
        ? Array.from(mobilePinGroupRef.current.querySelectorAll<SVGPathElement>("path"))
        : [];
      mobilePinPaths.forEach(prepPath);
      const mobileWhiskPaths = mobileWhiskGroupRef.current
        ? Array.from(mobileWhiskGroupRef.current.querySelectorAll<SVGPathElement>("path"))
        : [];
      mobileWhiskPaths.forEach(prepPath);

      if (sectionRef.current && mobileLineInRef.current && mobileLineOutRef.current) {
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        mobileTl.to(mobileLineInRef.current, { strokeDashoffset: 0, duration: 1.2, ease: "none" });
        mobilePinPaths.forEach((path) => {
          mobileTl.to(path, { strokeDashoffset: 0, duration: 0.4, ease: "none" });
        });
        mobileWhiskPaths.forEach((path) => {
          mobileTl.to(path, { strokeDashoffset: 0, duration: 0.35, ease: "none" });
        });
        mobileTl.to(mobileLineOutRef.current, { strokeDashoffset: 0, duration: 1.2, ease: "none" });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dishes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + dishes.length) % dishes.length);
  };

  const handlePanEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -35) {
      handleNext();
    } else if (info.offset.x > 35) {
      handlePrev();
    }
  };

  const currentDish = dishes[currentIndex];
  const secondDish = dishes[(currentIndex + 1) % dishes.length];
  const thirdDish = dishes[(currentIndex + 2) % dishes.length];

  return (
    <section
      ref={sectionRef}
      id="food-drinks-test"
      className="py-12 md:py-20 bg-cream-100 relative overflow-visible isolate"
    >
      {/* ============================================================== */}
      {/* 1. DEDICATED CONTINUOUS INK STROKE CANVAS (BEHIND CONTENT, z-0)*/}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible select-none">
        {/* Desktop Canvas: Continuous ink line drawing Rolling Pin & Whisk */}
        <svg
          className="hidden lg:block w-full h-full overflow-visible"
          viewBox="0 0 1440 750"
          fill="none"
        >
          {/* A. Entrance Line into Rolling Pin on left */}
          <path
            ref={lineInRef}
            d="M -20 180 C 40 160 80 120 147 122"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* B. The Rolling Pin: Drawn stroke by stroke */}
          <g
            ref={rollingPinGroupRef}
            transform="translate(100, 60) scale(1.05) rotate(-10)"
            stroke="#111111"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {rollingPinStrokes.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {/* C. Connecting Line: Sweeps from Rolling Pin under cards to Whisk */}
          <path
            ref={lineMidRef}
            d="M 270 125 C 380 230 460 480 650 490 C 840 500 980 410 1080 340 C 1130 300 1150 250 1175 208"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* D. The Whisk: Drawn stroke by stroke on the right */}
          <g
            ref={whiskGroupRef}
            transform="translate(1160, 150) scale(1.1) rotate(-12)"
            stroke="#111111"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {whiskStrokes.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {/* E. Exit Line: Continues down towards the Press section */}
          <path
            ref={lineOutRef}
            d="M 1275 265 C 1320 340 1370 490 1460 540"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mobile Canvas: Compact flowing line physically drawing Rolling Pin & Whisk */}
        <svg
          className="block lg:hidden w-full h-full overflow-visible"
          viewBox="0 0 390 750"
          fill="none"
        >
          <path
            ref={mobileLineInRef}
            d="M 10 70 C 25 50 35 45 45 52"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g
            ref={mobilePinGroupRef}
            transform="translate(35, 40) scale(0.6) rotate(-8)"
            stroke="#111111"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {rollingPinStrokes.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          <g
            ref={mobileWhiskGroupRef}
            transform="translate(240, 520) scale(0.65) rotate(-15)"
            stroke="#111111"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {whiskStrokes.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          <path
            ref={mobileLineOutRef}
            d="M 140 85 C 180 180 130 360 210 430 C 240 460 270 480 290 530 M 310 600 C 330 650 340 700 350 740"
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
          {/* Column 1: Interactive 3D Cinematic Card Deck */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] [perspective:1200px] select-none [transform:translateZ(0)]">
              {/* Slot 2: Third dish */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden border border-[#E8DCCB] shadow-md bg-cream-200 pointer-events-none transition-all duration-500"
                style={{
                  zIndex: 10,
                  transform: "translate3d(24px, 14px, 0) scale(0.925) rotate(4deg)",
                  opacity: 0.65,
                }}
              >
                <Image
                  src={thirdDish.image}
                  alt={thirdDish.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>

              {/* Slot 1: Second dish */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden border border-[#E8DCCB] shadow-lg bg-cream-200 pointer-events-none transition-all duration-500"
                style={{
                  zIndex: 20,
                  transform: "translate3d(12px, 7px, 0) scale(0.96) rotate(2deg)",
                  opacity: 0.85,
                }}
              >
                <Image
                  src={secondDish.image}
                  alt={secondDish.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>

              {/* Active Foreground Card */}
              <motion.div
                key={currentDish.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onPanEnd={handlePanEnd}
                className="absolute inset-0 z-30 rounded-2xl overflow-hidden shadow-2xl bg-cream-200 cursor-grab active:cursor-grabbing border border-white/40"
              >
                <Image
                  src={currentDish.image}
                  alt={currentDish.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                aria-label="Previous signature dish"
                className="w-12 h-12 rounded-full border border-[#211714]/20 bg-white hover:bg-gold-500 hover:border-gold-500 text-navy-800 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow active:scale-95 cursor-pointer"
              >
                <ArrowLeft size={18} />
              </button>

              <span className="font-sans text-xs font-semibold text-navy-800 tracking-widest px-2 select-none">
                0{currentIndex + 1} / 0{dishes.length}
              </span>

              <button
                onClick={handleNext}
                aria-label="Next signature dish"
                className="w-12 h-12 rounded-full border border-[#211714]/20 bg-white hover:bg-gold-500 hover:border-gold-500 text-navy-800 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow active:scale-95 cursor-pointer"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Column 2: Editorial Text */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex items-center justify-between gap-6">
            <div className="flex flex-col items-start max-w-md w-full text-left">
              <span className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-3">
                {currentDish.tagline}
              </span>

              <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#293477] leading-snug tracking-tight mb-3">
                {currentDish.name}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed mb-4">
                {currentDish.description}
              </p>

              <blockquote className="border-l-2 border-[#293477]/30 pl-4 py-1 italic font-serif text-sm sm:text-base text-charcoal-800/80 mb-6">
                &ldquo;{currentDish.doodleCaption ||
                  "Every morning, our pastry and culinary team prepares each component from scratch using heirloom techniques."}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
