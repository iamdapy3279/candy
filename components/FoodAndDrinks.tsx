"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { websiteContent } from "@/lib/content";
import GlowingBorder from "@/components/ui/GlowingBorder";

export default function FoodAndDrinks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dishes = websiteContent.foodAndDrinks.dishes;

  // Auto-change image and text every 4 seconds (slowed down for relaxed viewing)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dishes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [dishes.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dishes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + dishes.length) % dishes.length);
  };

  const currentDish = dishes[currentIndex];

  return (
    <section id="food-drinks" className="py-24 md:py-36 bg-[#f7f4f2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs tracking-[0.25em] uppercase text-gold-700 font-bold block mb-3"
          >
            {websiteContent.foodAndDrinks.tag}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-navy-800 tracking-tight leading-tight mb-4"
          >
            {websiteContent.foodAndDrinks.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-base sm:text-lg text-charcoal-800/80"
          >
            {websiteContent.foodAndDrinks.subtitle}
          </motion.p>
        </div>

        {/* 2-Column Stacked Carousel & Clean Editorial Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Stacked 3D Photography Carousel with Continuous Glowing Light Beam Border */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* The Stack Container */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] perspective-1000">
              
              {/* Back Card 2 (Depth layer) */}
              <div
                className="absolute inset-0 rounded-2xl bg-[#eae6e3] border border-charcoal-800/10 shadow-sm transform rotate-6 translate-x-4 translate-y-3 opacity-50 pointer-events-none"
              />

              {/* Back Card 1 (Depth layer) */}
              <div
                className="absolute inset-0 rounded-2xl bg-[#f0ece9] border border-charcoal-800/15 shadow-md transform rotate-3 translate-x-2 translate-y-1.5 opacity-80 pointer-events-none"
              />

              {/* Active Foreground Card with Continuous Glowing Light Beam Border */}
              <GlowingBorder
                className="relative z-10 w-full h-full cursor-pointer shadow-2xl"
                borderWidth={2}
                borderRadius="1rem"
                duration={8}
                glowIntensity="subtle"
                beamColor="#FCC215"
              >
                <div className="relative w-full h-full group" onClick={handleNext}>
                  <AnimatePresence>
                    <motion.div
                      key={currentDish.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={currentDish.image}
                        alt={currentDish.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </GlowingBorder>
            </div>

            {/* Carousel Controls (Left & Right circular buttons) */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                aria-label="Previous signature dish"
                className="w-12 h-12 rounded-full border border-navy-800/20 bg-white hover:bg-gold-500 hover:border-gold-500 text-navy-800 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow active:scale-90"
              >
                <ArrowLeft size={18} />
              </button>

              {/* Progress counter */}
              <span className="font-serif text-sm font-semibold text-navy-800 tracking-widest px-2">
                0{currentIndex + 1} / 0{dishes.length}
              </span>

              <button
                onClick={handleNext}
                aria-label="Next signature dish"
                className="w-12 h-12 rounded-full border border-navy-800/20 bg-white hover:bg-gold-500 hover:border-gold-500 text-navy-800 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow active:scale-90"
              >
                <ArrowRight size={18} />
              </button>
            </div>

          </div>

          {/* Right Column: Dynamic Text That Changes In Sync Every 4 Seconds */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center lg:items-start max-w-md"
              >
                {/* Category Tagline */}
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold-700 font-bold block mb-2">
                  {currentDish.tagline}
                </span>

                {/* Dish Name */}
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 leading-tight mb-3">
                  {currentDish.name}
                </h3>

                {/* Ingredients / Description */}
                <p className="font-serif text-sm sm:text-base text-charcoal-800/85 mb-6">
                  {currentDish.description}
                </p>

                {/* Gold Accent Divider */}
                <div className="h-[2px] w-14 bg-gold-500 mb-6 mx-auto lg:mx-0" />

                {/* Editorial Highlight Quote */}
                <p className="font-serif text-sm sm:text-base font-semibold tracking-wider text-charcoal-800 leading-relaxed uppercase mb-3">
                  {currentDish.doodleCaption ||
                    "SET ON KOLKATA'S CORNERS, X&Y WELCOMES GUESTS FROM MORNING THROUGH TO LATE AFTERNOON."}
                </p>

                <p className="font-sans text-xs tracking-wider text-charcoal-800/70 font-medium leading-relaxed">
                  Every morning, our pastry and culinary team prepares each component from scratch using heirloom techniques and zero shortcuts.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
