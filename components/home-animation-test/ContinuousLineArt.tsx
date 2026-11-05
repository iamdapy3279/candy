"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContinuousLineArt() {
  const containerRef = useRef<HTMLDivElement>(null);

  // References for Desktop Zones
  const desktopZone1Ref = useRef<HTMLDivElement>(null);
  const desktopZone2Ref = useRef<HTMLDivElement>(null);
  const desktopZone3Ref = useRef<HTMLDivElement>(null);

  // References for Mobile Zones
  const mobileZone1Ref = useRef<HTMLDivElement>(null);
  const mobileZone2Ref = useRef<HTMLDivElement>(null);
  const mobileZone3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Helper: Initialize all paths in an element with stroke-dasharray and dashoffset
    const initPaths = (container: HTMLElement | null) => {
      if (!container) return [];
      const paths = Array.from(container.querySelectorAll<SVGPathElement>("path, circle"));
      paths.forEach((p) => {
        if ("getTotalLength" in p) {
          const len = p.getTotalLength();
          p.style.strokeDasharray = `${len} ${len}`;
          p.style.strokeDashoffset = prefersReducedMotion ? "0" : `${len}`;
        }
      });
      return paths;
    };

    if (prefersReducedMotion) {
      // Just reveal all strokes statically for reduced motion users
      initPaths(containerRef.current);
      return;
    }

    const ctx = gsap.context(() => {
      // ==============================================================
      // 1. DESKTOP ZONE 1: Hero -> Philosophy (Flowing line -> Coffee Cup)
      // ==============================================================
      if (desktopZone1Ref.current) {
        const paths = initPaths(desktopZone1Ref.current);
        const flowLine = desktopZone1Ref.current.querySelector(".z1-flow");
        const steams = desktopZone1Ref.current.querySelectorAll(".z1-steam");
        const cupParts = desktopZone1Ref.current.querySelectorAll(".z1-cup");

        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: desktopZone1Ref.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        });

        if (flowLine) {
          tl1.to(flowLine, { strokeDashoffset: 0, duration: 1.2, ease: "none" });
        }
        if (steams.length > 0) {
          tl1.to(steams, { strokeDashoffset: 0, duration: 0.9, stagger: 0.15, ease: "none" }, "-=0.3");
        }
        if (cupParts.length > 0) {
          tl1.to(cupParts, { strokeDashoffset: 0, duration: 1.5, stagger: 0.1, ease: "none" }, "-=0.2");
        }
      }

      // ==============================================================
      // 2. DESKTOP ZONE 2: Philosophy -> Locations (Connector -> Croissant)
      // ==============================================================
      if (desktopZone2Ref.current) {
        initPaths(desktopZone2Ref.current);
        const loopLine = desktopZone2Ref.current.querySelector(".z2-loop");
        const silhouette = desktopZone2Ref.current.querySelector(".z2-silhouette");
        const folds = desktopZone2Ref.current.querySelectorAll(".z2-fold");
        const exitLine = desktopZone2Ref.current.querySelector(".z2-exit");

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: desktopZone2Ref.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 0.8,
          },
        });

        if (loopLine) {
          tl2.to(loopLine, { strokeDashoffset: 0, duration: 1.2, ease: "none" });
        }
        if (silhouette) {
          tl2.to(silhouette, { strokeDashoffset: 0, duration: 1.2, ease: "none" }, "-=0.2");
        }
        if (folds.length > 0) {
          tl2.to(folds, { strokeDashoffset: 0, duration: 1.0, stagger: 0.12, ease: "none" });
        }
        if (exitLine) {
          tl2.to(exitLine, { strokeDashoffset: 0, duration: 0.8, ease: "none" }, "-=0.1");
        }
      }

      // ==============================================================
      // 3. DESKTOP ZONE 3: Locations -> Lower Flourish (Whisk & Flourish)
      // ==============================================================
      if (desktopZone3Ref.current) {
        initPaths(desktopZone3Ref.current);
        const whiskPaths = desktopZone3Ref.current.querySelectorAll(".z3-whisk");
        const flourish = desktopZone3Ref.current.querySelector(".z3-flourish");

        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: desktopZone3Ref.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 0.8,
          },
        });

        if (flourish) {
          tl3.to(flourish, { strokeDashoffset: 0, duration: 0.8, ease: "none" });
        }
        if (whiskPaths.length > 0) {
          tl3.to(whiskPaths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.15, ease: "none" }, "-=0.2");
        }
      }

      // ==============================================================
      // 4. MOBILE ZONE 1: Hero -> Philosophy (Vertical Flow -> Coffee Cup)
      // ==============================================================
      if (mobileZone1Ref.current) {
        initPaths(mobileZone1Ref.current);
        const mFlow = mobileZone1Ref.current.querySelector(".m1-flow");
        const mSteams = mobileZone1Ref.current.querySelectorAll(".m1-steam");
        const mCup = mobileZone1Ref.current.querySelectorAll(".m1-cup");

        const mtl1 = gsap.timeline({
          scrollTrigger: {
            trigger: mobileZone1Ref.current,
            start: "top 85%",
            end: "bottom 35%",
            scrub: 0.8,
          },
        });

        if (mFlow) {
          mtl1.to(mFlow, { strokeDashoffset: 0, duration: 1.0, ease: "none" });
        }
        if (mSteams.length > 0) {
          mtl1.to(mSteams, { strokeDashoffset: 0, duration: 0.8, stagger: 0.15, ease: "none" }, "-=0.2");
        }
        if (mCup.length > 0) {
          mtl1.to(mCup, { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: "none" }, "-=0.2");
        }
      }

      // ==============================================================
      // 5. MOBILE ZONE 2: Philosophy -> Locations (Vertical -> Croissant)
      // ==============================================================
      if (mobileZone2Ref.current) {
        initPaths(mobileZone2Ref.current);
        const mLine = mobileZone2Ref.current.querySelector(".m2-line");
        const mSilhouette = mobileZone2Ref.current.querySelector(".m2-silhouette");
        const mFolds = mobileZone2Ref.current.querySelectorAll(".m2-fold");

        const mtl2 = gsap.timeline({
          scrollTrigger: {
            trigger: mobileZone2Ref.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        });

        if (mLine) {
          mtl2.to(mLine, { strokeDashoffset: 0, duration: 1.0, ease: "none" });
        }
        if (mSilhouette) {
          mtl2.to(mSilhouette, { strokeDashoffset: 0, duration: 1.0, ease: "none" }, "-=0.2");
        }
        if (mFolds.length > 0) {
          mtl2.to(mFolds, { strokeDashoffset: 0, duration: 0.9, stagger: 0.1, ease: "none" });
        }
      }

      // ==============================================================
      // 6. MOBILE ZONE 3: Locations -> Lower flourish
      // ==============================================================
      if (mobileZone3Ref.current) {
        initPaths(mobileZone3Ref.current);
        const mLowerPaths = mobileZone3Ref.current.querySelectorAll(".m3-flourish");

        gsap.to(mLowerPaths, {
          strokeDashoffset: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: mobileZone3Ref.current,
            start: "top 85%",
            end: "bottom 40%",
            scrub: 0.8,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-20 w-full overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ============================================================== */}
      {/* DESKTOP COMPOSITION (hidden lg:block)                          */}
      {/* ============================================================== */}
      <div className="hidden lg:block w-full h-full relative">
        {/* DESKTOP ZONE 1: Hero to Philosophy transition */}
        {/* Placed at bottom of 100vh hero, entering top of Philosophy */}
        <div
          ref={desktopZone1Ref}
          className="absolute top-[88vh] left-0 w-full h-[650px] overflow-visible"
        >
          <div className="max-w-7xl mx-auto px-8 relative h-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1200 650"
              fill="none"
              stroke="#35251D"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Flowing line entering beneath hero from upper right margin, curving gracefully toward center */}
              <path
                className="z1-flow"
                d="M 1150 40 C 980 40 850 140 740 140 C 650 140 600 80 520 80 C 440 80 380 180 290 180 C 230 180 180 130 140 130 C 90 130 70 170 80 220 C 90 270 170 260 210 220 C 240 190 250 120 310 100 C 370 80 420 120 460 120 C 510 120 540 60 620 40 C 700 20 740 70 780 70"
                opacity="0.88"
              />

              {/* Connecting line that leads directly into the Coffee Cup's steam */}
              <path
                className="z1-flow"
                d="M 780 70 C 820 70 860 30 890 35 C 920 40 940 75 970 85"
                opacity="0.88"
              />

              {/* COFFEE CUP ILLUSTRATION (01-coffee-cup.svg) placed in the upper-right whitespace */}
              <g transform="translate(850, 110) scale(1.15)">
                {/* Steam trails connected to the flowing spirit */}
                <path
                  id="steam-a"
                  className="z1-steam"
                  d="M91 65 C76 48 101 39 91 20 C87 12 82 8 79 5"
                />
                <path
                  id="steam-b"
                  className="z1-steam"
                  d="M128 61 C114 44 139 34 128 15 C124 8 120 5 117 2"
                />
                <path
                  id="steam-c"
                  className="z1-steam"
                  d="M164 65 C150 50 175 41 165 24"
                />
                {/* Cup Body, Rim, Coffee, Handle, Base */}
                <path
                  id="rim"
                  className="z1-cup"
                  d="M54 82 C80 69 177 69 204 82 C178 96 80 96 54 82Z"
                />
                <path
                  id="coffee"
                  className="z1-cup"
                  d="M76 84 C103 91 156 91 183 84"
                />
                <path
                  id="body"
                  className="z1-cup"
                  d="M58 84 C61 111 67 153 79 170 C89 184 110 190 129 190 C148 190 169 184 179 170 C191 153 197 111 200 84"
                />
                <path
                  id="base"
                  className="z1-cup"
                  d="M89 190 C108 198 151 198 169 190"
                />
                <path
                  id="handle"
                  className="z1-cup"
                  d="M199 103 C226 96 242 109 239 132 C236 153 220 165 185 157"
                />
              </g>

              {/* Flourish exiting the coffee cup handle, flowing down toward Zone 2 */}
              <path
                className="z1-flow"
                d="M 1080 270 C 1110 320 1140 400 1120 480 C 1100 550 1020 600 950 630"
                opacity="0.85"
              />
            </svg>
          </div>
        </div>

        {/* DESKTOP ZONE 2: Philosophy to Locations transition (Croissant) */}
        {/* Positioned in the natural whitespace between Philosophy and Locations */}
        <div
          ref={desktopZone2Ref}
          className="absolute top-[1650px] left-0 w-full h-[600px] overflow-visible"
        >
          <div className="max-w-7xl mx-auto px-8 relative h-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1200 600"
              fill="none"
              stroke="#35251D"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Connector weaving down around the photo and leading into Croissant */}
              <path
                className="z2-loop"
                d="M 950 10 C 880 40 760 30 680 70 C 580 120 540 180 460 200 C 380 220 280 180 200 230 C 130 270 110 340 140 400 C 170 460 240 470 300 450"
                opacity="0.85"
              />

              {/* CROISSANT ILLUSTRATION (02-croissant.svg) nestled in open whitespace */}
              <g transform="translate(320, 270) scale(1.05)">
                {/* Silhouette */}
                <path
                  id="silhouette"
                  className="z2-silhouette"
                  d="M22 145 C36 111 57 77 88 55 C111 39 134 41 151 65 C163 40 188 17 218 15 C254 12 280 43 294 75 C308 108 326 132 342 150 C312 142 288 143 265 159 C241 176 220 192 195 188 C174 185 160 169 151 151 C135 176 111 187 88 177 C62 166 42 151 22 145Z"
                />
                {/* 6 Laminated folds */}
                <path
                  id="fold-1"
                  className="z2-fold"
                  d="M88 55 C88 89 109 126 151 151"
                />
                <path
                  id="fold-2"
                  className="z2-fold"
                  d="M126 47 C120 84 135 123 166 162"
                />
                <path
                  id="fold-3"
                  className="z2-fold"
                  d="M163 65 C163 99 175 143 195 188"
                />
                <path
                  id="fold-4"
                  className="z2-fold"
                  d="M218 15 C196 57 201 111 228 166"
                />
                <path
                  id="fold-5"
                  className="z2-fold"
                  d="M264 43 C244 79 252 119 282 151"
                />
                <path
                  id="fold-6"
                  className="z2-fold"
                  d="M294 75 C281 103 295 129 320 145"
                />
              </g>

              {/* Exit flourish sweeping towards Locations header */}
              <path
                className="z2-exit"
                d="M 680 430 C 740 440 820 420 880 450 C 940 480 970 530 1020 560"
                opacity="0.85"
              />
            </svg>
          </div>
        </div>

        {/* DESKTOP ZONE 3: Locations to Lower Section flourish (Whisk in side margin) */}
        {/* Placed in the comfortable outer margin near Food & Drinks / Evolution */}
        <div
          ref={desktopZone3Ref}
          className="absolute top-[2800px] left-0 w-full h-[500px] overflow-visible"
        >
          <div className="max-w-7xl mx-auto px-8 relative h-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1200 500"
              fill="none"
              stroke="#35251D"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className="z3-flourish"
                d="M 980 40 C 1040 80 1100 130 1080 190 C 1060 250 990 270 960 320"
                opacity="0.85"
              />

              {/* WHISK ILLUSTRATION (04-whisk.svg) positioned delicately in side margin */}
              <g transform="translate(930, 260) scale(0.9) rotate(-15)">
                <path
                  className="z3-whisk"
                  d="M81 113 C80 151 80 187 80 222 C80 232 88 236 95 230 C100 226 98 217 98 208 L97 113"
                />
                <path
                  className="z3-whisk"
                  d="M81 115 C37 91 26 52 43 25 C57 2 79 14 89 39 C103 12 126 3 141 27 C158 54 142 92 97 115"
                />
                <path
                  className="z3-whisk"
                  d="M89 115 C59 81 58 43 77 19 C85 9 91 20 89 39"
                />
                <path
                  className="z3-whisk"
                  d="M97 115 C126 81 128 43 109 19 C101 9 95 20 97 39"
                />
                <path
                  className="z3-whisk"
                  d="M81 115 C70 75 75 44 89 39 C103 44 108 75 97 115"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE COMPOSITION (block lg:hidden)                           */}
      {/* ============================================================== */}
      <div className="block lg:hidden w-full h-full relative">
        {/* MOBILE ZONE 1: Hero to Philosophy transition */}
        <div
          ref={mobileZone1Ref}
          className="absolute top-[96vh] left-0 w-full h-[380px] overflow-visible"
        >
          <div className="px-4 relative h-full flex justify-end">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 390 380"
              fill="none"
              stroke="#35251D"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Flowing vertical line in outer margin */}
              <path
                className="m1-flow"
                d="M 340 10 C 310 40 260 50 240 80 C 220 110 230 140 210 160"
                opacity="0.85"
              />

              {/* COFFEE CUP ILLUSTRATION (01-coffee-cup.svg) scaled down for mobile */}
              <g transform="translate(140, 140) scale(0.72)">
                <path
                  className="m1-steam"
                  d="M91 65 C76 48 101 39 91 20 C87 12 82 8 79 5"
                />
                <path
                  className="m1-steam"
                  d="M128 61 C114 44 139 34 128 15 C124 8 120 5 117 2"
                />
                <path
                  className="m1-steam"
                  d="M164 65 C150 50 175 41 165 24"
                />
                <path
                  className="m1-cup"
                  d="M54 82 C80 69 177 69 204 82 C178 96 80 96 54 82Z"
                />
                <path
                  className="m1-cup"
                  d="M76 84 C103 91 156 91 183 84"
                />
                <path
                  className="m1-cup"
                  d="M58 84 C61 111 67 153 79 170 C89 184 110 190 129 190 C148 190 169 184 179 170 C191 153 197 111 200 84"
                />
                <path
                  className="m1-cup"
                  d="M89 190 C108 198 151 198 169 190"
                />
                <path
                  className="m1-cup"
                  d="M199 103 C226 96 242 109 239 132 C236 153 220 165 185 157"
                />
              </g>

              {/* Flowing downward connector from mobile coffee cup */}
              <path
                className="m1-flow"
                d="M 285 240 C 310 270 330 310 320 360"
                opacity="0.85"
              />
            </svg>
          </div>
        </div>

        {/* MOBILE ZONE 2: Philosophy to Locations section gap (Croissant) */}
        <div
          ref={mobileZone2Ref}
          className="absolute top-[2150px] left-0 w-full h-[360px] overflow-visible"
        >
          <div className="px-4 relative h-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 390 360"
              fill="none"
              stroke="#35251D"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Vertical connector line in clear margin */}
              <path
                className="m2-line"
                d="M 320 10 C 310 40 260 70 210 80 C 170 90 130 110 110 140"
                opacity="0.85"
              />

              {/* CROISSANT ILLUSTRATION (02-croissant.svg) centered in section gap */}
              <g transform="translate(60, 120) scale(0.68)">
                <path
                  id="silhouette"
                  className="m2-silhouette"
                  d="M22 145 C36 111 57 77 88 55 C111 39 134 41 151 65 C163 40 188 17 218 15 C254 12 280 43 294 75 C308 108 326 132 342 150 C312 142 288 143 265 159 C241 176 220 192 195 188 C174 185 160 169 151 151 C135 176 111 187 88 177 C62 166 42 151 22 145Z"
                />
                <path
                  className="m2-fold"
                  d="M88 55 C88 89 109 126 151 151"
                />
                <path
                  className="m2-fold"
                  d="M126 47 C120 84 135 123 166 162"
                />
                <path
                  className="m2-fold"
                  d="M163 65 C163 99 175 143 195 188"
                />
                <path
                  className="m2-fold"
                  d="M218 15 C196 57 201 111 228 166"
                />
                <path
                  className="m2-fold"
                  d="M264 43 C244 79 252 119 282 151"
                />
                <path
                  className="m2-fold"
                  d="M294 75 C281 103 295 129 320 145"
                />
              </g>

              {/* Gentle continuation flourish */}
              <path
                className="m2-line"
                d="M 280 230 C 310 260 330 300 340 350"
                opacity="0.85"
              />
            </svg>
          </div>
        </div>

        {/* MOBILE ZONE 3: Delicate Flourish before lower sections */}
        <div
          ref={mobileZone3Ref}
          className="absolute top-[3400px] left-0 w-full h-[220px] overflow-visible"
        >
          <div className="px-4 relative h-full flex justify-end">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 390 220"
              fill="none"
              stroke="#35251D"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className="m3-flourish"
                d="M 330 10 C 340 50 310 90 280 110 C 250 130 220 150 230 180"
                opacity="0.75"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
