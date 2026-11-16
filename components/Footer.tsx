"use client";

import Link from "next/link";
import { websiteContent } from "@/lib/content";

export default function Footer() {
  const instagramUrl =
    websiteContent.footer?.instagram?.url || "https://www.instagram.com/xandy.india/";

  return (
    <footer
      aria-label="Footer"
      className="bg-cream-100 py-6 sm:py-8 border-t border-[#211714]/15 select-none transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Desktop View: Left Instagram Icon, Right Links & Order Catering Button */}
        <div className="hidden md:flex items-center justify-between gap-6">
          {/* Left: Instagram Icon */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full bg-[#211714] text-white hover:bg-gold-500 hover:text-[#211714] flex items-center justify-center transition-colors duration-200 active:scale-95 cursor-pointer shrink-0"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Right: Editorial Links & Order Catering Button */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link
              href="#philosophy"
              className="font-serif font-bold text-base lg:text-[17px] text-[#211714] hover:text-gold-700 transition-colors tracking-tight"
            >
              Join the Flock
            </Link>
            <Link
              href="#evolution"
              className="font-serif font-bold text-base lg:text-[17px] text-[#211714] hover:text-gold-700 transition-colors tracking-tight"
            >
              Blogs
            </Link>
            <Link
              href="#locations"
              className="font-serif font-bold text-base lg:text-[17px] text-[#211714] hover:text-gold-700 transition-colors tracking-tight"
            >
              Contact Us
            </Link>
            <Link
              href="#press"
              className="font-serif font-bold text-base lg:text-[17px] text-[#211714] hover:text-gold-700 transition-colors tracking-tight"
            >
              Press
            </Link>
            <Link
              href="#"
              className="font-serif font-bold text-base lg:text-[17px] text-[#211714] hover:text-gold-700 transition-colors tracking-tight"
            >
              Accessibility
            </Link>

            <a
              href="#locations"
              className="inline-block bg-[#211714] hover:bg-gold-500 hover:text-[#211714] text-white font-serif font-bold text-base lg:text-[17px] px-6 py-2.5 transition-colors duration-200 cursor-pointer shadow-xs"
            >
              Order Catering
            </a>
          </div>
        </div>

        {/* Mobile View: Centered Instagram, Wrapped Links, Order Catering Button */}
        <div className="flex md:hidden flex-col items-center gap-5 py-2">
          {/* Centered Instagram Icon */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full bg-[#211714] text-white hover:bg-gold-500 hover:text-[#211714] flex items-center justify-center transition-colors duration-200 active:scale-95 cursor-pointer shrink-0"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2.5 text-center">
            <Link
              href="#philosophy"
              className="font-serif font-bold text-sm sm:text-base text-[#211714] hover:text-gold-700 transition-colors"
            >
              Join the Flock
            </Link>
            <Link
              href="#evolution"
              className="font-serif font-bold text-sm sm:text-base text-[#211714] hover:text-gold-700 transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="#locations"
              className="font-serif font-bold text-sm sm:text-base text-[#211714] hover:text-gold-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="#press"
              className="font-serif font-bold text-sm sm:text-base text-[#211714] hover:text-gold-700 transition-colors"
            >
              Press
            </Link>
            <Link
              href="#"
              className="font-serif font-bold text-sm sm:text-base text-[#211714] hover:text-gold-700 transition-colors"
            >
              Accessibility
            </Link>
          </div>

          {/* Order Catering Button */}
          <div className="w-full flex justify-center sm:justify-end pt-1">
            <a
              href="#locations"
              className="inline-block bg-[#211714] hover:bg-gold-500 hover:text-[#211714] text-white font-serif font-bold text-base px-7 py-2.5 transition-colors duration-200 cursor-pointer shadow-xs text-center"
            >
              Order Catering
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
