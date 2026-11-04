"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { websiteContent } from "@/lib/content";

export default function Philosophy() {
  const [activeValueIndex, setActiveValueIndex] = useState(0);

  return (
    <section id="philosophy" className="py-24 md:py-36 bg-cream-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Cathedral Arch Photo Frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[460px] aspect-[4/5]">
              {/* Arched Window Image Container */}
              <div className="relative w-full h-full arch-frame overflow-hidden shadow-elevated border-4 border-white bg-cream-200">
                <Image
                  src={websiteContent.philosophy.image}
                  alt="X&Y Bakehouse Warm Interior"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 460px"
                />
                {/* Subtle warm tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Navy Seal Badge (Reference Image 2) */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -right-4 sm:-right-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-navy-800 text-white flex flex-col items-center justify-center border-4 border-cream-100 shadow-xl z-20"
              >
                <div className="text-center px-2">
                  <span className="block font-serif text-[11px] sm:text-xs tracking-[0.25em] text-gold-500 font-bold uppercase">
                    X&Y
                  </span>
                  <div className="w-8 h-[1px] bg-gold-500/50 my-1 mx-auto" />
                  <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-cream-100 font-medium">
                    Bakehouse
                  </span>
                  <span className="block font-sans text-[7px] tracking-[0.15em] uppercase text-cream-300/80 mt-0.5">
                    Est. 2024
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text & Values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Tag / Category */}
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold-700 font-bold mb-4">
              {websiteContent.philosophy.tag}
            </span>

            {/* Section Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 leading-[1.2] mb-6">
              {websiteContent.philosophy.title}
            </h2>

            {/* Philosophy Narrative */}
            <p className="font-serif text-base sm:text-lg text-charcoal-800/85 leading-relaxed mb-10">
              {websiteContent.philosophy.description}
            </p>

            {/* Interactive X — & — Y Values Grid */}
            <div className="border-t border-cream-300 pt-8">
              <div className="flex items-center gap-3 mb-6">
                {websiteContent.philosophy.values.map((val, idx) => (
                  <button
                    key={val.letter}
                    onClick={() => setActiveValueIndex(idx)}
                    className={`font-serif px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeValueIndex === idx
                        ? "bg-navy-800 text-gold-500 shadow-sm scale-105"
                        : "bg-cream-200 text-charcoal-800/70 hover:bg-cream-300"
                    }`}
                  >
                    <span className="mr-1">{val.letter}</span>
                    <span className="text-xs font-sans font-normal opacity-80">
                      ({val.identity})
                    </span>
                  </button>
                ))}
              </div>

              {/* Animated Value Detail Card */}
              <div className="min-h-[90px] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeValueIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="p-5 rounded-2xl bg-white border border-cream-300 shadow-subtle"
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-serif text-lg font-bold text-navy-800">
                        {websiteContent.philosophy.values[activeValueIndex].letter}
                      </span>
                      <span className="font-sans text-xs tracking-wider uppercase font-semibold text-gold-700">
                        — {websiteContent.philosophy.values[activeValueIndex].identity}
                      </span>
                    </div>
                    <p className="font-serif text-sm sm:text-base text-charcoal-800 leading-normal">
                      {websiteContent.philosophy.values[activeValueIndex].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
