"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    // Snappy, polished entrance that dissolves smoothly once initial assets mount (~850ms)
    const exitTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
    }, 850);

    return () => {
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
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#fbf9f8] flex flex-col items-center justify-center p-6 select-none pointer-events-auto"
        >
          {/* Centered Transparent Illustration Container */}
          <div className="relative w-full max-w-[500px] h-72 sm:h-80 md:h-[380px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
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

          {/* Minimal Elegant Gold Progress Bar */}
          <div className="w-48 sm:w-60 h-[2.5px] bg-navy-800/10 rounded-full mt-4 sm:mt-6 overflow-hidden relative">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
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
