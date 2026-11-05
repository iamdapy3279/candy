"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronUp } from "lucide-react";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuPages = [
  { id: 1, src: "/menu/page-01.webp", alt: "X&Y Bakehouse Menu Cover" },
  { id: 2, src: "/menu/page-02.webp", alt: "X&Y Menu Page 2" },
  { id: 3, src: "/menu/page-03.webp", alt: "X&Y Menu Page 3" },
  { id: 4, src: "/menu/page-04.webp", alt: "X&Y Menu Page 4" },
  { id: 5, src: "/menu/page-05.webp", alt: "X&Y Menu Page 5" },
  { id: 6, src: "/menu/page-06.webp", alt: "X&Y Menu Page 6" },
  { id: 7, src: "/menu/page-07.webp", alt: "X&Y Menu Page 7" },
  { id: 8, src: "/menu/page-08.webp", alt: "X&Y Menu Page 8" },
  { id: 9, src: "/menu/page-09.webp", alt: "X&Y Menu Page 9" },
  { id: 10, src: "/menu/page-10.webp", alt: "X&Y Menu Page 10" },
  { id: 11, src: "/menu/page-11.webp", alt: "X&Y Menu Page 11" },
  { id: 12, src: "/menu/page-12.webp", alt: "X&Y Menu Page 12" },
];

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock background scroll when open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, onClose]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#F8F3ED]"
        >
          {/* Sticky Luxury Modal Top Bar */}
          <header className="sticky top-0 z-50 bg-[#F8F3ED]/95 backdrop-blur-md border-b border-[#E8DCCB] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm select-none">
            {/* Left: Back / Close Arrow Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-1.5 -ml-2 rounded-full hover:bg-cream-200 text-navy-900 transition-colors active:scale-95 group"
              aria-label="Back to website"
            >
              <div className="w-8 h-8 rounded-full bg-cream-200 group-hover:bg-cream-300 flex items-center justify-center transition-colors">
                <ArrowLeft size={18} className="text-navy-900" />
              </div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-navy-900">
                Back
              </span>
            </button>

            {/* Center: Brand & Menu Title */}
            <div className="text-center px-2">
              <h2 className="font-serif italic text-base sm:text-xl font-medium text-navy-900 leading-tight">
                X&amp;Y Bakehouse
              </h2>
              <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold-700 font-semibold block">
                Food &amp; Beverage Menu
              </span>
            </div>

            {/* Right: Close Icon */}
            <div className="flex items-center">
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream-200 hover:bg-cream-300 text-navy-900 flex items-center justify-center transition-colors active:scale-95"
                aria-label="Close menu modal"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          {/* Scrollable Document Container */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-6 py-4 sm:py-8"
          >
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 sm:gap-6 pb-20">
              {menuPages.map((page, index) => (
                <div
                  key={page.id}
                  className="relative w-full aspect-[1190/1683] bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden border border-[#E8DCCB] transition-transform duration-300"
                >
                  <Image
                    src={page.src}
                    alt={page.alt}
                    fill
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 800px"
                  />
                  {/* Subtle Page Counter Badge */}
                  <span className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 font-sans text-[10px] font-semibold tracking-wider text-navy-900/60 bg-cream-100/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#E8DCCB] select-none">
                    {String(page.id).padStart(2, "0")} / 12
                  </span>
                </div>
              ))}

              {/* Bottom Quick Actions Footer */}
              <div className="pt-6 pb-4 flex flex-col sm:flex-row items-center gap-4 text-center select-none">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream-200 hover:bg-cream-300 text-navy-900 font-sans text-xs uppercase tracking-wider font-semibold transition-colors shadow-2xs"
                >
                  <ChevronUp size={16} />
                  <span>Back to Top</span>
                </button>

                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-navy-900 hover:bg-gold-500 text-white hover:text-navy-950 font-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95"
                >
                  <X size={15} />
                  <span>Close Menu</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

