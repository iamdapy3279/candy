"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import GlowingBorder from "@/components/ui/GlowingBorder";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "MENU", href: "/Menu.pdf", isExternal: true, isHighlighted: true },
    { label: "JOURNEY", href: "#evolution", isExternal: false },
    { label: "LOCATION", href: "#locations", isExternal: false },
  ];

  return (
    <>
      {/* 1. Desktop Header (Non-sticky, clean transparent navigation across hero) */}
      <header className="hidden md:block absolute top-0 left-0 right-0 z-40 bg-transparent py-6 sm:py-8 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          
          {/* Brand Text Logo */}
          <Link href="/" className="flex items-center group">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] uppercase text-white drop-shadow-md">
              X&Y Bakehouse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-10">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className={`font-sans text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 relative py-1 ${
                  item.isHighlighted
                    ? "text-gold-400 font-bold border-b-2 border-gold-400 pb-0.5 drop-shadow-sm"
                    : "text-white/90 hover:text-white hover:drop-shadow"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* 2. Mobile Floating Circular Menu Button with Continuous Glowing Border Animation (Top Right) */}
      <div className="md:hidden absolute top-5 right-5 z-50">
        <GlowingBorder
          borderWidth={2}
          borderRadius="9999px"
          duration={5}
          beamColor="#D4A34A"
          glowIntensity="soft"
          className="w-12 h-12 rounded-full shadow-2xl"
        >
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full h-full rounded-full bg-navy-950/85 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-90"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-gold-400" />
            ) : (
              <MenuIcon size={20} className="text-cream-100" />
            )}
          </button>
        </GlowingBorder>
      </div>

      {/* 3. Mobile Backdrop & Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40"
            />

            {/* Floating Luxury Modal Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-20 right-5 left-5 z-50 bg-[#F8F3ED] border border-[#E8DCCB] rounded-2xl p-6 shadow-2xl text-navy-800"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DCCB]">
                <div>
                  <span className="font-serif text-lg font-bold tracking-wider text-navy-800 uppercase block">
                    X&Y Bakehouse
                  </span>
                  <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-gold-700 font-semibold block mt-0.5">
                    Kolkata
                  </span>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-3 pt-5">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-sans text-xs tracking-[0.22em] uppercase font-semibold py-3 flex items-center justify-between border-b border-cream-200/80 ${
                      item.isHighlighted ? "text-gold-700 font-bold" : "text-navy-800 hover:text-gold-700"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-gold-700/60">→</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
