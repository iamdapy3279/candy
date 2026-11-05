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
  const rollingPinRef = useRef<SVGGElement>(null);

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

    const rollingPinPaths = initPaths(rollingPinRef.current);
    const whiskPaths = initPaths(whiskRef.current);

    if (lineRef.current) {
      const len = lineRef.current.getTotalLength();
      lineRef.current.style.strokeDasharray = `${len} ${len}`;
      lineRef.current.style.strokeDashoffset = prefersReduced ? "0" : `${len}`;
    }

    if (!prefersReduced) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#food-drinks-test",
          start: "top 80%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });

      // 1. Draw Rolling Pin on left
      if (rollingPinPaths.length > 0) {
        tl.to(rollingPinPaths, {
          strokeDashoffset: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "none",
        });
      }

      // 2. Draw sweeping connecting line
      if (lineRef.current) {
        tl.to(lineRef.current, { strokeDashoffset: 0, duration: 1.2, ease: "none" }, "-=0.3");
      }

      // 3. Draw Whisk on right
      if (whiskPaths.length > 0) {
        tl.to(whiskPaths, {
          strokeDashoffset: 0,
          duration: 1.0,
          stagger: 0.12,
          ease: "none",
        }, "-=0.2");
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
        {/* Desktop Procedural Flowing Line + ROLLING PIN on left */}
        <svg
          className="hidden lg:block w-full h-full overflow-visible"
          viewBox="0 0 1440 650"
          fill="none"
        >
          {/* ROLLING PIN (rolling-pin.svg) positioned on left framing card deck */}
          <g
            ref={rollingPinRef}
            transform="translate(60, 60) scale(0.85) rotate(-16)"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path id="barrel" d="M77 47 C94 33 223 33 240 47 L240 103 C222 117 95 117 77 103Z" />
            <path id="left-neck" d="M77 57 C55 57 45 48 32 42 C21 37 12 44 14 55 L20 75 C22 83 34 87 45 81 L77 94" />
            <path id="right-neck" d="M240 57 C262 57 272 48 285 42 C296 37 305 44 303 55 L297 75 C295 83 283 87 272 81 L240 94" />
          </g>

          <path
            ref={lineRef}
            d="M 280 180 C 380 230 440 380 580 410 C 720 440 880 370 1050 390 C 1180 410 1260 480 1380 510"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mobile Flowing Line + Mobile Rolling Pin */}
        <svg
          className="block lg:hidden w-full h-full overflow-visible"
          viewBox="0 0 390 650"
          fill="none"
        >
          {/* Mobile Rolling Pin */}
          <g
            transform="translate(20, 20) scale(0.55) rotate(-12)"
            stroke="#171717"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M77 47 C94 33 223 33 240 47 L240 103 C222 117 95 117 77 103Z" />
            <path d="M77 57 C55 57 45 48 32 42 C21 37 12 44 14 55 L20 75 C22 83 34 87 45 81 L77 94" />
            <path d="M240 57 C262 57 272 48 285 42 C296 37 305 44 303 55 L297 75 C295 83 283 87 272 81 L240 94" />
          </g>

          <path
            d="M 180 70 C 190 200 130 360 210 430 C 270 480 320 540 340 610"
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

            {/* Navigation Controls & Prominent Rolling Pin Artwork */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
              <div className="flex items-center gap-4">
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

              {/* Prominent Rolling Pin Artwork from Reference Pack */}
              <div className="relative w-36 sm:w-44 lg:w-48 aspect-[188/56] pointer-events-none select-none -rotate-6">
                <Image
                  src="/illustrations/exact-artwork/rolling-pin.svg"
                  alt="Rolling Pin"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
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

            {/* The Whisk Asset from Reference Pack */}
            <div className="hidden sm:flex shrink-0 items-center justify-center select-none pointer-events-none">
              <div className="relative w-28 h-36 lg:w-36 lg:h-44 aspect-[142/97] -rotate-12">
                <Image
                  src="/illustrations/exact-artwork/whisk.svg"
                  alt="Whisk"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
