"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import FoodAndDrinks from "@/components/FoodAndDrinks";
import Evolution from "@/components/Evolution";
import Location from "@/components/Location";
import Press from "@/components/Press";
import Footer from "@/components/Footer";
import MenuModal from "@/components/MenuModal";
import ContinuousLineArt from "@/components/home-animation-test/ContinuousLineArt";

export default function HomeAnimationTest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Allow any element on page to open menu via CustomEvent or hash
  useEffect(() => {
    const handleOpen = () => setIsMenuOpen(true);
    window.addEventListener("open-menu-modal", handleOpen);
    return () => window.removeEventListener("open-menu-modal", handleOpen);
  }, []);

  return (
    <main className="min-h-screen bg-cream-100 flex flex-col relative overflow-hidden">
      {/* Experimental Continuous Line-Art Layer with GSAP ScrollTrigger stroke drawing */}
      <ContinuousLineArt />

      {/* 0. Introductory Game-Style Loading Screen */}
      <LoadingScreen />

      {/* 1. Hero Section (100vh full-bleed video + fallback cover) */}
      <Hero onOpenMenu={() => setIsMenuOpen(true)} />

      {/* 2. Our Philosophy (Two-column layout, cathedral arch with continuous glowing light beam) */}
      <Philosophy />

      {/* 3. Our Locations (Placed directly below Our Philosophy) */}
      <Location />

      {/* 4. Food & Drinks */}
      <FoodAndDrinks />

      {/* 5. In The Press (Infinite Auto-Scrolling Carousel) */}
      <Press />

      {/* 6. Our Evolution */}
      <Evolution />

      {/* 7. Footer */}
      <Footer />

      {/* 8. In-Page Interactive Menu Modal (Mobile-first, high-res fitted with back/close arrow) */}
      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </main>
  );
}
