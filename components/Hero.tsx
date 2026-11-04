"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { websiteContent } from "@/lib/content";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true);
    }
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-navy-950">
      {/* 1. Instant Fallback Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={websiteContent.hero.posterImage}
          alt="X&Y Bakehouse ambiance"
          fill
          priority
          className={`object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? "opacity-30" : "opacity-100 scale-100"
          }`}
        />
      </div>

      {/* 2. Seamless Autoplaying Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={websiteContent.hero.videoDesktop} type="video/mp4" media="(min-width: 768px)" />
        <source src={websiteContent.hero.videoMobile} type="video/mp4" />
      </video>

      {/* 3. Cinematic Vignette & Deep Indigo Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-navy-950/60 via-navy-900/40 to-navy-950/80 pointer-events-none" />

      {/* 4. Centered Typography Content */}
      <div className="relative z-30 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">
        {/* Eyebrow Chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
          <span className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-cream-100">
            {websiteContent.hero.badge}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-cream-50 leading-[1.1] mb-6 drop-shadow-sm"
        >
          {websiteContent.hero.headline}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif text-base sm:text-xl md:text-2xl text-cream-200/90 max-w-2xl font-normal leading-relaxed mb-10"
        >
          {websiteContent.hero.subtext}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href={websiteContent.hero.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center font-sans text-sm uppercase tracking-widest font-bold px-8 py-4 rounded-full bg-gold-500 text-navy-950 hover:bg-gold-600 transition-all duration-300 shadow-lg hover:shadow-gold-500/20 active:scale-95"
          >
            {websiteContent.hero.primaryCta.label}
          </a>

          <Link
            href={websiteContent.hero.secondaryCta.href}
            className="w-full sm:w-auto text-center font-sans text-sm uppercase tracking-widest font-semibold px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-cream-50 border border-white/30 backdrop-blur-md transition-all duration-300 active:scale-95"
          >
            {websiteContent.hero.secondaryCta.label}
          </Link>
        </motion.div>
      </div>

      {/* 5. Floating Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-cream-300/70">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-cream-200" />
        </motion.div>
      </motion.div>
    </section>
  );
}
