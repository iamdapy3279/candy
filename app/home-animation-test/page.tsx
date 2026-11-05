"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HeroTest from "@/components/home-animation-test/HeroTest";
import PhilosophyTest from "@/components/home-animation-test/PhilosophyTest";
import LocationTest from "@/components/home-animation-test/LocationTest";
import FoodAndDrinksTest from "@/components/home-animation-test/FoodAndDrinksTest";
import Press from "@/components/Press";
import Evolution from "@/components/Evolution";
import Footer from "@/components/Footer";
import MenuModal from "@/components/MenuModal";

export default function HomeAnimationTest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Allow any element on page to open menu via CustomEvent or hash
  useEffect(() => {
    const handleOpen = () => setIsMenuOpen(true);
    window.addEventListener("open-menu-modal", handleOpen);
    return () => window.removeEventListener("open-menu-modal", handleOpen);
  }, []);

  return (
    <main className="min-h-screen bg-cream-100 flex flex-col relative overflow-x-hidden">
      {/* 0. Introductory Game-Style Loading Screen */}
      <LoadingScreen />

      {/* 1. Hero Section with steam.svg procedural stroke animation */}
      <HeroTest onOpenMenu={() => setIsMenuOpen(true)} />

      {/* 2. Our Philosophy with dedicated background SVG layer behind content */}
      <PhilosophyTest />

      {/* 3. Our Locations with house.svg, car.svg and continuous line behind cards */}
      <LocationTest />

      {/* 4. Food & Drinks with whisk.svg and flowing line behind cards */}
      <FoodAndDrinksTest />

      {/* 5. In The Press (Infinite Auto-Scrolling Carousel - Clean) */}
      <Press />

      {/* 6. Our Evolution */}
      <Evolution />

      {/* 7. Footer */}
      <Footer />

      {/* 8. In-Page Interactive Menu Modal */}
      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </main>
  );
}
