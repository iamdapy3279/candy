"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { websiteContent } from "@/lib/content";
import GlowingBorder from "@/components/ui/GlowingBorder";

export default function FoodAndDrinks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const dishes = websiteContent.foodAndDrinks.dishes;

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % dishes.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + dishes.length) % dishes.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const currentDish = dishes[currentIndex];
  const secondDish = dishes[(currentIndex + 1) % dishes.length];
  const thirdDish = dishes[(currentIndex + 2) % dishes.length];

  // Cinematic 3D Deck Variants for Active Foreground Card
  const activeCardVariants: Variants = {
    initial: (dir: number) => ({
      scale: 0.965,
      x: dir > 0 ? 14 : -24,
      y: dir > 0 ? 8 : 10,
      rotate: dir > 0 ? 2.5 : -2.5,
      opacity: 0.85,
      zIndex: 20,
    }),
    animate: {
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      zIndex: 30,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 22,
        mass: 0.85,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? [0, 75, 20] : [0, -75, -20],
      y: dir > 0 ? [0, -22, 14] : [0, -22, 14],
      rotate: dir > 0 ? [0, 6, 3.5] : [0, -6, -3.5],
      scale: [1, 1.03, 0.92],
      opacity: [1, 0.95, 0],
      zIndex: 10,
      transition: {
        duration: 0.85,
        times: [0, 0.35, 1],
        ease: [0.32, 0.72, 0, 1],
      },
    }),
  };

  return (
    <section id="food-drinks" className="py-24 md:py-36 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* 2-Column Stacked Carousel & Clean Editorial Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive 3D Cinematic Card Deck */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* The 3D Stack Container (1200px perspective) */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] [perspective:1200px] select-none">
              
              {/* Slot 2: Deepest Background Photograph (Third dish) */}
              <motion.div
                key={`slot2-${(currentIndex + 2) % dishes.length}`}
                initial={{ opacity: 0, scale: 0.88, x: 32, y: 20 }}
                animate={{ opacity: 0.65, scale: 0.925, x: 26, y: 15, rotate: 4.5 }}
                transition={{ type: "spring", stiffness: 140, damping: 22, delay: 0.05 }}
                className="absolute inset-0 rounded-2xl overflow-hidden border border-[#E8DCCB] shadow-md bg-cream-200 pointer-events-none"
                style={{ zIndex: 10 }}
              >
                <Image
                  src={thirdDish.image}
                  alt={thirdDish.name}
                  fill
                  className="object-cover brightness-90"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-[#211714]/15" />
              </motion.div>

              {/* Slot 1: Midground Background Photograph (Second dish) */}
              <motion.div
                key={`slot1-${(currentIndex + 1) % dishes.length}`}
                initial={{ opacity: 0.7, scale: 0.925, x: 26, y: 15, rotate: 4.5 }}
                animate={{ opacity: 0.88, scale: 0.965, x: 14, y: 8, rotate: 2.5 }}
                transition={{ type: "spring", stiffness: 150, damping: 22 }}
                className="absolute inset-0 rounded-2xl overflow-hidden border border-[#E8DCCB] shadow-lg bg-cream-200 pointer-events-none"
                style={{ zIndex: 15 }}
              >
                <Image
                  src={secondDish.image}
                  alt={secondDish.name}
                  fill
                  className="object-cover brightness-95"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-[#211714]/10" />
              </motion.div>

              {/* Active Foreground Photograph with Spring Handling & Glowing Travelling Light Beam */}
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={currentDish.id}
                  custom={direction}
                  variants={activeCardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
                >
                  {/* Subtle 3D Floating Idle Motion */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-full h-full"
                    onClick={handleNext}
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
                          className="object-cover pointer-events-none select-none transition-transform duration-700 hover:scale-105"
                          priority
                          sizes="(max-width: 768px) 100vw, 420px"
                        />
                      </div>
                    </GlowingBorder>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stationary Navigation Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                aria-label="Previous signature dish"
                className="w-12 h-12 rounded-full border border-[#211714]/20 bg-white hover:bg-gold-500 hover:border-gold-500 text-navy-800 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow active:scale-90"
              >
                <ArrowLeft size={18} />
              </button>

              {/* Progress counter */}
              <span className="font-sans text-xs font-semibold text-navy-800 tracking-widest px-2">
                0{currentIndex + 1} / 0{dishes.length}
              </span>

              <button
                onClick={handleNext}
                aria-label="Next signature dish"
                className="w-12 h-12 rounded-full border border-[#211714]/20 bg-white hover:bg-gold-500 hover:border-gold-500 text-navy-800 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow active:scale-90"
              >
                <ArrowRight size={18} />
              </button>
            </div>

          </div>

          {/* Right Column: Choreographed Text Transitions (Image leads -> Title -> Description -> Quote) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center lg:items-start max-w-md w-full"
              >
                {/* 1. Category Tagline - leads at t = 100ms */}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
                    },
                    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
                  }}
                  className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-3"
                >
                  {currentDish.tagline}
                </motion.span>

                {/* 2. Dish Title - reveals at t = 200ms with gentle upward transition */}
                <motion.h3
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                    },
                    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
                  }}
                  className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-medium text-navy-800 leading-[1.05] tracking-[-0.02em] mb-4"
                >
                  {currentDish.name}
                </motion.h3>

                {/* 3. Description - follows at t = 320ms */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] },
                    },
                    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
                  }}
                  className="font-serif text-base sm:text-lg text-charcoal-800 leading-relaxed mb-6"
                >
                  {currentDish.description}
                </motion.p>

                {/* 4. Gold Divider & Quotation - appears last at t = 450ms (Desktop / Tablet only) */}
                <div className="hidden md:block w-full">
                  <motion.div
                    variants={{
                      hidden: { scaleX: 0, opacity: 0 },
                      visible: {
                        scaleX: 1,
                        opacity: 1,
                        transition: { duration: 0.45, delay: 0.42, ease: "easeOut" },
                      },
                      exit: { opacity: 0, transition: { duration: 0.2 } },
                    }}
                    className="h-[2px] w-14 bg-gold-500 mb-6 origin-left mx-auto lg:mx-0"
                  />

                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
                      },
                      exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
                    }}
                    className="font-serif italic text-base sm:text-lg font-medium text-navy-800 leading-relaxed mb-3"
                  >
                    “{currentDish.doodleCaption ||
                      "Every noodle is infused with house-smoked chilli oil and rich aromatics."}”
                  </motion.p>

                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
                      },
                      exit: { opacity: 0, transition: { duration: 0.2 } },
                    }}
                    className="font-serif text-sm sm:text-base text-charcoal-800/80 leading-relaxed"
                  >
                    Every morning, our pastry and culinary team prepares each component from scratch using heirloom techniques and zero shortcuts.
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
