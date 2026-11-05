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

// Signature dishes photo gallery with high-res photography
const signatureDishes = [
  {
    id: "eggs-benedict",
    name: "Eggs Benedict",
    category: "Morning Classic",
    image: "/dishes/Dish1.jpg",
  },
  {
    id: "chilli-spaghetti",
    name: "Burnt Chilli Oil Spaghetti",
    category: "Bistro Signature",
    image: "/dishes/Dish2.jpg",
  },
  {
    id: "cheesecake",
    name: "New York Cheesecake",
    category: "Patisserie Pillar",
    image: "/dishes/Dish3.jpg",
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    category: "Artisanal Bake",
    image: "/dishes/Dish4.jpg",
  },
  {
    id: "gourmet-burger",
    name: "Gourmet Bistro Burger",
    category: "Healthy Bites",
    image: "/dishes/Dish5.jpg",
  },
  {
    id: "truffle-pasta",
    name: "Artisan Handcrafted Pasta",
    category: "Chef's Special",
    image: "/dishes/Dish7.jpg",
  },
  {
    id: "fruit-tart",
    name: "Seasonal Bakehouse Tart",
    category: "Dessert Special",
    image: "/dishes/Dish8.jpg",
  },
  {
    id: "matcha-latte",
    name: "Ceremonial Matcha Latte",
    category: "Beverage",
    image: "/dishes/Dish9.jpg",
  },
  {
    id: "specialty-coffee",
    name: "Specialty Espresso Roast",
    category: "Coffee Bar",
    image: "/dishes/Dish10.jpg",
  },
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

          {/* SMALLER POPUP: SIGNATURE DISHES ONLY PHOTO GALLERY WITH SWIPE-TO-SCROLL */}
          <AnimatePresence>
            {isGalleryOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                onClick={() => setIsGalleryOpen(false)}
              >
                {/* Popup Card Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-sm sm:max-w-md bg-[#211714] rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex flex-col text-white"
                >
                  {/* Gallery Header */}
                  <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-navy-950/80 select-none">
                    <div>
                      <h2 className="font-serif text-lg font-medium tracking-wide text-cream-100 leading-tight">
                        Signature Dishes
                      </h2>
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-400 font-semibold block">
                        Swipe to Explore • {currentGalleryIndex + 1} of {signatureDishes.length}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsGalleryOpen(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Close gallery"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Swipe-to-Scroll Horizontal Carousel Container */}
                  <div className="relative w-full aspect-[4/5] bg-black overflow-hidden group">
                    <div
                      ref={galleryCarouselRef}
                      onScroll={handleGalleryScroll}
                      className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
                    >
                      {signatureDishes.map((dish, idx) => (
                        <div
                          key={dish.id}
                          className="w-full h-full shrink-0 snap-center relative"
                        >
                          <Image
                            src={dish.image}
                            alt={dish.name}
                            fill
                            priority={idx === 0}
                            className="object-cover"
                            sizes="(max-width: 640px) 92vw, 448px"
                          />

                          {/* Subtle Bottom Vignette Gradient with Dish Name */}
                          <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end">
                            <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-gold-400 font-semibold block mb-0.5">
                              {dish.category}
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-medium text-white tracking-wide leading-tight">
                              {dish.name}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Left Chevron Button (Desktop & Click Navigation) */}
                    {currentGalleryIndex > 0 && (
                      <button
                        onClick={() => scrollToGalleryIndex(currentGalleryIndex - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-xs transition-all active:scale-90 cursor-pointer shadow-lg z-10 hidden sm:flex"
                        aria-label="Previous dish"
                      >
                        <ChevronLeft size={20} />
                      </button>
                    )}

                    {/* Right Chevron Button (Desktop & Click Navigation) */}
                    {currentGalleryIndex < signatureDishes.length - 1 && (
                      <button
                        onClick={() => scrollToGalleryIndex(currentGalleryIndex + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-xs transition-all active:scale-90 cursor-pointer shadow-lg z-10 hidden sm:flex"
                        aria-label="Next dish"
                      >
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </div>

                  {/* Carousel Dot Indicators */}
                  <div className="py-3 px-4 bg-navy-950/90 flex items-center justify-center gap-1.5 select-none">
                    {signatureDishes.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToGalleryIndex(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          currentGalleryIndex === idx
                            ? "w-6 bg-gold-400"
                            : "w-1.5 bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={`Go to photo ${idx + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
