"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface IllustrationProps {
  className?: string;
  strokeWidth?: number;
  strokeColor?: string;
  startTrigger?: string;
  endTrigger?: string;
}

function useScrollDraw(
  svgRef: React.RefObject<SVGSVGElement | null>,
  containerRef: React.RefObject<HTMLDivElement | null>,
  start = "top 85%",
  end = "center 50%"
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));

    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len} ${len}`;
      p.style.strokeDashoffset = prefersReduced ? "0" : `${len}`;
    });

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(paths, {
        strokeDashoffset: 0,
        ease: "none",
        stagger: 0.02,
        scrollTrigger: {
          trigger: container,
          start: start,
          end: end,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [svgRef, containerRef, start, end]);
}

export function CoffeeMugIllustration({
  className = "w-full h-auto",
  strokeWidth = 1.9,
  strokeColor = "#111111",
  startTrigger = "top 85%",
  endTrigger = "center 50%",
}: IllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useScrollDraw(svgRef, containerRef, startTrigger, endTrigger);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <svg ref={svgRef} viewBox="0 0 139 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible" role="img" aria-label="CoffeeMug">
        <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 100.0 59.0 L 100.0 58.0" />
          <path d="M 100.0 59.0 L 101.0 59.0" />
          <path d="M 100.0 59.0 L 89.0 76.0 L 80.0 78.0 L 54.0 78.0 L 49.0 77.0 L 41.0 67.0 L 32.0 52.0 L 27.0 36.0 L 27.0 30.0 L 26.0 29.0 L 27.0 25.0" />
          <path d="M 105.0 52.0 L 104.0 51.0" />
          <path d="M 105.0 52.0 L 114.0 50.0 L 122.0 46.0 L 127.0 41.0 L 128.0 34.0 L 123.0 28.0 L 117.0 28.0 L 109.0 32.0" />
          <path d="M 105.0 52.0 L 104.0 52.0" />
          <path d="M 82.0 29.0 L 80.0 27.0 L 60.0 27.0 L 59.0 28.0 L 54.0 28.0 L 52.0 30.0" />
          <path d="M 82.0 29.0 L 97.0 28.0 L 106.0 24.0" />
          <path d="M 82.0 29.0 L 80.0 31.0 L 53.0 31.0 L 52.0 30.0" />
          <path d="M 27.0 25.0 L 27.0 24.0" />
          <path d="M 27.0 25.0 L 28.0 25.0" />
          <path d="M 52.0 30.0 L 37.0 29.0 L 28.0 25.0" />
          <path d="M 107.0 24.0 L 107.0 23.0" />
          <path d="M 107.0 24.0 L 106.0 24.0" />
          <path d="M 107.0 24.0 L 109.0 26.0" />
          <path d="M 100.0 58.0 L 103.0 52.0" />
          <path d="M 100.0 58.0 L 101.0 59.0" />
          <path d="M 116.0 63.0 L 125.0 65.0 L 131.0 70.0 L 131.0 75.0 L 126.0 80.0 L 117.0 84.0 L 106.0 87.0 L 85.0 89.0 L 84.0 90.0 L 47.0 90.0 L 46.0 89.0 L 28.0 87.0 L 14.0 82.0 L 9.0 77.0 L 9.0 75.0 L 15.0 68.0 L 24.0 65.0" />
          <path d="M 27.0 64.0 L 26.0 64.0" />
          <path d="M 104.0 52.0 L 104.0 51.0" />
          <path d="M 104.0 52.0 L 103.0 52.0" />
          <path d="M 101.0 59.0 L 104.0 59.0 L 107.0 57.0 L 118.0 54.0 L 126.0 50.0 L 130.0 46.0 L 133.0 40.0 L 133.0 31.0 L 127.0 24.0 L 119.0 22.0 L 109.0 26.0" />
          <path d="M 27.0 24.0 L 29.0 21.0 L 36.0 17.0 L 61.0 12.0 L 79.0 12.0 L 80.0 13.0 L 92.0 14.0 L 104.0 18.0 L 107.0 21.0 L 107.0 23.0" />
          <path d="M 27.0 24.0 L 28.0 25.0" />
          <path d="M 107.0 23.0 L 106.0 24.0" />
          <path d="M 109.0 26.0 L 108.0 27.0 L 109.0 32.0" />
          <path d="M 109.0 32.0 L 107.0 35.0 L 104.0 51.0" />
          <path d="M 104.0 51.0 L 103.0 52.0" />
        </g>
      </svg>
    </div>
  );
}

export function CroissantIllustration({
  className = "w-full h-auto",
  strokeWidth = 1.9,
  strokeColor = "#111111",
  startTrigger = "top 85%",
  endTrigger = "center 50%",
}: IllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useScrollDraw(svgRef, containerRef, startTrigger, endTrigger);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <svg ref={svgRef} viewBox="0 0 178 83" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible" role="img" aria-label="Croissant">
        <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 122.0 31.0 L 121.0 31.0" />
          <path d="M 93.0 53.0 L 90.0 61.0 L 90.0 66.0" />
          <path d="M 32.0 34.0 L 27.0 36.0 L 20.0 43.0 L 15.0 53.0" />
          <path d="M 32.0 34.0 L 33.0 34.0" />
          <path d="M 32.0 34.0 L 33.0 35.0" />
          <path d="M 67.0 13.0 L 66.0 12.0" />
          <path d="M 67.0 13.0 L 67.0 12.0" />
          <path d="M 67.0 13.0 L 68.0 12.0" />
          <path d="M 67.0 13.0 L 59.0 24.0 L 53.0 38.0 L 52.0 55.0 L 56.0 66.0" />
          <path d="M 154.0 45.0 L 153.0 44.0" />
          <path d="M 154.0 45.0 L 153.0 45.0" />
          <path d="M 154.0 45.0 L 160.0 51.0 L 161.0 56.0" />
          <path d="M 119.0 32.0 L 114.0 33.0 L 105.0 38.0 L 95.0 49.0" />
          <path d="M 142.0 34.0 L 141.0 33.0" />
          <path d="M 142.0 34.0 L 142.0 33.0" />
          <path d="M 142.0 34.0 L 150.0 40.0 L 153.0 44.0" />
          <path d="M 15.0 54.0 L 15.0 53.0" />
          <path d="M 15.0 54.0 L 14.0 54.0" />
          <path d="M 15.0 54.0 L 15.0 55.0" />
          <path d="M 90.0 66.0 L 90.0 67.0" />
          <path d="M 90.0 66.0 L 91.0 67.0" />
          <path d="M 113.0 68.0 L 113.0 67.0" />
          <path d="M 113.0 68.0 L 112.0 68.0" />
          <path d="M 113.0 68.0 L 114.0 68.0" />
          <path d="M 161.0 56.0 L 160.0 57.0" />
          <path d="M 161.0 56.0 L 161.0 57.0" />
          <path d="M 79.0 69.0 L 79.0 68.0" />
          <path d="M 79.0 69.0 L 80.0 69.0" />
          <path d="M 79.0 69.0 L 76.0 71.0 L 67.0 72.0 L 60.0 70.0 L 57.0 67.0" />
          <path d="M 18.0 62.0 L 15.0 55.0" />
          <path d="M 39.0 66.0 L 39.0 65.0" />
          <path d="M 39.0 66.0 L 40.0 66.0" />
          <path d="M 39.0 66.0 L 34.0 68.0 L 25.0 67.0 L 18.0 70.0 L 9.0 69.0 L 6.0 66.0 L 6.0 63.0 L 8.0 59.0 L 14.0 54.0" />
          <path d="M 33.0 35.0 L 33.0 34.0" />
          <path d="M 33.0 35.0 L 31.0 48.0 L 33.0 55.0 L 39.0 63.0 L 39.0 65.0" />
          <path d="M 56.0 67.0 L 56.0 66.0" />
          <path d="M 56.0 67.0 L 55.0 67.0" />
          <path d="M 56.0 67.0 L 57.0 67.0" />
          <path d="M 91.0 67.0 L 90.0 67.0" />
          <path d="M 91.0 67.0 L 99.0 69.0 L 112.0 68.0" />
          <path d="M 67.0 12.0 L 66.0 12.0" />
          <path d="M 67.0 12.0 L 68.0 12.0" />
          <path d="M 160.0 57.0 L 149.0 54.0 L 144.0 55.0 L 135.0 59.0 L 129.0 66.0" />
          <path d="M 160.0 57.0 L 161.0 57.0" />
          <path d="M 160.0 57.0 L 161.0 58.0" />
          <path d="M 125.0 17.0 L 125.0 16.0" />
          <path d="M 125.0 17.0 L 126.0 17.0" />
          <path d="M 125.0 17.0 L 110.0 20.0 L 100.0 25.0 L 87.0 37.0 L 79.0 54.0 L 78.0 58.0 L 79.0 68.0" />
          <path d="M 142.0 33.0 L 142.0 32.0" />
          <path d="M 142.0 33.0 L 141.0 33.0" />
          <path d="M 15.0 53.0 L 14.0 54.0" />
          <path d="M 79.0 68.0 L 80.0 69.0" />
          <path d="M 112.0 68.0 L 113.0 67.0" />
          <path d="M 153.0 45.0 L 153.0 44.0" />
          <path d="M 153.0 45.0 L 152.0 45.0" />
          <path d="M 113.0 67.0 L 116.0 59.0 L 127.0 49.0 L 141.0 44.0 L 152.0 45.0" />
          <path d="M 113.0 67.0 L 114.0 68.0" />
          <path d="M 161.0 58.0 L 161.0 57.0" />
          <path d="M 161.0 58.0 L 165.0 63.0 L 168.0 70.0 L 168.0 76.0 L 166.0 78.0 L 155.0 78.0 L 139.0 72.0 L 135.0 72.0 L 130.0 70.0 L 124.0 70.0 L 123.0 71.0 L 114.0 68.0" />
          <path d="M 39.0 65.0 L 40.0 66.0" />
          <path d="M 126.0 30.0 L 141.0 33.0" />
          <path d="M 14.0 54.0 L 15.0 55.0" />
          <path d="M 55.0 67.0 L 56.0 66.0" />
          <path d="M 55.0 67.0 L 49.0 68.0 L 40.0 66.0" />
          <path d="M 56.0 66.0 L 57.0 67.0" />
          <path d="M 33.0 34.0 L 49.0 19.0 L 58.0 14.0 L 66.0 12.0" />
          <path d="M 80.0 69.0 L 88.0 69.0 L 90.0 67.0" />
          <path d="M 125.0 16.0 L 107.0 6.0 L 100.0 4.0 L 88.0 4.0 L 68.0 12.0" />
          <path d="M 125.0 16.0 L 126.0 17.0" />
          <path d="M 142.0 32.0 L 140.0 26.0 L 133.0 19.0 L 126.0 17.0" />
          <path d="M 142.0 32.0 L 141.0 33.0" />
          <path d="M 152.0 45.0 L 153.0 44.0" />
        </g>
      </svg>
    </div>
  );
}

export function RollingPinIllustration({
  className = "w-full h-auto",
  strokeWidth = 1.9,
  strokeColor = "#111111",
  startTrigger = "top 85%",
  endTrigger = "center 50%",
}: IllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useScrollDraw(svgRef, containerRef, startTrigger, endTrigger);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <svg ref={svgRef} viewBox="0 0 187 82" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible" role="img" aria-label="RollingPin">
        <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 48.0 66.0 L 47.0 65.0" />
          <path d="M 48.0 66.0 L 48.0 65.0" />
          <path d="M 48.0 66.0 L 49.0 65.0" />
          <path d="M 48.0 66.0 L 52.0 70.0 L 60.0 70.0 L 61.0 69.0" />
          <path d="M 49.0 65.0 L 48.0 65.0" />
          <path d="M 49.0 65.0 L 52.0 65.0 L 54.0 63.0 L 54.0 58.0 L 50.0 54.0 L 45.0 55.0" />
          <path d="M 61.0 68.0 L 62.0 66.0 L 62.0 56.0 L 59.0 50.0 L 54.0 46.0" />
          <path d="M 61.0 68.0 L 61.0 69.0" />
          <path d="M 61.0 68.0 L 62.0 69.0" />
          <path d="M 47.0 65.0 L 48.0 65.0" />
          <path d="M 47.0 65.0 L 40.0 67.0 L 22.0 77.0 L 10.0 77.0 L 6.0 73.0 L 7.0 69.0 L 16.0 62.0 L 23.0 60.0 L 40.0 58.0 L 44.0 55.0" />
          <path d="M 54.0 45.0 L 54.0 44.0" />
          <path d="M 54.0 45.0 L 53.0 45.0" />
          <path d="M 54.0 45.0 L 54.0 46.0" />
          <path d="M 62.0 69.0 L 150.0 39.0 L 153.0 29.0" />
          <path d="M 62.0 69.0 L 61.0 69.0" />
          <path d="M 44.0 55.0 L 44.0 54.0" />
          <path d="M 44.0 55.0 L 45.0 55.0" />
          <path d="M 153.0 29.0 L 151.0 26.0 L 150.0 21.0" />
          <path d="M 153.0 29.0 L 161.0 26.0 L 168.0 26.0 L 177.0 24.0 L 184.0 19.0 L 185.0 14.0 L 183.0 11.0 L 177.0 9.0 L 170.0 11.0 L 159.0 18.0 L 150.0 21.0" />
          <path d="M 45.0 55.0 L 44.0 54.0" />
          <path d="M 54.0 44.0 L 57.0 42.0 L 140.0 15.0 L 143.0 15.0 L 150.0 21.0" />
          <path d="M 54.0 44.0 L 53.0 45.0" />
          <path d="M 44.0 54.0 L 44.0 51.0 L 46.0 47.0 L 49.0 45.0 L 53.0 45.0" />
          <path d="M 53.0 45.0 L 54.0 46.0" />
        </g>
      </svg>
    </div>
  );
}

export function WhiskIllustration({
  className = "w-full h-auto",
  strokeWidth = 1.9,
  strokeColor = "#111111",
  startTrigger = "top 85%",
  endTrigger = "center 50%",
}: IllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useScrollDraw(svgRef, containerRef, startTrigger, endTrigger);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <svg ref={svgRef} viewBox="0 0 142 97" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible" role="img" aria-label="Whisk">
        <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 58.0 50.0 L 55.0 48.0 L 29.0 39.0 L 19.0 34.0 L 7.0 24.0" />
          <path d="M 58.0 50.0 L 59.0 50.0" />
          <path d="M 58.0 50.0 L 58.0 51.0" />
          <path d="M 7.0 17.0 L 7.0 15.0 L 10.0 11.0 L 16.0 9.0" />
          <path d="M 7.0 17.0 L 7.0 18.0" />
          <path d="M 7.0 17.0 L 8.0 18.0" />
          <path d="M 74.0 49.0 L 64.0 39.0" />
          <path d="M 74.0 49.0 L 74.0 50.0" />
          <path d="M 74.0 49.0 L 75.0 50.0" />
          <path d="M 6.0 24.0 L 6.0 23.0" />
          <path d="M 6.0 24.0 L 7.0 24.0" />
          <path d="M 6.0 24.0 L 5.0 27.0 L 8.0 33.0 L 17.0 41.0 L 26.0 45.0 L 29.0 45.0 L 40.0 49.0 L 57.0 52.0" />
          <path d="M 65.0 49.0 L 64.0 49.0" />
          <path d="M 65.0 49.0 L 68.0 52.0" />
          <path d="M 65.0 49.0 L 64.0 50.0" />
          <path d="M 17.0 9.0 L 19.0 7.0 L 24.0 6.0 L 37.0 11.0 L 46.0 18.0 L 57.0 29.0 L 64.0 38.0" />
          <path d="M 17.0 9.0 L 16.0 9.0" />
          <path d="M 17.0 9.0 L 17.0 10.0" />
          <path d="M 81.0 51.0 L 80.0 50.0 L 75.0 50.0" />
          <path d="M 81.0 51.0 L 81.0 52.0" />
          <path d="M 81.0 51.0 L 82.0 52.0" />
          <path d="M 64.0 38.0 L 63.0 39.0" />
          <path d="M 64.0 38.0 L 64.0 39.0" />
          <path d="M 8.0 18.0 L 7.0 18.0" />
          <path d="M 8.0 18.0 L 36.0 34.0 L 57.0 44.0 L 64.0 49.0" />
          <path d="M 73.0 53.0 L 74.0 51.0" />
          <path d="M 73.0 53.0 L 72.0 53.0" />
          <path d="M 73.0 53.0 L 72.0 54.0" />
          <path d="M 63.0 52.0 L 64.0 51.0" />
          <path d="M 63.0 52.0 L 62.0 52.0" />
          <path d="M 63.0 52.0 L 64.0 52.0" />
          <path d="M 71.0 53.0 L 69.0 53.0" />
          <path d="M 71.0 53.0 L 72.0 53.0" />
          <path d="M 71.0 53.0 L 72.0 54.0" />
          <path d="M 72.0 54.0 L 72.0 53.0" />
          <path d="M 72.0 54.0 L 73.0 58.0 L 76.0 59.0" />
          <path d="M 64.0 50.0 L 64.0 49.0" />
          <path d="M 64.0 50.0 L 64.0 51.0" />
          <path d="M 58.0 52.0 L 58.0 51.0" />
          <path d="M 58.0 52.0 L 57.0 52.0" />
          <path d="M 58.0 52.0 L 59.0 53.0 L 62.0 52.0" />
          <path d="M 77.0 59.0 L 81.0 53.0" />
          <path d="M 77.0 59.0 L 76.0 59.0" />
          <path d="M 77.0 59.0 L 77.0 60.0" />
          <path d="M 6.0 23.0 L 7.0 18.0" />
          <path d="M 6.0 23.0 L 7.0 24.0" />
          <path d="M 74.0 51.0 L 74.0 50.0" />
          <path d="M 74.0 51.0 L 75.0 50.0" />
          <path d="M 75.0 50.0 L 74.0 50.0" />
          <path d="M 68.0 53.0 L 68.0 52.0" />
          <path d="M 68.0 53.0 L 67.0 53.0" />
          <path d="M 68.0 53.0 L 69.0 53.0" />
          <path d="M 81.0 53.0 L 81.0 52.0" />
          <path d="M 81.0 53.0 L 82.0 52.0" />
          <path d="M 63.0 39.0 L 58.0 37.0 L 34.0 18.0 L 17.0 10.0" />
          <path d="M 63.0 39.0 L 64.0 39.0" />
          <path d="M 82.0 52.0 L 81.0 52.0" />
          <path d="M 82.0 52.0 L 88.0 54.0 L 95.0 59.0 L 135.0 81.0 L 138.0 85.0 L 138.0 91.0 L 135.0 94.0 L 125.0 93.0 L 82.0 64.0 L 79.0 63.0 L 77.0 60.0" />
          <path d="M 62.0 52.0 L 59.0 50.0" />
          <path d="M 16.0 9.0 L 17.0 10.0" />
          <path d="M 64.0 52.0 L 64.0 51.0" />
          <path d="M 64.0 52.0 L 67.0 53.0" />
          <path d="M 58.0 51.0 L 59.0 50.0" />
          <path d="M 58.0 51.0 L 57.0 52.0" />
          <path d="M 76.0 59.0 L 77.0 60.0" />
          <path d="M 68.0 52.0 L 67.0 53.0" />
          <path d="M 68.0 52.0 L 69.0 53.0" />
        </g>
      </svg>
    </div>
  );
}
