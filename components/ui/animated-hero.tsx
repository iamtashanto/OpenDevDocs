"use client";

import * as React from "react";

/* ─── Floating Gradient Orbs ─────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div className="hero-orbs" aria-hidden="true">
      <div className="hero-orb hero-orb--blue" />
      <div className="hero-orb hero-orb--purple" />
      <div className="hero-orb hero-orb--cyan" />
      <div className="hero-orb hero-orb--rose" />
    </div>
  );
}

/* ─── Animated Grid with Fade Mask ───────────────────────────── */
function AnimatedGrid() {
  return (
    <div className="hero-animated-grid" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hero-grid-pattern"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.15"
            />
          </pattern>
          <radialGradient id="hero-grid-fade" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hero-grid-mask">
            <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#hero-grid-pattern)"
          mask="url(#hero-grid-mask)"
        />
      </svg>
    </div>
  );
}

/* ─── Animated Beam Lines ────────────────────────────────────── */
function BeamLines() {
  return (
    <div className="hero-beams" aria-hidden="true">
      <div className="hero-beam hero-beam--1" />
      <div className="hero-beam hero-beam--2" />
      <div className="hero-beam hero-beam--3" />
      <div className="hero-beam hero-beam--4" />
    </div>
  );
}

/* ─── Deterministic Sparkle Particles (SSR Safe) ─────────────── */
const staticSparkles = [
  { left: "12%", top: "18%", delay: "0.2s", duration: "3.5s" },
  { left: "24%", top: "45%", delay: "1.5s", duration: "4.2s" },
  { left: "38%", top: "22%", delay: "2.8s", duration: "3.1s" },
  { left: "48%", top: "60%", delay: "0.8s", duration: "4.8s" },
  { left: "62%", top: "15%", delay: "3.2s", duration: "3.9s" },
  { left: "75%", top: "35%", delay: "1.1s", duration: "4.5s" },
  { left: "88%", top: "52%", delay: "2.3s", duration: "3.2s" },
  { left: "18%", top: "78%", delay: "0.5s", duration: "5.0s" },
  { left: "32%", top: "85%", delay: "2.0s", duration: "4.1s" },
  { left: "82%", top: "80%", delay: "3.7s", duration: "3.6s" },
  { left: "68%", top: "72%", delay: "1.9s", duration: "4.4s" },
  { left: "92%", top: "25%", delay: "0.4s", duration: "3.8s" },
];

function SparkleParticles() {
  return (
    <div className="hero-sparkles" aria-hidden="true">
      {staticSparkles.map((sparkle, i) => (
        <div
          key={i}
          className="hero-sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Center Glow Effect ─────────────────────────────────────── */
function CenterGlow() {
  return (
    <div className="hero-center-glow" aria-hidden="true">
      <div className="hero-center-glow__inner" />
    </div>
  );
}

/* ─── Next.js Style Laser Light Beams ────────────────────────── */
function LaserBeams() {
  return (
    <div className="hero-laser-layer" aria-hidden="true">
      <div className="hero-laser-line hero-laser-line--left" />
      <div className="hero-laser-line hero-laser-line--right" />
    </div>
  );
}

/* ─── Main Exported Component ────────────────────────────────── */
export function AnimatedHeroBackground() {
  return (
    <div className="hero-visual-layer">
      <AnimatedGrid />
      <FloatingOrbs />
      <BeamLines />
      <LaserBeams />
      <SparkleParticles />
      <CenterGlow />
    </div>
  );
}
