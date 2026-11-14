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

              {/* Floating Seal Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -right-4 sm:-right-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#293477] text-[#f2ba1e] flex flex-col items-center justify-center border-4 border-cream-100 shadow-xl z-20"
              >
                <div className="text-center px-2">
                  <span className="block font-serif text-[11px] sm:text-xs tracking-[0.25em] text-[#f2ba1e] font-bold uppercase">
                    X &amp; Y
                  </span>
                  <div className="w-8 h-[1px] bg-[#f2ba1e]/50 my-1 mx-auto" />
                  <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#f2ba1e] font-semibold">
                    Bakehouse
                  </span>
                  <span className="block font-sans text-[7px] tracking-[0.15em] uppercase text-[#f2ba1e]/85 mt-0.5 font-medium">
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

            {/* Section Headline */}
            <h2 className="philosophy-heading text-[#293477] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5 sm:mb-6">
              {websiteContent.philosophy.title}
            </h2>

            {/* Philosophy Narrative */}
            <p className="philosophy-body text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 text-charcoal-800/90">
              {websiteContent.philosophy.description}
            </p>

            <div className="h-[2px] w-16 bg-gold-500 mb-6" />

            {/* Quote */}
            <p className="font-sans italic font-medium text-base sm:text-lg text-[#211714]">
              {websiteContent.philosophy.quote || '“It started with the oven. The rest of the café grew around it.”'}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
