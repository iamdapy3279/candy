"use client";

import Image from "next/image";
import Link from "next/link";
import { websiteContent } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-cream-100 pt-20 pb-12 border-t border-navy-800/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start">
          
          {/* Brand Info & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gold-500/40 shrink-0 flex items-center justify-center bg-navy-900">
                <Image
                  src="/Logo.png"
                  alt="X&Y Bakehouse"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-cream-50 uppercase block">
                  X&Y Bakehouse
                </span>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-500 font-semibold block">
                  Bakehouse & Bistro • Kolkata
                </span>
              </div>
            </div>
            <p className="font-serif text-base text-cream-200/80 max-w-sm italic">
              “{websiteContent.footer.tagline}”
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold-500 font-bold block mb-4">
              Explore
            </span>
            <ul className="space-y-2.5">
              {websiteContent.navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    className="font-serif text-sm text-cream-200/70 hover:text-gold-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery & Social Partners */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold-500 font-bold block mb-3">
                Order Online
              </span>
              <div className="flex items-center gap-4">
                {websiteContent.footer.deliveryPartners.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 transition-all duration-300 hover:scale-105"
                  >
                    <Image
                      src={partner.icon}
                      alt={partner.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain shrink-0"
                    />
                    <span className="font-sans text-xs font-semibold text-cream-100">
                      {partner.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold-500 font-bold block mb-3">
                Connect With Us
              </span>
              <a
                href={websiteContent.footer.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-cream-200/80 hover:text-gold-500 transition-colors group"
              >
                <div className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform overflow-hidden">
                  <Image
                    src={websiteContent.footer.instagram.icon}
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="font-sans text-xs font-semibold tracking-wider">
                  {websiteContent.footer.instagram.handle}
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-300/60 font-sans tracking-wider gap-4">
          <p>{websiteContent.footer.copyright}</p>
          <p className="font-serif italic text-cream-300/50">
            Crafted for mornings, lingering lunches, and slow evenings.
          </p>
        </div>

      </div>
    </footer>
  );
}

