"use client";

import Image from "next/image";
import { Clock, MapPin, Phone, ExternalLink } from "lucide-react";
import { websiteContent } from "@/lib/content";

export default function Location() {
  const locations = websiteContent.locations;

  return (
    <section id="locations" className="py-10 sm:py-14 md:py-16 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 md:mb-12 pb-5 sm:pb-6 border-b border-[#211714]/10 gap-3 sm:gap-6">
          <div>
            <span className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-1.5 sm:mb-2">
              FIND OUR BAKEHOUSES
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#293477] tracking-tight leading-[1.1]">
              Our Locations
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 leading-relaxed max-w-md sm:text-right">
            Two neighbourhoods in Kolkata. The same X&amp;Y experience.
          </p>
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
                {/* 1. Location Header */}
                <div>
                  <span className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-1.5">
                    {loc.area}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-semibold text-navy-900 leading-snug">
                    {loc.name}
                  </h3>
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
