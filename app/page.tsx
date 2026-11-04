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
      <div className="w-full order-1">
        <Hero />
      </div>

      {/* 3. Our Philosophy (Two-column layout, cathedral arch with continuous glowing light beam) */}
      <div className="w-full order-2">
        <Philosophy />
      </div>

      {/* 4. Our Location: On mobile placed right below Our Philosophy (order-3), on desktop placed after Evolution (md:order-5) */}
      <div className="w-full order-3 md:order-5">
        <Location />
      </div>

      {/* 5. Food & Drinks: order-4 on mobile, md:order-3 on desktop */}
      <div className="w-full order-4 md:order-3">
        <FoodAndDrinks />
      </div>

      {/* 6. Our Evolution: order-5 on mobile, md:order-4 on desktop */}
      <div className="w-full order-5 md:order-4">
        <Evolution />
      </div>

      {/* 7. Footer: order-6 on mobile, md:order-6 on desktop */}
      <div className="w-full order-6 md:order-6">
        <Footer />
      </div>
    </main>
  );
}
