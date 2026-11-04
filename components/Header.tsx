"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { websiteContent } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fbf9f8]/95 backdrop-blur-md py-3 shadow-subtle border-b border-[#eae8e7]"
          : "bg-[#fbf9f8] py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-navy-800/10 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0 flex items-center justify-center bg-cream-200">
            <Image
              src="/Logo.png"
              alt="X&Y Bakehouse"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-navy-800 uppercase leading-none">
              X&Y Bakehouse
            </span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-navy-800/70 mt-1 font-semibold">
              Kolkata • Bistro
            </span>
          </div>
        </Link>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {websiteContent.navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className="font-sans text-xs tracking-[0.12em] uppercase font-semibold text-charcoal-900/80 hover:text-navy-800 transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="#locations"
            className="font-sans text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full bg-gold-500 text-navy-950 hover:bg-gold-600 transition-all duration-300 shadow-sm hover:shadow active:scale-95"
          >
            Find Us
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-navy-800 hover:bg-cream-200 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-cream-100 border-b border-cream-300 px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {websiteContent.navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-base tracking-wider text-navy-800 py-2 border-b border-cream-200"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#locations"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center font-sans text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-full bg-gold-500 text-navy-950 shadow"
              >
                Find Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

