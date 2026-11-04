"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  const loadingImages = [
    {
      src: "/artwork/Doodle6.png",
      alt: "X&Y Bakehouse Welcome",
      width: 140,
      height: 140,
    },
    {
      src: "/LoadingImage.png",
      alt: "What's said on this table stays on this table - X&Y",
      width: 220,
      height: 220,
    },
  ];

  useEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    // Switch to second image at 1.8 seconds
    const switchTimer = setTimeout(() => {
      setImageIndex(1);
    }, 1700);

    // Complete loading screen at 3.5 seconds
    const exitTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
    }, 3500);

    return () => {
      clearTimeout(switchTimer);
      clearTimeout(exitTimer);
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#fbf9f8] flex flex-col items-center justify-center p-6 select-none pointer-events-auto"
        >
          {/* Centered Transparent Illustration Container */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={imageIndex}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative flex items-center justify-center"
              >
                <Image
                  src={loadingImages[imageIndex].src}
                  alt={loadingImages[imageIndex].alt}
                  width={loadingImages[imageIndex].width}
                  height={loadingImages[imageIndex].height}
                  priority
                  className="object-contain drop-shadow-sm"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimal Elegant Gold Progress Bar */}
          <div className="w-36 h-[2px] bg-navy-800/10 rounded-full mt-6 overflow-hidden relative">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.4, ease: "easeInOut" }}
              className="absolute left-0 top-0 bottom-0 bg-gold-500 rounded-full"
            />
          </div>

          {/* Subtle Bistro Tag */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-[10px] tracking-[0.3em] uppercase text-navy-800 font-semibold mt-4"
          >
            Bakehouse & Bistro • Kolkata
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
