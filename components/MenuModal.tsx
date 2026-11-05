"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Images, ChevronLeft, ChevronRight } from "lucide-react";

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

const categories = [
  { label: "All", page: 1 },
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

// Pure signature dish images (no text, no overlays)
const dishImages = [
  "/dishes/Dish1.jpg",
  "/dishes/Dish2.jpg",
  "/dishes/Dish3.jpg",
  "/dishes/Dish4.jpg",
  "/dishes/Dish5.jpg",
  "/dishes/Dish7.jpg",
  "/dishes/Dish8.jpg",
  "/dishes/Dish9.jpg",
  "/dishes/Dish10.jpg",
];

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryBarRef = useRef<HTMLDivElement>(null);
  const galleryCarouselRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(0);

  // Lock background scroll when open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (isGalleryOpen) {
            setIsGalleryOpen(false);
          } else {
            onClose();
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, isGalleryOpen, onClose]);

  // Track currently visible page on scroll
  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageId = Number(entry.target.getAttribute("data-page-id"));
            if (pageId) {
              setCurrentPage(pageId);
            }
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.4,
      }
    );

    const pageElements = document.querySelectorAll("[data-page-id]");
    pageElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isOpen]);

  // Auto-scroll active category pill into view in the horizontal pill bar
  useEffect(() => {
    const activePill = document.getElementById(`cat-pill-${currentPage}`);
    if (activePill && categoryBarRef.current) {
      activePill.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentPage]);

  // Track active index in gallery swipe carousel
  const handleGalleryScroll = () => {
    if (!galleryCarouselRef.current) return;
    const { scrollLeft, clientWidth } = galleryCarouselRef.current;
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth);
      setCurrentGalleryIndex(newIndex);
    }
  };

  const scrollToGalleryIndex = (index: number) => {
    if (!galleryCarouselRef.current) return;
    const clientWidth = galleryCarouselRef.current.clientWidth;
    galleryCarouselRef.current.scrollTo({
      left: index * clientWidth,
      behavior: "smooth",
    });
    setCurrentGalleryIndex(index);
  };

  const scrollToPage = (pageNum: number) => {
    const target = document.getElementById(`menu-page-${pageNum}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Find active category
  const activeCategory =
    categories.slice().reverse().find((c) => currentPage >= c.page) || categories[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#F8F3ED] text-[#211714]"
        >
          {/* Top Sticky Header */}
          <header className="sticky top-0 z-50 bg-[#F8F3ED]/95 backdrop-blur-md pt-3.5 pb-2 border-b border-[#E8DCCB]/60 select-none">
            {/* Top Row: Back button, Title & Subtitle, Close button */}
            <div className="px-4 sm:px-8 flex items-center justify-between">
              {/* Back Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[#EFE6DA]/70 hover:bg-[#E2D5C3] text-navy-900 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                aria-label="Back to website"
              >
                <ArrowLeft size={19} className="text-[#3A2E28]" />
              </button>

              {/* Center: Brand Title & Subtitle */}
              <div className="text-center px-2 flex flex-col items-center">
                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#211714] tracking-normal leading-tight">
                  X&amp;Y Bakehouse
                </h1>
                <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold-700 font-semibold block mt-0.5">
                  Food &amp; Beverage Menu
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[#EFE6DA]/70 hover:bg-[#E2D5C3] text-navy-900 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                aria-label="Close menu modal"
              >
                <X size={19} className="text-[#3A2E28]" />
              </button>
            </div>

            {/* Architectural Heritage Monument Illustration directly below title */}
            <div className="w-48 sm:w-60 h-7 sm:h-9 relative mx-auto mt-1 pointer-events-none opacity-85">
              <Image
                src="/locations/KolkataMonumentTransparent.png"
                alt="X&Y Kolkata Heritage"
                fill
                priority
                className="object-contain object-center"
              />
            </div>

            {/* Horizontal Scrollable Category Filter Pills */}
            <nav
              ref={categoryBarRef}
              aria-label="Menu Category Filter"
              className="mt-2.5 px-3 sm:px-6 overflow-x-auto no-scrollbar flex items-center gap-2 pb-1"
            >
              {categories.map((cat) => {
                const isActive = activeCategory.label === cat.label;
                return (
                  <button
                    key={cat.label}
                    id={`cat-pill-${cat.page}`}
                    onClick={() => scrollToPage(cat.page)}
                    className={`shrink-0 px-4 sm:px-5 py-1.5 rounded-full text-xs font-medium font-sans transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#9B7043] text-white shadow-xs"
                        : "bg-white/80 hover:bg-white text-[#5C4A3E] border border-[#E8DCCB] shadow-2xs"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </nav>
          </header>

          {/* RIGHT FLOATING SQUIRCLE DELIVERY BUTTONS (SWIGGY & ZOMATO ONLY) */}
          <aside
            aria-label="Order Delivery"
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 select-none"
          >
            {/* Swiggy Squircle Button */}
            <a
              href="https://www.swiggy.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Order on Swiggy"
              aria-label="Order on Swiggy"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-lg border border-[#FE5005]/20 flex items-center justify-center p-2 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/icons/SwiggyAppIcon.png"
                  alt="Order on Swiggy"
                  fill
                  className="object-contain"
                />
              </div>
            </a>

            {/* Zomato Squircle Button */}
            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Order on Zomato"
              aria-label="Order on Zomato"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#E23744] shadow-lg border border-white/20 flex items-center justify-center p-2.5 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/icons/ZomatoAppIcon.png"
                  alt="Order on Zomato"
                  fill
                  className="object-contain"
                />
              </div>
            </a>
          </aside>

          {/* MAIN SCROLLABLE MENU CARDS CONTAINER */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 sm:py-6"
          >
            <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto flex flex-col items-center gap-5 sm:gap-6 pb-24">
              {menuPages.map((page, index) => (
                <div
                  key={page.id}
                  id={`menu-page-${page.id}`}
                  data-page-id={page.id}
                  className="relative w-full aspect-[1190/1683] bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg overflow-hidden border border-[#E8DCCB] transition-transform duration-300 scroll-mt-36"
                >
                  <Image
                    src={page.src}
                    alt={page.alt}
                    fill
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 672px, 768px"
                  />
                  {/* Subtle Page Counter Pill inside Card */}
                  <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 font-sans text-[10px] sm:text-xs font-medium tracking-wider text-[#403630]/80 bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#E8DCCB] select-none shadow-2xs">
                    {String(page.id).padStart(2, "0")} / 12
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM FLOATING "GALLERY" BUTTON */}
          <div className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 select-none">
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 rounded-full bg-navy-950/90 hover:bg-gold-500 text-cream-100 hover:text-navy-950 border border-white/20 shadow-2xl font-sans text-xs uppercase tracking-[0.22em] font-semibold transition-all active:scale-95 cursor-pointer backdrop-blur-md group"
              aria-label="Open Signature Dishes Gallery"
            >
              <Images size={16} className="text-gold-400 group-hover:text-navy-950 transition-colors" />
              <span>Gallery</span>
            </button>
          </div>

          {/* PURE PHOTO GALLERY POPUP (ONLY IMAGES, NO TEXT, NO OVERLAYS, NO DISH NAMES) */}
          <AnimatePresence>
            {isGalleryOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
                onClick={() => setIsGalleryOpen(false)}
              >
                {/* Floating Minimal Close Button */}
                <button
                  onClick={() => setIsGalleryOpen(false)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer z-30"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                {/* Pure Swipe-to-Scroll Image Carousel */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black/40 border border-white/10"
                >
                  <div
                    ref={galleryCarouselRef}
                    onScroll={handleGalleryScroll}
                    className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
                  >
                    {dishImages.map((src, idx) => (
                      <div
                        key={idx}
                        className="w-full h-full shrink-0 snap-center relative"
                      >
                        <Image
                          src={src}
                          alt="Signature Dish"
                          fill
                          priority={idx === 0}
                          className="object-cover"
                          sizes="(max-width: 640px) 90vw, 448px"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Desktop Left / Right Navigation Arrows */}
                  {currentGalleryIndex > 0 && (
                    <button
                      onClick={() => scrollToGalleryIndex(currentGalleryIndex - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all active:scale-90 cursor-pointer shadow-lg z-20 hidden sm:flex"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}

                  {currentGalleryIndex < dishImages.length - 1 && (
                    <button
                      onClick={() => scrollToGalleryIndex(currentGalleryIndex + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all active:scale-90 cursor-pointer shadow-lg z-20 hidden sm:flex"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}
                </motion.div>

                {/* Minimal Dots Indicator */}
                <div className="mt-4 flex items-center gap-1.5 select-none z-20">
                  {dishImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToGalleryIndex(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentGalleryIndex === idx
                          ? "w-5 bg-white"
                          : "w-1.5 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Photo ${idx + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
