"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronUp } from "lucide-react";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuPages = [
  { id: 1, src: "/menu/page-01.webp", alt: "X&Y Bakehouse Menu Cover" },
  { id: 2, src: "/menu/page-02.webp", alt: "X&Y Menu Page 2 - Soups, Salads, Eggs" },
  { id: 3, src: "/menu/page-03.webp", alt: "X&Y Menu Page 3 - Appetizers" },
  { id: 4, src: "/menu/page-04.webp", alt: "X&Y Menu Page 4 - Sandwiches, Wraps & Open Toast" },
  { id: 5, src: "/menu/page-05.webp", alt: "X&Y Menu Page 5 - Burgers & Healthy Bites" },
  { id: 6, src: "/menu/page-06.webp", alt: "X&Y Menu Page 6 - Pasta & Pizza" },
  { id: 7, src: "/menu/page-07.webp", alt: "X&Y Menu Page 7 - The Mains" },
  { id: 8, src: "/menu/page-08.webp", alt: "X&Y Menu Page 8 - Desserts" },
  { id: 9, src: "/menu/page-09.webp", alt: "X&Y Menu Page 9 - Coffee & Matcha" },
  { id: 10, src: "/menu/page-10.webp", alt: "X&Y Menu Page 10 - Teas, Mocktails, Refreshments & Bakery" },
  { id: 11, src: "/menu/page-11.webp", alt: "X&Y Menu Page 11 - Beverages & Signatures" },
  { id: 12, src: "/menu/page-12.webp", alt: "X&Y Menu Page 12 - Bakehouse Specials" },
];

// 1-word smart category shortcuts per user specifications
const categories = [
  { label: "Salads", page: 2 },
  { label: "Appetizers", page: 3 },
  { label: "Sandwiches", page: 4 },
  { label: "Burgers", page: 5 },
  { label: "Pizza", page: 6 },
  { label: "Mains", page: 7 },
  { label: "Desserts", page: 8 },
  { label: "Coffee", page: 9 },
  { label: "Drinks", page: 10 },
];

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState<number>(1);

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

  // Track currently visible page on scroll to highlight matching category
  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageId = Number(entry.target.getAttribute("data-page-id"));
            if (pageId) setActivePage(pageId);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.35,
      }
    );

    const pageElements = document.querySelectorAll("[data-page-id]");
    pageElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isOpen]);

  const scrollToPage = (pageNum: number) => {
    const el = document.getElementById(`menu-page-${pageNum}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          <header className="sticky top-0 z-50 bg-[#F8F3ED]/95 backdrop-blur-md border-b border-[#E8DCCB] px-3 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between shadow-xs select-none">
            {/* Left: Back Arrow Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 -ml-1 rounded-full hover:bg-cream-200 text-navy-900 transition-colors active:scale-95 group cursor-pointer"
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
            <div className="text-center px-1">
              <h2 className="font-sans text-base sm:text-lg font-bold text-navy-900 leading-tight">
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
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream-200 hover:bg-cream-300 text-navy-900 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                aria-label="Close menu modal"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          {/* LEFT SIDE FLOATING 1-WORD CATEGORY SHORTCUTS DOCK */}
          <nav
            aria-label="Menu Categories"
            className="fixed left-1.5 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 bg-navy-950/85 backdrop-blur-md rounded-2xl py-2 px-1 sm:px-1.5 border border-white/15 shadow-2xl flex flex-col gap-0.5 sm:gap-1 select-none max-h-[82vh] overflow-y-auto"
          >
            {categories.map((cat) => {
              const isActive = activePage === cat.page;
              return (
                <button
                  key={cat.page}
                  onClick={() => scrollToPage(cat.page)}
                  title={`Jump to ${cat.label}`}
                  className={`text-[8px] sm:text-[10px] font-sans uppercase tracking-wider font-semibold px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition-all text-center cursor-pointer active:scale-90 ${
                    isActive
                      ? "bg-gold-500 text-navy-950 font-bold shadow-xs scale-105"
                      : "text-cream-200/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT SIDE FLOATING DELIVERY PARTNER BUTTONS (SWIGGY & ZOMATO LOGOS ONLY) */}
          <aside
            aria-label="Order Online"
            className="fixed right-1.5 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 sm:gap-3 select-none"
          >
            {/* Swiggy Button */}
            <a
              href="https://www.swiggy.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Order on Swiggy"
              aria-label="Order on Swiggy"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-xl border border-[#FE5005]/20 flex items-center justify-center p-1.5 sm:p-2 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/icons/SwiggyAppIcon.png"
                  alt="Swiggy"
                  fill
                  className="object-contain"
                />
              </div>
            </a>

            {/* Zomato Button */}
            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Order on Zomato"
              aria-label="Order on Zomato"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-xl border border-[#E23744]/20 flex items-center justify-center p-1.5 sm:p-2 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/icons/ZomatoAppIcon.png"
                  alt="Zomato"
                  fill
                  className="object-contain"
                />
              </div>
            </a>
          </aside>

          {/* Scrollable Document Container (Generous horizontal padding prevents floating side buttons from overlapping the PDF) */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overscroll-contain px-12 sm:px-16 md:px-24 py-4 sm:py-8"
          >
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 sm:gap-6 pb-20">
              {menuPages.map((page, index) => (
                <div
                  key={page.id}
                  id={`menu-page-${page.id}`}
                  data-page-id={page.id}
                  className="relative w-full aspect-[1190/1683] bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden border border-[#E8DCCB] transition-transform duration-300 scroll-mt-16"
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream-200 hover:bg-cream-300 text-navy-900 font-sans text-xs uppercase tracking-wider font-semibold transition-colors shadow-2xs cursor-pointer active:scale-95"
                >
                  <ChevronUp size={16} />
                  <span>Back to Top</span>
                </button>

                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-navy-900 hover:bg-gold-500 text-white hover:text-navy-950 font-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
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
