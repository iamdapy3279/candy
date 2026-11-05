"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { websiteContent, DishItem } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RollingPinIllustration, WhiskIllustration } from "./FinalSvgIllustrations";

export default function FoodAndDrinksTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dishes = websiteContent.foodAndDrinks.dishes;

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
          trigger: "#food-drinks-test",
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
          trigger: "#food-drinks-test",
          start: "top 85%",
          end: "bottom 30%",
          scrub: 1,
        },
      });
    }
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
      id="food-drinks-test"
      className="py-12 md:py-20 bg-cream-100 relative overflow-visible isolate"
    >
      {/* ============================================================== */}
      {/* 1. DEDICATED BACKGROUND SVG LAYER (BEHIND CONTENT, z-0)         */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible select-none">
        {/* Desktop Procedural Flowing Line */}
        <svg
          className="hidden lg:block w-full h-full overflow-visible"
          viewBox="0 0 1440 650"
          fill="none"
        >
          <path
            ref={lineRef}
            d="M -20 180 C 180 230 340 380 480 410 C 620 440 880 370 1050 390 C 1180 410 1260 480 1380 510 C 1420 520 1450 530 1480 540"
            stroke="#111111"
            strokeWidth="1.9"
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
            ref={mobileLineRef}
            d="M 10 70 C 90 200 130 360 210 430 C 270 480 320 540 340 610"
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

            {/* Navigation Controls & Viewport-Led Rolling Pin Illustration from /final */}
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

              {/* Viewport-Led Procedural Rolling Pin Illustration from /final */}
              <div className="select-none -rotate-6">
                <RollingPinIllustration
                  className="w-36 sm:w-44 lg:w-48 aspect-[187/82]"
                  strokeColor="#111111"
                  strokeWidth={1.9}
                  startTrigger="top 85%"
                  endTrigger="center 50%"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Editorial Text & The WHISK Illustration from /final (Matching Mockup) */}
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

            {/* Viewport-Led Procedural Whisk Illustration from /final */}
            <div className="hidden sm:flex shrink-0 items-center justify-center select-none -rotate-12">
              <WhiskIllustration
                className="w-28 sm:w-36 lg:w-40 aspect-[142/97]"
                strokeColor="#111111"
                strokeWidth={1.9}
                startTrigger="top 85%"
                endTrigger="center 50%"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
