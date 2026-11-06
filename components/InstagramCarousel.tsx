"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { InstagramMediaItem } from "@/lib/getInstagramPosts";

/**
 * Single configurable Instagram profile URL
 * Clicking any item in the carousel opens this profile in a new tab.
 */
export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/xybakehouse";

interface InstagramCarouselProps {
  posts?: InstagramMediaItem[];
}

export default function InstagramCarousel({ posts = [] }: InstagramCarouselProps) {
  // If no posts provided, return null (never display empty slides)
  if (!posts || posts.length === 0) {
    return null;
  }

  // Ensure enough items for smooth 5-card 3D coverflow wrapping
  const items = posts.length < 5 ? [...posts, ...posts, ...posts] : posts;
  const total = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisibleInViewport, setIsVisibleInViewport] = useState(true);

  // Drag tracking to prevent accidental navigation on swipe
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const hasDraggedRef = useRef(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile viewport for tailored 3D transform metrics
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Viewport intersection observer to pause videos & auto-scroll when out of screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisibleInViewport(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic scrolling loop (resumes after user interaction)
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || isPaused || !isVisibleInViewport || total <= 1) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 3800);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused, isVisibleInViewport, total, handleNext]);

  // Pointer & touch swipe handling
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    hasDraggedRef.current = false;
    setIsPaused(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;
    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;

    if (Math.hypot(deltaX, deltaY) > 8) {
      hasDraggedRef.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartRef.current) {
      const deltaX = e.clientX - pointerStartRef.current.x;
      const deltaTime = Date.now() - pointerStartRef.current.time;

      // Detect deliberate swipe (> 40px or fast flick)
      if (Math.abs(deltaX) > 40 || (Math.abs(deltaX) > 20 && deltaTime < 250)) {
        if (deltaX < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }

    pointerStartRef.current = null;
    // Resume auto-scroll after a short delay
    setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  // Safe Instagram profile click handler (blocked if user was dragging/swiping)
  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    window.open(INSTAGRAM_PROFILE_URL, "_blank", "noopener,noreferrer");
  };

  // Calculate circular offset (-2, -1, 0, 1, 2)
  const getOffset = (index: number) => {
    let diff = index - currentIndex;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      ref={containerRef}
      aria-label="Instagram Carousel"
      className="w-full py-12 md:py-20 overflow-hidden relative select-none bg-cream-100 flex flex-col items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* 3D Perspective Stage */}
      <div
        className="w-full max-w-7xl relative flex items-center justify-center"
        style={{
          perspective: isMobile ? "900px" : "1200px",
          height: isMobile ? "460px" : "550px",
        }}
      >
        {/* Navigation Arrow: Previous */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white text-neutral-900 shadow-[0_4px_20px_rgba(0,0,0,0.16)] flex items-center justify-center hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          <ChevronLeft className="w-5 h-5 text-neutral-800" strokeWidth={2.5} />
        </button>

        {/* Navigation Arrow: Next */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white text-neutral-900 shadow-[0_4px_20px_rgba(0,0,0,0.16)] flex items-center justify-center hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          <ChevronRight className="w-5 h-5 text-neutral-800" strokeWidth={2.5} />
        </button>

        {/* Cards Track */}
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => {
            const diff = getOffset(index);
            const isVisible = Math.abs(diff) <= (isMobile ? 1 : 2);
            const isActive = diff === 0;

            // Compute 3D Coverflow transform matching the reference screenshot
            let transform = "";
            let zIndex = 0;
            let opacity = 0;
            let pointerEvents: "auto" | "none" = "none";
            let filter = "brightness(1)";

            if (isMobile) {
              if (diff === 0) {
                transform = "translateX(0%) translateZ(30px) rotateY(0deg) scale(1)";
                zIndex = 30;
                opacity = 1;
                pointerEvents = "auto";
              } else if (diff === -1) {
                transform = "translateX(-60%) translateZ(-40px) rotateY(22deg) scale(0.85)";
                zIndex = 20;
                opacity = 0.85;
                filter = "brightness(0.92)";
                pointerEvents = "auto";
              } else if (diff === 1) {
                transform = "translateX(60%) translateZ(-40px) rotateY(-22deg) scale(0.85)";
                zIndex = 20;
                opacity = 0.85;
                filter = "brightness(0.92)";
                pointerEvents = "auto";
              } else {
                transform = `translateX(${diff > 0 ? 120 : -120}%) translateZ(-150px) scale(0.6)`;
                zIndex = 0;
                opacity = 0;
              }
            } else {
              // Desktop 5-card Coverflow
              if (diff === 0) {
                transform = "translateX(0%) translateZ(40px) rotateY(0deg) scale(1.02)";
                zIndex = 30;
                opacity = 1;
                pointerEvents = "auto";
              } else if (diff === -1) {
                transform = "translateX(-72%) translateZ(-40px) rotateY(24deg) scale(0.88)";
                zIndex = 20;
                opacity = 0.95;
                filter = "brightness(0.92)";
                pointerEvents = "auto";
              } else if (diff === 1) {
                transform = "translateX(72%) translateZ(-40px) rotateY(-24deg) scale(0.88)";
                zIndex = 20;
                opacity = 0.95;
                filter = "brightness(0.92)";
                pointerEvents = "auto";
              } else if (diff === -2) {
                transform = "translateX(-134%) translateZ(-100px) rotateY(34deg) scale(0.76)";
                zIndex = 10;
                opacity = 0.82;
                filter = "brightness(0.82)";
                pointerEvents = "auto";
              } else if (diff === 2) {
                transform = "translateX(134%) translateZ(-100px) rotateY(-34deg) scale(0.76)";
                zIndex = 10;
                opacity = 0.82;
                filter = "brightness(0.82)";
                pointerEvents = "auto";
              } else {
                transform = `translateX(${diff > 0 ? 180 : -180}%) translateZ(-200px) scale(0.55)`;
                zIndex = 0;
                opacity = 0;
              }
            }

            return (
              <div
                key={`${item.id}-${index}`}
                onClick={handleCardClick}
                style={{
                  transform,
                  zIndex,
                  opacity,
                  pointerEvents,
                  filter,
                  transition:
                    "transform 0.55s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.55s ease, filter 0.55s ease",
                  willChange: "transform, opacity",
                }}
                className={`absolute w-[220px] sm:w-[250px] md:w-[280px] lg:w-[295px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer shadow-[0_16px_40px_rgba(0,0,0,0.22)] bg-neutral-900 group`}
              >
                {/* Media Element: Image or Video */}
                {item.type === "video" ? (
                  <VideoCard
                    src={item.src}
                    isActive={isActive && isVisibleInViewport}
                    isNearActive={Math.abs(diff) <= 1}
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt="X&Y Instagram Feed"
                    fill
                    sizes="(max-width: 768px) 250px, 300px"
                    priority={Math.abs(diff) <= 1}
                    loading={Math.abs(diff) <= 1 ? "eager" : "lazy"}
                    className="object-cover w-full h-full pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {/* Top-Left Profile Badge Pill (Exact 1:1 match to design reference) */}
                <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none select-none">
                  <div className="bg-white/95 backdrop-blur-md rounded-full pl-1.5 pr-3.5 py-1 flex items-center gap-2 shadow-sm border border-white/40">
                    {/* Circular avatar with "xy." matching "es." in reference */}
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] sm:text-[11px] font-bold tracking-tighter">
                      xy.
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] sm:text-xs font-semibold text-neutral-900 leading-tight">
                        xybakehouse
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-400 font-medium leading-tight">
                        instagram
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top-Right Instagram Logo Glyph (Exact match to reference) */}
                <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none select-none">
                  <div className="p-1 rounded-full drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                    <InstagramGlyph />
                  </div>
                </div>

                {/* Subtle bottom gradient for depth */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Dedicated Video Card Component
 * Handles autoplay when active & in view, silent playback, looping, and preloading only for nearby cards.
 */
function VideoCard({
  src,
  isActive,
  isNearActive,
}: {
  src: string;
  isActive: boolean;
  isNearActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented; videos are muted so this rarely occurs
        });
      }
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      controls={false}
      preload={isNearActive ? "metadata" : "none"}
      className="object-cover w-full h-full pointer-events-none select-none"
    />
  );
}

/**
 * Camera/Instagram Outline Glyph matching the reference screenshot top-right icon
 */
function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E1306C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-pink-500"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

