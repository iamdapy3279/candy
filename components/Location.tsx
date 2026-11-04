"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Phone, ExternalLink } from "lucide-react";
import { websiteContent, LocationItem } from "@/lib/content";
import GlowingBorder from "@/components/ui/GlowingBorder";

export default function Location() {
  const locations = websiteContent.locations;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingLocation, setExitingLocation] = useState<LocationItem | null>(null);

  // Auto-switch between the two locations every 4 seconds without pressing any buttons
  useEffect(() => {
    const timer = setInterval(() => {
      setExitingLocation(locations[currentIndex]);
      setCurrentIndex((prev) => (prev + 1) % locations.length);
      setTimeout(() => {
        setExitingLocation(null);
      }, 500);
    }, 4500);

    return () => clearInterval(timer);
  }, [currentIndex, locations]);

  const currentLocation = locations[currentIndex];
  const otherLocation = locations[(currentIndex + 1) % locations.length];

  // In-memory pre-warm of location photography after initial render for zero-latency switching
  useEffect(() => {
    if (typeof window !== "undefined") {
      locations.forEach((loc) => {
        const img = new window.Image();
        img.src = loc.image;
      });
    }
  }, [locations]);

  return (
    <section id="locations" className="py-12 md:py-16 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Heading & Prominent Kolkata Architectural Illustration on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-12 pb-6 border-b border-[#211714]/10 gap-8">
          {/* Left: Editorial Typography */}
          <div className="shrink-0 max-w-sm lg:max-w-md">
            <span className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-3">
              FIND OUR BAKEHOUSES
            </span>
            <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl font-medium text-navy-800 tracking-normal leading-[1.05]">
              Our Locations
            </h2>
            <p className="font-serif text-base sm:text-lg text-charcoal-800/80 mt-3 leading-snug">
              Two neighbourhoods in Kolkata. The same X&amp;Y experience.
            </p>
          </div>

          {/* Right: Large Kolkata Architectural Illustration (Seamless, integrated into layout) */}
          <div className="relative w-full max-w-[380px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[620px] xl:max-w-[680px] aspect-[1024/436] shrink-0 pointer-events-none select-none lg:ml-auto self-end">
            <Image
              src="/locations/KolkataMonumentTransparent.png"
              alt="Two neighbourhoods in Kolkata — Salt Lake and Alipore"
              fill
              className="object-contain object-bottom lg:object-right-bottom"
              priority
            />
          </div>
        </div>

        {/* Main 2-Column Content: In-Sync Choreographed Information on Left, 3D Stacked Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Location Information (Auto-updates smoothly in lockstep with the card) */}
          <div className="lg:col-span-6 min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLocation.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <div>
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-navy-800/80 font-semibold">
                    {currentLocation.area}
                  </span>
                  <h3 className="font-serif italic text-3xl sm:text-4xl font-medium text-navy-800 mt-1 mb-4">
                    {currentLocation.name}
                  </h3>
                  {/* Desktop Description */}
                  <p className="hidden md:block font-serif text-base sm:text-lg text-charcoal-800 leading-relaxed">
                    {currentLocation.description}
                  </p>
                  {/* Mobile Description: Maximum 2 lines */}
                  <p className="md:hidden font-serif text-sm text-charcoal-800 leading-snug line-clamp-2">
                    {currentLocation.mobileDescription || currentLocation.description}
                  </p>
                </div>

                {/* Info Pills & Rows */}
                <div className="space-y-4 pt-4 border-t border-cream-300">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-navy-800 shrink-0 mt-0.5">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-charcoal-800/80 font-semibold mb-0.5">
                        Address
                      </span>
                      <p className="font-serif text-sm sm:text-base text-navy-800 font-medium">
                        {currentLocation.address}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-navy-800 shrink-0 mt-0.5">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-charcoal-800/80 font-semibold mb-0.5">
                        Opening Hours
                      </span>
                      <p className="font-serif text-sm sm:text-base text-navy-800 font-medium">
                        {currentLocation.hours}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-navy-800 shrink-0 mt-0.5">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-charcoal-800/80 font-semibold mb-0.5">
                        Telephone
                      </span>
                      <a
                        href={`tel:${currentLocation.phone.replace(/\s+/g, "")}`}
                        className="font-serif text-sm sm:text-base text-navy-800 font-medium hover:text-gold-700 transition-colors"
                      >
                        {currentLocation.displayPhone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href={currentLocation.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider font-bold px-7 py-3.5 rounded-full bg-gold-500 text-navy-950 hover:bg-gold-600 transition-all duration-300 shadow-sm hover:shadow active:scale-95"
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={14} />
                  </a>

                  <a
                    href={`tel:${currentLocation.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider font-semibold px-7 py-3.5 rounded-full border border-navy-800/30 text-navy-800 hover:bg-navy-800 hover:text-white transition-all duration-300 active:scale-95"
                  >
                    <span>Call Outlet</span>
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: 3D Stacked Card with Glowing Travelling Light Beam Border */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* The 3D Stack Container (GPU-accelerated perspective) */}
            <div className="relative w-full max-w-[480px] aspect-[4/3] [perspective:1200px] select-none [transform:translateZ(0)]">
              
              {/* Layered Background Photograph (The other location) */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden border border-[#E8DCCB] shadow-lg bg-cream-200 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  zIndex: 10,
                  transform: "translate3d(14px, 8px, 0) scale(0.965) rotate(2deg)",
                  opacity: 0.85,
                }}
              >
                <Image
                  src={otherLocation.image}
                  alt={otherLocation.name}
                  fill
                  className="object-cover brightness-95"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
                <div className="absolute inset-0 bg-[#211714]/10" />
              </div>

              {/* Active Foreground Location Card with Continuous Glowing Travelling Light Beam Border */}
              <motion.div
                key={`front-${currentLocation.id}`}
                initial={{
                  opacity: 0.85,
                  scale: 0.965,
                  x: 12,
                  y: 7,
                  rotate: 2,
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
                className="absolute inset-0 z-20 [transform:translateZ(0)] will-change-transform"
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
                      src={currentLocation.image}
                      alt={`${currentLocation.name} X&Y Bakehouse`}
                      fill
                      className="object-cover select-none pointer-events-none transition-transform duration-500 hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 100vw, 480px"
                    />
                  </div>
                </GlowingBorder>
              </motion.div>

              {/* Exiting Card: Physically lifts, tilts, and sweeps smoothly away */}
              {exitingLocation && (
                <motion.div
                  key={`exiting-${exitingLocation.id}`}
                  initial={{ scale: 1, x: 0, y: 0, rotate: 0, opacity: 1 }}
                  animate={{
                    x: 65,
                    y: -18,
                    rotate: 4,
                    scale: 0.94,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 z-30 pointer-events-none rounded-2xl overflow-hidden shadow-2xl bg-cream-200 [transform:translateZ(0)] will-change-transform"
                >
                  <Image
                    src={exitingLocation.image}
                    alt={exitingLocation.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </motion.div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
