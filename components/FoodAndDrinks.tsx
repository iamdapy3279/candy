"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { websiteContent } from "@/lib/content";

export default function FoodAndDrinks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dishes = websiteContent.foodAndDrinks.dishes;

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

        {/* 2-Column Stacked Carousel & Artisanal Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Stacked 3D Photography Carousel (Reference Image 3) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* The Stack Container */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] perspective-1000">
              
              {/* Back Card 2 (Depth layer) */}
              <div
                className="absolute inset-0 rounded-2xl bg-cream-300 border border-charcoal-800/10 shadow-md transform rotate-6 translate-x-4 translate-y-3 opacity-40 pointer-events-none"
              />

              {/* Back Card 1 (Depth layer) */}
              <div
                className="absolute inset-0 rounded-2xl bg-cream-400 border border-charcoal-800/15 shadow-md transform rotate-3 translate-x-2 translate-y-1.5 opacity-70 pointer-events-none"
              />

              {/* Active Foreground Card with Framer Motion spring */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDish.id}
                  initial={{ opacity: 0, scale: 0.94, rotate: -2, x: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.96, rotate: 2, x: 20 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                  }}
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-white group cursor-pointer"
                  onClick={handleNext}
                >
                  <Image
                    src={currentDish.image}
                    alt={currentDish.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                  />

                  {/* Gradient banner with Dish details */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-navy-950/90 via-navy-950/60 to-transparent text-white">
                    <span className="font-sans text-[11px] tracking-widest uppercase text-gold-500 font-semibold block mb-1">
                      {currentDish.tagline}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-cream-50 leading-tight mb-1">
                      {currentDish.name}
                    </h3>
                    <p className="font-serif text-xs sm:text-sm text-cream-200/90 line-clamp-2">
                      {currentDish.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls (Reference Image 3: Left & Right circular buttons) */}
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

          {/* Right Column: Editorial Note & Culinary Story */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center lg:items-start"
              >
                {/* Editorial Caption Quote in Cinzel */}
                <div className="max-w-md">
                  <p className="font-serif text-base sm:text-xl font-semibold tracking-wider text-charcoal-800 leading-relaxed uppercase mb-6">
                    {currentDish.doodleCaption ||
                      "SET ON KOLKATA'S CORNERS, X&Y WELCOMES GUESTS FROM MORNING THROUGH TO LATE AFTERNOON."}
                  </p>
                  
                  <div className="h-[2px] w-14 bg-gold-500 mb-6 mx-auto lg:mx-0" />
                  
                  <p className="font-sans text-sm tracking-wide text-charcoal-800/80 font-normal leading-relaxed">
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

