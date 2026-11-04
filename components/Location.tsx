"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Phone, ExternalLink } from "lucide-react";
import { websiteContent, LocationItem } from "@/lib/content";

export default function Location() {
  const [selectedId, setSelectedId] = useState<string>(websiteContent.locations[0].id);

  const activeLocation =
    websiteContent.locations.find((loc) => loc.id === selectedId) ||
    websiteContent.locations[0];

  return (
    <section id="locations" className="py-24 md:py-36 bg-[#fbf9f8] relative overflow-hidden">
      
      {/* Background Decorative Subtle Texture / Element */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Heading & Reusable Outlet Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-navy-800/10">
          <div>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold-700 font-bold block mb-3">
              FIND OUR BAKEHOUSES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-navy-800 tracking-tight">
              Our Locations
            </h2>
          </div>

          {/* Reusable Outlet Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0">
            {websiteContent.locations.map((loc) => {
              const isActive = loc.id === selectedId;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedId(loc.id)}
                  className={`font-serif text-sm sm:text-base px-5 py-2.5 rounded-full transition-all duration-300 font-semibold whitespace-nowrap ${
                    isActive
                      ? "bg-navy-800 text-gold-500 shadow-md scale-105"
                      : "bg-cream-200 text-charcoal-800/70 hover:bg-cream-300 hover:text-navy-800"
                  }`}
                >
                  {loc.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Content: Information on Left, Layered Image & Botanical Leaf on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Location Information */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-navy-800/60 font-semibold">
                    {activeLocation.area}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mt-1 mb-4">
                    {activeLocation.name}
                  </h3>
                  <p className="font-serif text-base text-charcoal-800/85 leading-relaxed">
                    {activeLocation.description}
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
                      <span className="block font-sans text-xs uppercase tracking-wider text-charcoal-800/60 font-semibold mb-0.5">
                        Address
                      </span>
                      <p className="font-serif text-sm sm:text-base text-navy-800 font-medium">
                        {activeLocation.address}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-navy-800 shrink-0 mt-0.5">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-charcoal-800/60 font-semibold mb-0.5">
                        Opening Hours
                      </span>
                      <p className="font-serif text-sm sm:text-base text-navy-800 font-medium">
                        {activeLocation.hours}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-navy-800 shrink-0 mt-0.5">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-charcoal-800/60 font-semibold mb-0.5">
                        Telephone
                      </span>
                      <a
                        href={`tel:${activeLocation.phone.replace(/\s+/g, "")}`}
                        className="font-serif text-sm sm:text-base text-navy-800 font-medium hover:text-gold-700 transition-colors"
                      >
                        {activeLocation.displayPhone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-6">
                  <a
                    href={activeLocation.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider font-bold px-7 py-3.5 rounded-full bg-gold-500 text-navy-950 hover:bg-gold-600 transition-all duration-300 shadow-sm hover:shadow active:scale-95"
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={14} />
                  </a>

                  <a
                    href={`tel:${activeLocation.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider font-semibold px-7 py-3.5 rounded-full border border-navy-800/30 text-navy-800 hover:bg-navy-800 hover:text-white transition-all duration-300 active:scale-95"
                  >
                    <span>Call Outlet</span>
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Layered Photograph & Botanical Leaf Illustration */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[4/3]">
              
              {/* Layered Image Background Offset (approved design) */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-2xl bg-cream-300/80 -rotate-2 transform translate-x-3 translate-y-3 pointer-events-none" />

              {/* Main Restaurant Photograph */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLocation.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-elevated border-4 border-white bg-white z-10"
                >
                  <Image
                    src={activeLocation.image}
                    alt={`${activeLocation.name} X&Y Bakehouse`}
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Botanical Leaf Illustration Entrance (Doodle4.svg) */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -10 }}
                whileInView={{ opacity: 0.9, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-12 -left-10 sm:-left-16 w-32 sm:w-44 h-48 sm:h-64 pointer-events-none z-20"
              >
                <Image
                  src="/artwork/Doodle4.svg"
                  alt="Botanical Leaf Illustration"
                  fill
                  className="object-contain"
                />
              </motion.div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

