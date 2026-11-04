"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { websiteContent, DishItem } from "@/lib/content";
import GlowingBorder from "@/components/ui/GlowingBorder";

export default function FoodAndDrinks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingDish, setExitingDish] = useState<DishItem | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const dishes = websiteContent.foodAndDrinks.dishes;

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

  // Non-blocking in-memory pre-warm of carousel dishes for zero-latency card swaps
  useEffect(() => {
    if (typeof window !== "undefined") {
      dishes.forEach((dish) => {
        const img = new window.Image();
        img.src = dish.image;
      });
    }
  }, [dishes]);

  return (
    <section id="food-drinks" className="py-12 md:py-16 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* 2-Column Stacked Carousel & Clean Editorial Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive 3D Cinematic Card Deck */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* The 3D Stack Container (GPU-accelerated perspective) */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] [perspective:1200px] select-none [transform:translateZ(0)]">
              
              {/* Slot 2: Deepest Background Photograph (Third dish) */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden border border-[#E8DCCB] shadow-md bg-cream-200 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
                  className="object-cover brightness-90"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-[#211714]/15" />
              </div>

              {/* Slot 1: Midground Background Photograph (Second dish) */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden border border-[#E8DCCB] shadow-lg bg-cream-200 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  zIndex: 20,
                  transform: "translate3d(12px, 7px, 0) scale(0.965) rotate(2deg)",
                  opacity: 0.88,
                }}
              >
                <Image
                  src={secondDish.image}
                  alt={secondDish.name}
                  fill
                  className="object-cover brightness-95"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-[#211714]/10" />
              </div>

              {/* Active Foreground Photograph with Spring Handling & Glowing Travelling Light Beam */}
              <motion.div
                key={`front-${currentDish.id}`}
                initial={{
                  opacity: 0.85,
                  scale: 0.965,
                  x: direction > 0 ? 12 : -12,
                  y: direction > 0 ? 7 : -7,
                  rotate: direction > 0 ? 2 : -2,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 z-30 cursor-pointer [transform:translateZ(0)] will-change-transform"
                onClick={handleNext}
                onPanEnd={handlePanEnd}
              >
                <GlowingBorder
                  className="w-full h-full shadow-2xl"
                  borderWidth={2}
                  borderRadius="1rem"
                  duration={8}
                  glowIntensity="subtle"
                  beamColor="#D4A34A"
                >
                  <div className="relative w-full h-full overflow-hidden bg-cream-200">
                    <Image
                      src={currentDish.image}
                      alt={currentDish.name}
                      fill
                      className="object-cover select-none pointer-events-none transition-transform duration-500 hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 100vw, 420px"
                    />
                  </div>
                </GlowingBorder>
              </motion.div>

              {/* Exiting Card: Physically lifts, tilts, and sweeps smoothly away */}
              {exitingDish && (
                <motion.div
                  key={`exiting-${exitingDish.id}`}
                  initial={{ scale: 1, x: 0, y: 0, rotate: 0, opacity: 1 }}
                  animate={{
                    x: direction > 0 ? 70 : -70,
                    y: -18,
                    rotate: direction > 0 ? 5 : -5,
                    scale: 0.94,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 z-40 pointer-events-none rounded-2xl overflow-hidden shadow-2xl bg-cream-200 [transform:translateZ(0)] will-change-transform"
                >
                  <Image
                    src={exitingDish.image}
                    alt={exitingDish.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                </motion.div>
              )}

            </div>

            {/* Stationary Navigation Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                aria-label="Previous signature dish"
                className="w-12 h-12 rounded-full border border-[#211714]/20 bg-white hover:bg-gold-500 hover:border-gold-500 text-navy-800 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow active:scale-95"
              >
                <ArrowLeft size={18} />
              </button>

              {/* Progress counter */}
              <span className="font-sans text-xs font-semibold text-navy-800 tracking-widest px-2 select-none">
                0{currentIndex + 1} / 0{dishes.length}
              </span>

              <button
                onClick={handleNext}
                aria-label="Next signature dish"
                className="w-12 h-12 rounded-full border border-[#211714]/20 bg-white hover:bg-gold-500 hover:border-gold-500 text-navy-800 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow active:scale-95"
              >
                <ArrowRight size={18} />
              </button>
            </div>

          </div>

          {/* Right Column: In-Sync Choreographed Editorial Text */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-start max-w-md w-full text-left"
              >
                {/* 1. Category Tagline */}
                <span className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-3">
                  {currentDish.tagline}
                </span>

                {/* 2. Dish Title */}
                <h3 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-medium text-navy-800 leading-[1.05] tracking-[-0.02em] mb-4">
                  {currentDish.name}
                </h3>

                {/* 3. Description */}
                <p className="font-serif text-base sm:text-lg text-charcoal-800 leading-relaxed mb-6">
                  {currentDish.description}
                </p>

                {/* 4. Gold Divider & Quotation (Visible on both Mobile and Desktop) */}
                <div className="w-full">
                  <div className="h-[2px] w-14 bg-gold-500 mb-6 mx-0" />

                  <p className="font-serif italic text-base sm:text-lg font-medium text-navy-800 leading-relaxed mb-3">
                    “{currentDish.doodleCaption ||
                      "Every noodle is infused with house-smoked chilli oil and rich aromatics."}”
                  </p>

                  <p className="font-serif text-sm sm:text-base text-charcoal-800/80 leading-relaxed">
                    Every morning, our pastry and culinary team prepares each component from scratch using heirloom techniques and zero shortcuts.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
