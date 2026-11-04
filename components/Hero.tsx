"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
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
    <section className="relative w-full h-screen min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
      {/* 1. Instant Fallback Image (No tint) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={websiteContent.hero.posterImage}
          alt="X&Y Bakehouse ambiance"
          fill
          priority
          className={`object-cover object-center transition-opacity duration-700 ${
            videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </div>

      {/* 2. Seamless Autoplaying Video (Raw natural colors, zero blue tint) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={websiteContent.hero.videoDesktop} type="video/mp4" media="(min-width: 768px)" />
        <source src={websiteContent.hero.videoMobile} type="video/mp4" />
      </video>

      {/* 3. Floating Subtle Scroll Down Indicator */}
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
