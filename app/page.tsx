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
      {/* 1. Header (Cream background, navy logo left, navigation right, scroll-state transition) */}
      <Header />

      {/* 2. Hero Section (100vh full-bleed video + fallback cover + centered editorial typography) */}
      <Hero />

      {/* 3. Our Philosophy (Two-column layout, cathedral arch photo left, narrative & kinetic values right) */}
      <Philosophy />

      {/* 4. Food & Drinks (3D Stacked photography carousel + artisanal fine-line illustration & caption) */}
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
