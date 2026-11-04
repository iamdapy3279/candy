import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import FoodAndDrinks from "@/components/FoodAndDrinks";
import Evolution from "@/components/Evolution";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream-100 flex flex-col">
      {/* 0. Introductory Game-Style Loading Screen (< 4 seconds, fades out to buffered video) */}
      <LoadingScreen />

      {/* 1. Header (Transparent over video, white text, 3 links: Menu, Journey, Location) */}
      <Header />

      {/* 2. Hero Section (100vh full-bleed video + fallback cover) */}
      <Hero />

      {/* 3. Our Philosophy (Two-column layout, cathedral arch with continuous glowing light beam) */}
      <Philosophy />

      {/* 4. Food & Drinks (3D Stacked photography carousel with continuous glowing light beam) */}
      <FoodAndDrinks />

      {/* 5. Our Evolution (Central vertical timeline with scroll-drawn line & alternating milestone cards) */}
      <Evolution />

      {/* 6. Our Location (Reusable outlet selector, information left, layered image & botanical leaf right) */}
      <Location />

      {/* 7. Footer (Minimal, elegant footer with social links, delivery partners & brand signoff) */}
      <Footer />
    </main>
  );
}
