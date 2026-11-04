"use client";

import React from "react";

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number; // in pixels
  borderRadius?: string; // CSS border-radius value
  innerBorderRadius?: string; // Optional explicit inner border-radius
  duration?: number; // animation duration in seconds
  beamColor?: string; // primary light beam color
  glowIntensity?: "subtle" | "soft" | "intense";
}

export default function GlowingBorder({
  children,
  className = "",
  borderWidth = 2,
  borderRadius = "1rem", // 1rem matches brand pill radius
  innerBorderRadius,
  duration = 8, // 8s calm luxury travel speed
  beamColor = "#D4A34A", // Warm Champagne Gold
  glowIntensity = "subtle",
}: GlowingBorderProps) {
  // Glow blur and opacity based on subtle brand styling
  const glowConfig = {
    subtle: { blur: "blur-[3px]", opacity: "opacity-40" },
    soft: { blur: "blur-[6px]", opacity: "opacity-50" },
    intense: { blur: "blur-[10px]", opacity: "opacity-70" },
  }[glowIntensity];

  // Concentrated travelling beam: mostly transparent with a focused arc
  const conicGradient = `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(212, 163, 74, 0.25) 320deg, ${beamColor} 360deg)`;

  const effectiveInnerRadius =
    innerBorderRadius ||
    (borderRadius.includes(" ")
      ? borderRadius
      : `calc(${borderRadius} - ${borderWidth}px)`);

  return (
    <div
      className={`relative p-[var(--border-width)] ${className}`}
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--beam-duration": `${duration}s`,
          borderRadius,
        } as React.CSSProperties
      }
    >
      {/* 1. Ambient Soft Glow Layer (Hardware-accelerated) */}
      <div
        className={`absolute -inset-[1px] overflow-hidden pointer-events-none ${glowConfig.blur} ${glowConfig.opacity}`}
        style={{ borderRadius }}
      >
        <div
          className="w-[200%] h-[200%] -left-[50%] -top-[50%] absolute origin-center pointer-events-none animate-spin-light-beam"
          style={{
            background: conicGradient,
          }}
        />
      </div>

      {/* 2. Sharp Travelling Light Beam Layer (Hardware-accelerated) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ borderRadius }}
      >
        <div
          className="w-[200%] h-[200%] -left-[50%] -top-[50%] absolute origin-center pointer-events-none animate-spin-light-beam"
          style={{
            background: conicGradient,
          }}
        />
      </div>

      {/* 3. Static Base Border Ring (Soft beige #E8DCCB) */}
      <div
        className="absolute inset-0 border border-[#E8DCCB] pointer-events-none"
        style={{ borderRadius }}
      />

      {/* 4. Card Content (Unaffected by animation, perfectly masked inside) */}
      <div
        className="relative z-10 w-full h-full overflow-hidden bg-cream-200 shadow-xl"
        style={{
          borderRadius: effectiveInnerRadius,
          transform: "translateZ(0)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
