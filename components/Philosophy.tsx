"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { websiteContent } from "@/lib/content";
import GlowingBorder from "@/components/ui/GlowingBorder";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-12 md:py-16 bg-cream-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Cathedral Arch Photo Frame with Glowing Border */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[460px] aspect-[4/5]">
              {/* Arched Window Image with Continuous Animated Glowing Border */}
              <GlowingBorder
                className="relative w-full h-full shadow-elevated"
                borderWidth={3}
                borderRadius="9999px 9999px 1.5rem 1.5rem"
                innerBorderRadius="9999px 9999px 1.35rem 1.35rem"
                duration={8}
                glowIntensity="subtle"
                beamColor="#D4A34A"
              >
                <div className="relative w-full h-full overflow-hidden bg-cream-200">
                  <Image
                    src={websiteContent.philosophy.image}
                    alt="X&Y Bakehouse Warm Interior"
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, 460px"
                  />
                </div>
              </GlowingBorder>

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

          {/* Right Column: Editorial Text (Clean, Classical Layout) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Tag / Category */}
            <span className="philosophy-label block mb-4">
              {websiteContent.philosophy.tag}
            </span>

            {/* Section Headline: Desktop perfect original, Mobile max 5 words */}
            <h2 className="hidden md:block philosophy-heading mb-6">
              {websiteContent.philosophy.title}
            </h2>
            <h2 className="md:hidden philosophy-heading text-3xl leading-[1.08] mb-4">
              {websiteContent.philosophy.mobileTitle || "Food Made With Pure Intention"}
            </h2>

            {/* Philosophy Narrative: Desktop perfect original, Mobile max 2 lines */}
            <p className="hidden md:block philosophy-body leading-relaxed mb-8">
              {websiteContent.philosophy.description}
            </p>
            <p className="md:hidden philosophy-body text-base sm:text-lg leading-snug line-clamp-2 mb-6">
              {websiteContent.philosophy.mobileDescription || "Authentic Italian cuisine crafted with passion, tradition, and the finest ingredients."}
            </p>

            <div className="h-[2px] w-16 bg-gold-500 mb-6" />

            {/* Quote (kept identical for both mobile and desktop) */}
            <p className="font-serif italic font-medium text-lg sm:text-xl text-[#211714]">
              “The best cafe is the one you never want to leave.”
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
