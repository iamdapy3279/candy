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

      {/* 4. Our Locations (Placed directly below Our Philosophy) */}
      <Location />

      {/* 5. Food & Drinks */}
      <FoodAndDrinks />

      {/* 6. Our Evolution */}
      <Evolution />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
