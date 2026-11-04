"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "MENU", href: "/Menu.pdf", isExternal: true, isHighlighted: true },
    { label: "JOURNEY", href: "#evolution", isExternal: false },
    { label: "LOCATION", href: "#locations", isExternal: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fbf9f8]/95 backdrop-blur-md py-4 shadow-subtle border-b border-[#eae8e7] text-navy-800"
          : "bg-transparent py-6 border-b border-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        
        {/* Left: Brand Text Logo (Reference Image Typography) */}
        <Link href="/" className="group flex items-center">
          <span
            className={`font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] uppercase transition-colors duration-300 ${
              scrolled ? "text-navy-800" : "text-white drop-shadow-sm"
            }`}
          >
            X&Y Bakehouse
          </span>
        </Link>

        {/* Right: Clean Desktop Navigation (Only Menu, Journey, Location) */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className={`font-sans text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 relative py-1 ${
                scrolled
                  ? item.isHighlighted
                    ? "text-gold-700 font-bold border-b-2 border-gold-500 pb-0.5"
                    : "text-charcoal-900/80 hover:text-navy-800"
                  : item.isHighlighted
                  ? "text-gold-500 font-bold border-b-2 border-gold-500 pb-0.5"
                  : "text-white/90 hover:text-white hover:drop-shadow"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-navy-800 hover:bg-cream-200" : "text-white hover:bg-white/10"
          }`}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#fbf9f8] border-b border-cream-300 px-6 py-6 text-navy-800 shadow-xl"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif text-base tracking-widest uppercase py-2 border-b border-cream-200 ${
                    item.isHighlighted ? "text-gold-700 font-bold" : "text-navy-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
