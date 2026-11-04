"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "MENU", href: "/Menu.pdf", isExternal: true, isHighlighted: true },
    { label: "JOURNEY", href: "#evolution", isExternal: false },
    { label: "LOCATION", href: "#locations", isExternal: false },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-40 bg-transparent py-6 sm:py-8 border-b border-transparent text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        
        {/* Left: Brand Text Logo (Hidden on Mobile, Visible on Desktop) */}
        <Link href="/" className="hidden md:flex items-center group">
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] uppercase text-white drop-shadow-md">
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
                item.isHighlighted
                  ? "text-gold-400 font-bold border-b-2 border-gold-400 pb-0.5 drop-shadow-sm"
                  : "text-white/90 hover:text-white hover:drop-shadow"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle (Right-aligned on mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden ml-auto p-2 rounded-lg text-white hover:bg-white/10 transition-colors drop-shadow"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
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
            className="md:hidden bg-[#F8F3ED] border-b border-[#E8DCCB] px-6 py-6 text-navy-800 shadow-xl mt-4"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-sans text-xs tracking-[0.2em] uppercase font-semibold py-2 border-b border-cream-200 ${
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
