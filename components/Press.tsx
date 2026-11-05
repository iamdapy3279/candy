"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { websiteContent } from "@/lib/content";

export default function Press() {
  const { press } = websiteContent;
  const articles = press.articles;

  // Quadruple the array to ensure continuous, silky-smooth 60fps/120fps infinite loop
  const marqueeItems = [...articles, ...articles, ...articles, ...articles];

  return (
    <section
      id="press"
      className="py-14 sm:py-20 bg-cream-100 relative overflow-hidden border-t border-[#211714]/10 select-none"
    >
      {/* 1. Header with Title & Editorial Ratings */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <span className="font-sans text-xs tracking-[0.22em] uppercase text-gold-700 font-semibold block mb-2 sm:mb-3">
              {press.tag}
            </span>

            <div className="flex flex-wrap items-baseline gap-3 sm:gap-5">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-navy-800 tracking-tight leading-[1.1]">
                {press.title}
              </h2>

              {/* Desktop / Tablet Ratings Badges */}
              <div className="hidden sm:inline-flex items-center gap-4 pl-1">
                <div className="w-[1px] h-6 bg-[#211714]/20" />
                {/* Zomato Rating */}
                <div className="inline-flex items-center gap-2">
                  <div className="relative w-5 h-5 shrink-0">
                    <Image
                      src="/icons/zomato.png"
                      alt="Zomato"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-sans font-black italic text-base tracking-tight text-[#E23744]">
                    zomato
                  </span>
                  <span className="font-sans font-bold text-navy-900 text-sm">
                    4.4 / 5
                  </span>
                </div>

                <div className="w-[1px] h-5 bg-[#211714]/20" />

                {/* Swiggy Rating */}
                <div className="inline-flex items-center gap-2">
                  <div className="relative w-5 h-5 shrink-0">
                    <Image
                      src="/icons/swiggy.png"
                      alt="Swiggy"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-sans font-bold text-[#FE5005] text-sm">
                    Swiggy
                  </span>
                  <span className="font-sans font-bold text-navy-900 text-sm">
                    4.4 / 5
                  </span>
                </div>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-charcoal-800/80 mt-2 sm:mt-3 leading-relaxed max-w-2xl">
              {press.subtitle}
            </p>
          </div>

          {/* Mobile Ratings Badges (visible under 640px) */}
          <div className="flex sm:hidden items-center gap-3 pt-1 border-t border-[#211714]/10">
            <div className="flex items-center gap-1.5">
              <div className="relative w-4 h-4 shrink-0">
                <Image
                  src="/icons/zomato.png"
                  alt="Zomato"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-sans font-black italic text-sm tracking-tight text-[#E23744]">
                zomato
              </span>
              <span className="font-sans font-bold text-navy-900 text-xs">
                4.4 / 5
              </span>
            </div>

            <div className="w-[1px] h-4 bg-[#211714]/20" />

            <div className="flex items-center gap-1.5">
              <div className="relative w-4 h-4 shrink-0">
                <Image
                  src="/icons/swiggy.png"
                  alt="Swiggy"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-sans font-bold text-[#FE5005] text-xs">
                Swiggy
              </span>
              <span className="font-sans font-bold text-navy-900 text-xs">
                4.4 / 5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Full-Width Infinite Auto-Scrolling Carousel */}
      <div className="relative w-full overflow-hidden border-t border-b border-[#211714]/10 bg-cream-100/60 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="animate-infinite-marquee py-6 sm:py-8">
          {marqueeItems.map((article, idx) => (
            <a
              key={`${article.id}-${idx}`}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read article in ${article.publication}: ${article.headline}`}
              className="group/article w-[280px] sm:w-[340px] md:w-[380px] shrink-0 px-6 sm:px-8 border-r border-[#211714]/10 flex flex-col justify-between transition-colors hover:bg-cream-200/40 cursor-pointer"
            >
              {/* Publication Name as Styled Editorial Text (NOT logos) */}
              <div>
                <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-navy-900 tracking-tight leading-none group-hover/article:text-gold-700 transition-colors">
                  {article.publication}
                </h3>

                {/* Delicate Gold Accent Divider */}
                <div className="h-[2px] w-8 bg-gold-500 my-3.5 sm:my-4 transition-all duration-300 group-hover/article:w-14" />

                {/* Article Headline with External Link Arrow */}
                <p className="font-sans text-xs sm:text-sm text-charcoal-800 leading-relaxed group-hover/article:text-navy-950 transition-colors">
                  {article.headline}
                </p>
              </div>

              {/* Read Article Action Link */}
              <div className="mt-4 pt-3 flex items-center gap-1.5 text-gold-700 text-xs font-sans font-semibold tracking-wider uppercase group-hover/article:text-gold-600 transition-colors">
                <span>Read Story</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/article:translate-x-0.5 group-hover/article:-translate-y-0.5"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

