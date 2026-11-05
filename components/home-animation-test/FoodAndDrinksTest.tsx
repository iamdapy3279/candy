"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { websiteContent, DishItem } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FoodAndDrinksTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingDish, setExitingDish] = useState<DishItem | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const dishes = websiteContent.foodAndDrinks.dishes;

  const lineRef = useRef<SVGPathElement>(null);
  const whiskRef = useRef<SVGGElement>(null);

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
            trigger: "#food-drinks-test",
            start: "top 80%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        });
      }
    }

    if (whiskRef.current) {
      const paths = whiskRef.current.querySelectorAll<SVGPathElement>("path");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len} ${len}`;
        p.style.strokeDashoffset = prefersReduced ? "0" : `${len}`;
      });

      if (!prefersReduced) {
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: "#food-drinks-test",
            start: "top 70%",
            end: "bottom 25%",
            scrub: 0.8,
          },
        });
      }
    }
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setExitingDish(dishes[currentIndex]);
    setCurrentIndex((prev) => (prev + 1) % dishes.length);
    setTimeout(() => {
      setExitingDish(null);
      setIsAnimating(false);
    }, 450);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setExitingDish(dishes[currentIndex]);
    setCurrentIndex((prev) => (prev - 1 + dishes.length) % dishes.length);
    setTimeout(() => {
      setExitingDish(null);
      setIsAnimating(false);
    }, 450);
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
      id="food-drinks-test"
      className="py-12 md:py-20 bg-cream-100 relative overflow-visible isolate"
    >
      {/* ============================================================== */}
      {/* 1. DEDICATED BACKGROUND SVG LAYER (BEHIND CONTENT, z-0)         */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible select-none">
        {/* Desktop Procedural Flowing Line (sweeps from left under dish towards whisk) */}
        <svg
          className="hidden lg:block w-full h-full overflow-visible"
          viewBox="0 0 1440 650"
          fill="none"
        >
          <path
            ref={lineRef}
            d="M -30 220 C 180 230 320 440 540 450 C 760 460 920 380 1100 420 C 1220 440 1280 520 1380 540"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mobile Flowing Line */}
        <svg
          className="block lg:hidden w-full h-full overflow-visible"
          viewBox="0 0 390 650"
          fill="none"
        >
          <path
            d="M 20 50 C 40 220 120 380 220 440 C 300 490 340 550 350 620"
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

              {/* Active Foreground Card (Opaque, occludes the background SVG line) */}
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

          {/* Column 2: Editorial Text & The WHISK Illustration on Right (Matching Mockup) */}
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

            {/* The Whisk Asset (Angled on right, matching reference mockup) */}
            <div className="hidden sm:flex shrink-0 items-center justify-center select-none pointer-events-none">
              <svg
                viewBox="0 0 180 250"
                fill="none"
                className="w-24 h-36 lg:w-32 lg:h-48 transform -rotate-15 overflow-visible"
              >
                <g
                  ref={whiskRef}
                  stroke="#171717"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path id="handle" d="M79 116 C79 153 80 192 80 226 C80 238 88 244 97 237 C103 232 99 222 99 212 L97 116" />
                  <path id="wire-a" d="M79 118 C33 94 25 51 44 23 C60 1 81 15 89 42 C106 13 130 4 144 29 C160 58 139 96 97 118" />
                  <path id="wire-b" d="M89 118 C58 83 58 44 78 20 C86 10 92 23 89 42" />
                  <path id="wire-c" d="M97 118 C128 83 129 44 109 20 C101 10 95 23 97 42" />
                  <path id="wire-d" d="M79 118 C69 77 74 47 89 42 C104 47 109 77 97 118" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
