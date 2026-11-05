"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { websiteContent } from "@/lib/content";
import GlowingBorder from "@/components/ui/GlowingBorder";

interface HeroProps {
  onOpenMenu?: () => void;
}

export default function Hero({ onOpenMenu }: HeroProps = {}) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true);
    }
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
      {/* 1. Instant Fallback Image (Zero-latency WebP Poster displayed immediately) */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Poster */}
        <Image
          src="/Hero.webp"
          alt="X&Y Bakehouse ambiance"
          fill
          priority
          sizes="100vw"
          className={`hidden md:block object-cover object-center transition-opacity duration-700 ${
            videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
        {/* Mobile-Optimized Portrait Poster */}
        <Image
          src="/Hero-mobile.webp"
          alt="X&Y Bakehouse ambiance"
          fill
          priority
          sizes="100vw"
          className={`block md:hidden object-cover object-center transition-opacity duration-700 ${
            videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </div>

      {/* 2. Seamless Autoplaying Video (Optimized VP9 with H.264 FastStart fallback) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Desktop Sources (>= 768px): VP9 Primary, H.264 Universal Fallback */}
        <source src={websiteContent.hero.videoDesktopWebm} type="video/webm" media="(min-width: 768px)" />
        <source src={websiteContent.hero.videoDesktop} type="video/mp4" media="(min-width: 768px)" />

        {/* Mobile Sources (< 768px): 720p VP9 Primary, 720p H.264 Universal Fallback */}
        <source src={websiteContent.hero.videoMobileWebm} type="video/webm" media="(max-width: 767px)" />
        <source src={websiteContent.hero.videoMobile} type="video/mp4" />
      </video>

      {/* 3. Top-Right Floating Action Buttons: MENU and LOCATION (Stacked Horizontally with Animated Glowing Borders) */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-10 z-30 flex flex-row items-center gap-2 sm:gap-3.5 select-none">
        {/* Menu Button (Opens In-Page Modal) */}
        <GlowingBorder
          borderWidth={1.5}
          borderRadius="9999px"
          duration={6}
          beamColor="#D4A34A"
          glowIntensity="subtle"
          className="rounded-full shadow-2xl"
        >
          <button
            onClick={() => {
              if (onOpenMenu) {
                onOpenMenu();
              } else if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-menu-modal"));
              }
            }}
            className="w-24 sm:w-32 py-2 sm:py-2.5 rounded-full bg-navy-950/80 backdrop-blur-md text-cream-100 font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.22em] uppercase font-semibold flex items-center justify-center transition-all hover:bg-navy-900 hover:text-gold-400 active:scale-95 text-center cursor-pointer"
          >
            Menu
          </button>
        </GlowingBorder>

        {/* Location Button */}
        <GlowingBorder
          borderWidth={1.5}
          borderRadius="9999px"
          duration={6}
          beamColor="#D4A34A"
          glowIntensity="subtle"
          className="rounded-full shadow-2xl"
        >
          <a
            href="#locations"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("locations")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-24 sm:w-32 py-2 sm:py-2.5 rounded-full bg-navy-950/80 backdrop-blur-md text-cream-100 font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.22em] uppercase font-semibold flex items-center justify-center transition-all hover:bg-navy-900 hover:text-gold-400 active:scale-95 text-center"
          >
            Location
          </a>
        </GlowingBorder>
      </div>

      {/* 4. Floating Subtle Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => {
          document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/80 font-medium drop-shadow-md">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-black/50 transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
}
