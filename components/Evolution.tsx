"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { websiteContent } from "@/lib/content";

export default function Evolution() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for drawing the central vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const milestones = websiteContent.evolution.milestones;

  return (
    <section
      id="evolution"
      ref={containerRef}
      className="py-12 md:py-16 bg-cream-100 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Header (Reference Image 1: Minimalist & Classical) */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-3xl sm:text-5xl font-semibold text-[#293477] tracking-tight mb-3"
          >
            {websiteContent.evolution.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-xs sm:text-sm tracking-[0.22em] uppercase text-[#293477] font-semibold"
          >
            {websiteContent.evolution.tag}
          </motion.p>
        </div>

        {/* Central Vertical Timeline */}
        <div className="relative">
          
          {/* Static Background Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#293477]/20 -translate-x-1/2" />

          {/* Animated Scroll-Progress Line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#293477] -translate-x-1/2 z-10"
          />

          {/* Milestones List */}
          <div className="flex flex-col gap-16 md:gap-24 relative z-20">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={milestone.badge}
                  className="relative flex flex-col md:flex-row items-start md:items-center w-full"
                >
                  {/* Left Column (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                      isEven
                        ? "md:pr-14 md:text-right"
                        : "md:order-2 md:pl-14 md:text-left"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#293477] block mb-1">
                        {milestone.title}
                      </span>
                      <h3 className="font-sans text-xl sm:text-2xl font-semibold text-navy-800 mb-2">
                        {milestone.subtitle}
                      </h3>

                      {/* Desktop Description: Full editorial text */}
                      <p className="hidden md:block font-sans text-xs sm:text-sm text-charcoal-800 leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Mobile Description: Maximum 2 lines */}
                      <p className="md:hidden font-sans text-xs text-charcoal-800 leading-relaxed line-clamp-2">
                        {milestone.mobileDescription || milestone.description}
                      </p>

                      {/* Quote (kept identical for both mobile and desktop) */}
                      {milestone.quote && (
                        <p className="font-sans italic text-xs sm:text-sm text-[#293477]/80 font-medium mt-2.5">
                          {milestone.quote}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* Center Badge (Squircle matching reference image) */}
                  <div className="absolute left-6 md:left-1/2 top-0 md:top-auto -translate-x-1/2 z-30">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      style={{ fontVariantNumeric: "lining-nums", fontFeatureSettings: "'lnum' 1" }}
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-serif text-lg sm:text-xl font-normal transition-all duration-300 ${
                        milestone.badge === "24"
                          ? "bg-[#293477] text-white border-2 border-[#293477]"
                          : milestone.isLatest
                          ? "bg-[#f2ba1e] text-[#293477] border-2 border-[#f2ba1e]"
                          : "bg-white text-[#293477] border-2 border-[#293477]"
                      }`}
                    >
                      {milestone.badge}
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for the opposite side on desktop */}
                  <div
                    className={`hidden md:block w-1/2 ${
                      isEven ? "md:order-2" : "md:order-1"
                    }`}
                  />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

