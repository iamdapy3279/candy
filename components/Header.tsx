"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import GlowingBorder from "@/components/ui/GlowingBorder";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "MENU", href: "/Menu.pdf", isExternal: true, isHighlighted: true },
    { label: "JOURNEY", href: "#evolution", isExternal: false },
    { label: "LOCATION", href: "#locations", isExternal: false },
  ];

  return (
    <>
      {/* Floating Circular Menu Button with Continuous Glowing Border Animation (Top Right on Hero) */}
      <div className="absolute top-5 right-5 sm:top-8 sm:right-10 z-50">
        <GlowingBorder
          borderWidth={2}
          borderRadius="9999px"
          duration={5}
          beamColor="#D4A34A"
          glowIntensity="soft"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl"
        >
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-full h-full rounded-full bg-navy-950/85 backdrop-blur-md text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />
            ) : (
              <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cream-100" />
            )}
          </button>
        </GlowingBorder>
      </div>

      {/* Backdrop & Elegant Editorial Modal Menu Card (Desktop & Mobile) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Soft Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40"
            />

            {/* Editorial Floating Menu Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 right-5 left-5 sm:left-auto sm:right-10 sm:w-80 z-50 bg-[#F8F3ED] border border-[#E8DCCB] rounded-2xl p-6 sm:p-7 shadow-2xl text-navy-800"
            >
              {/* Header inside menu card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DCCB]">
                <div>
                  <span className="font-serif italic text-2xl font-medium tracking-wide text-navy-800 block">
                    X&amp;Y Bakehouse
                  </span>
                  <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-gold-700 font-semibold block mt-0.5">
                    Bakehouse &amp; Bistro • Kolkata
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2 pt-4">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`font-sans text-xs tracking-[0.22em] uppercase font-semibold py-3 px-2 rounded-lg flex items-center justify-between transition-colors border-b border-cream-200/80 last:border-b-0 hover:bg-cream-200/50 ${
                      item.isHighlighted
                        ? "text-gold-700 font-bold"
                        : "text-navy-800 hover:text-gold-700"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-gold-700/60 text-sm">→</span>
                  </Link>
                ))}
              </div>

              {/* Subtle Tagline */}
              <p className="font-serif italic text-xs text-charcoal-800/70 pt-4 mt-2 border-t border-cream-200/80 text-center">
                “Where every table is yours.”
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
