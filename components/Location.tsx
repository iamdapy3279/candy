"use client";

import Image from "next/image";
import { Clock, MapPin, Phone, ExternalLink } from "lucide-react";
import { websiteContent } from "@/lib/content";

// 1. Standalone Black Line-Art Dog Illustration (Pet-friendly for Salt Lake)
// Strict requirement: No circular border, no badge, no background, no enclosing shape, no gold outline.
function PetFriendlyIcon({ className = "w-14 h-14 sm:w-16 sm:h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="#211714"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Pet-friendly"
      role="img"
    >
      {/* Editorial Dog Line-Art Illustration */}
      <path d="M14 26c1-2 3-3 6-3h5c2-3 5-5 8-5s6 2 7 5c2 0 4 1 5 3" />
      <path d="M25 21c-1 3-1 8-3 12c-1 2-2 3-4 2s-2-3-1-6c1-3 4-8 8-8z" />
      <circle cx="21" cy="22" r="1" fill="#211714" />
      <path d="M14 26c0 1.5.5 2.5 1.5 2.5s2-1 2.5-2.5" />
      <path d="M18 28.5c2 4 4 8 4 13v13.5c0 1 1 2 2.5 2h2c1 0 1.5-.5 1.5-1.5V42" />
      <path d="M28 44v11c0 1 1 2 2.5 2h1.5" />
      <path d="M35 24c6 1 12 3 15 8c2 3 2 6 1 10" />
      <path d="M50 32c3-4 6-7 9-7c.5 3-1 7-4 10" />
      <path d="M48 42c3 3 4 8 4 13c0 1-.5 2-2 2h-2c-1.5 0-2-1-2.5-2.5L43 45" />
      <path d="M28 42c4-1 9-1 15 3" />
    </svg>
  );
}

// 2. Standalone Black Line-Art Valet / Car Illustration (Valet parking for Alipore)
// Strict requirement: No circular border, no badge, no background, no enclosing shape, no gold outline.
function ValetParkingIcon({ className = "w-14 h-14 sm:w-16 sm:h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="#211714"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Valet parking"
      role="img"
    >
      {/* Editorial Valet / Car Line-Art Illustration */}
      <path d="M14 36l5-12h18l7 12" />
      <path d="M28 24v12" />
      <path d="M7 44h4a5 5 0 0 1 10 0h14a5 5 0 0 1 10 0h8c2 0 4-1.5 4-4v-3c0-2-1.5-3.5-3.5-3.5H44L37 23c-.8-1.2-2.2-2-3.8-2H18.5c-1.6 0-3 .8-3.8 2L8 33.5C6.5 34 5 35.5 5 37.5V40c0 2.2 1.8 4 4 4h-2z" />
      <circle cx="16" cy="44" r="3.5" />
      <circle cx="45" cy="44" r="3.5" />
      <path d="M6 38h3" />
      <path d="M55 37h3" />
      <path d="M48 14v6m-3-3h6" />
      <path d="M56 12l2 2m-2 0l2-2" />
    </svg>
  );
}

export default function Location() {
  const locations = websiteContent.locations;

  return (
    <section id="locations" className="py-12 md:py-16 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading & Kolkata Architectural Illustration (Preserved) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-14 pb-6 border-b border-[#211714]/10 gap-6 lg:gap-8">
          {/* Kolkata Architectural Illustration (Above header on mobile, spanning full width with breathing room, centered) */}
          <div className="order-1 lg:order-2 w-full flex justify-center items-center my-3 mb-6 sm:my-5 sm:mb-8 lg:my-0 lg:w-auto lg:ml-auto shrink-0">
            <div className="relative w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[640px] xl:max-w-[680px] aspect-[1024/436] pointer-events-none select-none">
              <Image
                src="/locations/KolkataMonumentTransparent.png"
                alt="Two neighbourhoods in Kolkata — Salt Lake and Alipore"
                fill
                className="object-contain object-center lg:object-right-bottom"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 560px, 680px"
              />
            </div>
          </div>

          {/* Section Titles */}
          <div className="order-2 lg:order-1 shrink-0 max-w-sm lg:max-w-md">
            <span className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-2 sm:mb-3">
              FIND OUR BAKEHOUSES
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#293477] tracking-tight leading-[1.1]">
              Our Locations
            </h2>
            <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 mt-2 sm:mt-3 leading-relaxed">
              Two neighbourhoods in Kolkata. The same X&amp;Y experience.
            </p>
          </div>
        </div>

        {/* 2-Column Locations Layout: Side-by-Side on Desktop, Distinct with Subtle Separators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {locations.map((loc, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={loc.id}
                className={`flex flex-col justify-between h-full ${
                  !isFirst
                    ? "pt-10 border-t border-[#211714]/10 lg:pt-0 lg:border-t-0 lg:border-l lg:border-[#211714]/10 lg:pl-12 xl:pl-16"
                    : "lg:pr-4"
                }`}
              >
                {/* 1. Header with Landmark Description & Standalone Amenity Icon */}
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Location Label & Refined Serif Landmark Description */}
                  <div className="flex-1 pr-2">
                    <span className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-2">
                      {loc.area}
                    </span>
                    <h3 className="font-serif italic text-2xl sm:text-[26px] lg:text-[28px] font-medium text-navy-800 leading-snug">
                      {loc.landmark}
                    </h3>
                  </div>

                  {/* Right: Standalone Black Amenity Icon with descriptive text below */}
                  <div
                    className="shrink-0 flex flex-col items-center text-center pt-0.5"
                    title={loc.amenity === "pet-friendly" ? "Pet Friendly" : "Offers Valet"}
                  >
                    {loc.amenity === "pet-friendly" ? (
                      <>
                        <PetFriendlyIcon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[60px] lg:h-[60px]" />
                        <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-charcoal-800/80 font-semibold mt-1.5 whitespace-nowrap">
                          Pet Friendly
                        </span>
                      </>
                    ) : (
                      <>
                        <ValetParkingIcon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[60px] lg:h-[60px]" />
                        <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-charcoal-800/80 font-semibold mt-1.5 whitespace-nowrap">
                          Offers Valet
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* 2. Photography Card */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-[#E8DCCB] my-6 sm:my-7 shadow-xs bg-cream-200">
                  <Image
                    src={loc.image}
                    alt={`${loc.name} X&Y Bakehouse`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
                  />
                </div>

                {/* 3. Structured Information Rows */}
                <div className="space-y-4 pt-2 border-t border-[#E8DCCB]/60">
                  {/* Clickable Address with External Link Arrow */}
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-navy-800 shrink-0 mt-0.5">
                      <MapPin size={18} />
                    </div>
                    <div className="flex-1">
                      <span className="block font-sans text-xs uppercase tracking-wider text-charcoal-800/80 font-semibold mb-0.5">
                        Address
                      </span>
                      <a
                        href={loc.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm text-navy-800 font-medium leading-relaxed hover:text-gold-700 transition-colors"
                        title="Open in Google Maps"
                      >
                        <span>{loc.address}</span>
                        <ExternalLink
                          size={13}
                          className="shrink-0 text-gold-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-navy-800 shrink-0 mt-0.5">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-charcoal-800/80 font-semibold mb-0.5">
                        Opening Hours
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-navy-800 font-medium tracking-wide">
                        {loc.hours}
                      </p>
                    </div>
                  </div>

                  {/* Clickable Telephone */}
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-navy-800 shrink-0 mt-0.5">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-charcoal-800/80 font-semibold mb-0.5">
                        Telephone
                      </span>
                      <a
                        href={`tel:${loc.phone.replace(/\s+/g, "")}`}
                        className="font-sans text-xs sm:text-sm text-navy-800 font-medium tracking-wide hover:text-gold-700 transition-colors"
                      >
                        {loc.displayPhone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* 4. Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-6 mt-2">
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-full bg-gold-500 text-navy-950 hover:bg-gold-600 transition-all duration-300 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={13} />
                  </a>

                  <a
                    href={`tel:${loc.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-full border border-navy-800/30 text-navy-800 hover:bg-navy-800 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    <span>Call Outlet</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
