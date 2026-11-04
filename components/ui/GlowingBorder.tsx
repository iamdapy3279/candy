"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number; // in pixels
  borderRadius?: string; // CSS border-radius value
  duration?: number; // animation duration in seconds
  beamColor?: string; // primary light beam color
  glowIntensity?: "subtle" | "soft" | "intense";
}

export default function GlowingBorder({
  children,
  className = "",
  borderWidth = 2,
  borderRadius = "1rem", // 1rem matches brand pill radius
  duration = 5, // 5s smooth luxury travel speed
  beamColor = "#FCC215", // Brand Golden Yellow
  glowIntensity = "subtle",
}: GlowingBorderProps) {
  // Glow blur and opacity based on subtle brand styling
  const glowConfig = {
    subtle: { blur: "blur-[3px]", opacity: "opacity-40" },
    soft: { blur: "blur-[6px]", opacity: "opacity-50" },
    intense: { blur: "blur-[10px]", opacity: "opacity-70" },
  }[glowIntensity];

  // Concentrated travelling beam: mostly transparent with a focused arc
  const conicGradient = `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(252, 194, 21, 0.2) 320deg, ${beamColor} 360deg)`;

  return (
    <div
      className={`relative p-[var(--border-width)] ${className}`}
      style={
        {
          "--border-width": `${borderWidth}px`,
          borderRadius,
        } as React.CSSProperties
      }
    >
      {/* 1. Ambient Soft Glow Layer (Blurred around the edge) */}
      <div
        className={`absolute -inset-[1px] overflow-hidden pointer-events-none ${glowConfig.blur} ${glowConfig.opacity}`}
        style={{ borderRadius }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration,
            ease: "linear",
          }}
          className="w-[200%] h-[200%] -left-[50%] -top-[50%] absolute origin-center pointer-events-none"
          style={{
            background: conicGradient,
          }}
        />
      </div>

      {/* 2. Sharp Travelling Light Beam Layer */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ borderRadius }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration,
            ease: "linear",
          }}
          className="w-[200%] h-[200%] -left-[50%] -top-[50%] absolute origin-center pointer-events-none"
          style={{
            background: conicGradient,
          }}
        />
      </div>

      {/* 3. Static Base Border Ring (Keeps a subtle outline when beam is elsewhere) */}
      <div
        className="absolute inset-0 border border-gold-500/15 pointer-events-none"
        style={{ borderRadius }}
      />

      {/* 4. Card Content (Unaffected by animation, perfectly masked inside) */}
      <div
        className="relative z-10 w-full h-full overflow-hidden bg-white shadow-xl"
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
