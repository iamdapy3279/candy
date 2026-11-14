"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Critical homepage assets required immediately before dismissing the loading screen
const CRITICAL_IMAGES = [
  "/Hero.webp",
  "/Hero-mobile.webp",
  "/LoadingImage.png",
  "/Logo.png",
  "/locations/Allipore_Location.webp",
  "/locations/KolkataMonumentTransparent.png",
  "/locations/SALTLAKELOCATIONPIC.webp",
  "/dishes/burnt-chilli-oil-spaghetti.webp",
  "/dishes/mongolian-bowl.webp",
  "/dishes/burrata-pizza.webp",
  "/dishes/loaded-nachos.webp",
  "/icons/swiggy.png",
  "/icons/zomato.png",
  "/icons/instagram.png",
];

// Secondary assets preloaded immediately in background so Menu & Gallery open with 0ms latency
const SECONDARY_IMAGES = [
  "/menu/page-01.webp",
  "/menu/page-02.webp",
  "/menu/page-03.webp",
  "/menu/page-04.webp",
  "/menu/page-05.webp",
  "/menu/page-06.webp",
  "/menu/page-07.webp",
  "/menu/page-08.webp",
  "/menu/page-09.webp",
  "/menu/page-10.webp",
  "/menu/page-11.webp",
  "/menu/page-12.webp",
  "/dishes/apple-pie.webp",
  "/dishes/chocolate-eclair.webp",
  "/dishes/new-york-cheesecake.webp",
  "/dishes/protein-bread.webp",
  "/dishes/sourdoughs.webp",
  "/dishes/croissants.webp",
  "/locations/Allipore_Location2.webp",
  "/locations/Saltlake_Location2.webp",
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    let loadedCount = 0;
    const totalCritical = CRITICAL_IMAGES.length;

    const finishLoading = () => {
      if (isFinishedRef.current) return;
      isFinishedRef.current = true;
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "unset";
      }, 250);
    };

    // Helper to preload and decode an image into GPU/browser memory cache
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        if (typeof window === "undefined") {
          resolve();
          return;
        }
        const img = new window.Image();
        img.src = src;

        const onFinish = () => {
          if ("decode" in img) {
            img.decode().then(resolve).catch(resolve);
          } else {
            resolve();
          }
        };

        if (img.complete) {
          onFinish();
        } else {
          img.onload = onFinish;
          img.onerror = () => resolve();
        }
      });
    };

    // 1. Preload all critical images with real progress tracking
    CRITICAL_IMAGES.forEach((src) => {
      preloadImage(src).then(() => {
        if (isFinishedRef.current) return;
        loadedCount += 1;
        const currentPercent = Math.min(Math.round((loadedCount / totalCritical) * 100), 98);
        setProgress(currentPercent);
        if (loadedCount >= totalCritical) {
          finishLoading();
        }
      });
    });

    // 2. Preload secondary images (Menu pages, extra dishes) simultaneously in background
    SECONDARY_IMAGES.forEach((src) => {
      preloadImage(src);
    });

    // 3. Fallback safety timer: ensures loading screen dismisses even on poor 3G networks (max 2.4s)
    const safetyTimer = setTimeout(() => {
      finishLoading();
    }, 2400);

    return () => {
      clearTimeout(safetyTimer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#fbf9f8] flex flex-col items-center justify-center p-6 select-none pointer-events-auto"
        >
          {/* Centered Transparent Illustration Container */}
          <div className="relative w-full max-w-[500px] h-72 sm:h-80 md:h-[380px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex items-center justify-center w-72 h-72 sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px]"
            >
              <Image
                src="/LoadingImage.png"
                alt="What's said on this table stays on this table - X&Y"
                fill
                priority
                className="object-contain drop-shadow-sm"
                sizes="(max-width: 768px) 320px, 420px"
              />
            </motion.div>
          </div>

          {/* Minimal Elegant Gold Progress Bar Bound to Real Asset Load Progress */}
          <div className="w-48 sm:w-60 h-[2.5px] bg-navy-800/10 rounded-full mt-4 sm:mt-6 overflow-hidden relative">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 top-0 bottom-0 bg-gold-500 rounded-full"
            />
          </div>

          {/* Subtle Bistro Tag */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="font-sans text-[11px] tracking-[0.25em] uppercase text-navy-800 font-semibold mt-4"
          >
            Bakehouse &amp; Bistro • Kolkata
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
