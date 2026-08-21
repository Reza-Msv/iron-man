"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lightning,
  Sparkle,
  Target,
  Fire,
  Gauge,
  Radioactive,
} from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import { TextReveal } from "@/components/ui/AnimatedText";

type SuitData = {
  id: string;
  name: string;
  codename: string;
  film: string;
  year: string;
  primaryColor: string;
  accentGlow: string;
  arcColor: string;
  quote: string;
  description: string;
  specs: {
    power: number; // 0-100
    armor: number;
    speed: number;
    tech: number;
  };
  features: string[];
  weapons: string[];
  hudCode: string;
  visualSvg: {
    helmetStyle: string;
    shoulderGlow: string;
    chestReactorShape: "circle" | "triangle" | "hexagon" | "starburst";
  };
};

const SUITS: SuitData[] = [
  {
    id: "mark-3",
    name: "MARK III",
    codename: "Classic Red & Gold",
    film: "Iron Man (2008)",
    year: "2008",
    primaryColor: "#D4A22F",
    accentGlow: "rgba(212, 162, 47, 0.5)",
    arcColor: "#00F0FF",
    quote: "Sometimes you gotta run before you can walk.",
    description:
      "The definitive Iron Man armor built with a 97.5% gold and 2.5% titanium alloy to fix the atmospheric icing issue encountered at high altitude flight.",
    specs: { power: 85, armor: 88, speed: 82, tech: 80 },
    features: [
      "Gold-Titanium heat shielding alloy",
      "Integrated Shoulder Repulsor Micro-Flares",
      "Hydraulic Knee & Hip Joint Stabilizers",
      "Jarvis Tactical Flight HUD",
    ],
    weapons: ["Dual Palm Repulsors", "Chest Unibeam", "Smart Micro-Missiles"],
    hudCode: "SYS.MK3 // ALLOY 97.5% AU-TI",
    visualSvg: {
      helmetStyle: "#D4A22F",
      shoulderGlow: "rgba(212,162,47,0.3)",
      chestReactorShape: "circle",
    },
  },
  {
    id: "mark-42",
    name: "MARK XLII",
    codename: "Prototypical Autonomous",
    film: "Iron Man 3 (2013)",
    year: "2013",
    primaryColor: "#F59E0B",
    accentGlow: "rgba(245, 158, 11, 0.5)",
    arcColor: "#38BDF8",
    quote: "I'm Tony Stark. I build neat stuff, got a great girl, and saved the world.",
    description:
      "Pre-deployed autonomous propulsion suit equipped with sub-dermal micro-transmitters allowing each armor piece to attach to Tony individually across any distance.",
    specs: { power: 90, armor: 84, speed: 92, tech: 93 },
    features: [
      "Sub-dermal micro-transmitter neural tracking",
      "Independent individual thruster flight modules",
      "Autonomous remote pilot control via JARVIS / HUD",
      "Shockwave kinetic repulsor dispersion",
    ],
    weapons: [
      "Remote Assembly Thrusters",
      "Repulsor Flash Canons",
      "Unibeam Focus",
    ],
    hudCode: "SYS.MK42 // AUTONOMOUS LINK",
    visualSvg: {
      helmetStyle: "#F59E0B",
      shoulderGlow: "rgba(245,158,11,0.3)",
      chestReactorShape: "circle",
    },
  },
  {
    id: "mark-50",
    name: "MARK L",
    codename: "Nanotech Matrix",
    film: "Avengers: Infinity War (2018)",
    year: "2018",
    primaryColor: "#EC4899",
    accentGlow: "rgba(236, 72, 153, 0.5)",
    arcColor: "#06B6D4",
    quote: "Dude, you're embarrassing me in front of the wizards.",
    description:
      "Revolutionary nanotech suit housed directly within a streamlined chest arc reactor unit, capable of instant weapon formation, shields, and thruster wings.",
    specs: { power: 96, armor: 94, speed: 97, tech: 98 },
    features: [
      "Sub-micron liquid gold-titanium nanoparticle storage",
      "Morphing energy shields & plasma wings",
      "Zero-g vacuum self-healing structural integrity",
      "Friday AI integrated combat neural predictor",
    ],
    weapons: [
      "Nanotech Energy Blade",
      "Battering Ram Cannons",
      "Hyper Unibeam Array",
    ],
    hudCode: "SYS.MK50 // LIQUID NANO-MATRIX",
    visualSvg: {
      helmetStyle: "#EC4899",
      shoulderGlow: "rgba(236,72,153,0.3)",
      chestReactorShape: "hexagon",
    },
  },
  {
    id: "mark-85",
    name: "MARK LXXXV",
    codename: "Nanotech Prime",
    film: "Avengers: Endgame (2019)",
    year: "2019",
    primaryColor: "#D4A22F",
    accentGlow: "rgba(212, 162, 47, 0.6)",
    arcColor: "#38BDF8",
    quote: "And I... am... Iron Man.",
    description:
      "The pinnacle of Stark engineering combining classic Mark III aesthetics with Mark L nanotech flexibility and Vibranium infinity gauntlet integration.",
    specs: { power: 100, armor: 98, speed: 99, tech: 100 },
    features: [
      "Vibranium-infused Nanoparticle Gauntlet Link",
      "Lightning Refractor Back Deflector Shields",
      "Sub-atomic Infinity Energy Dispersal Channels",
      "Full spectrum HUD & Friday Neural Core",
    ],
    weapons: [
      "Lightning Refractor Shield",
      "Nano-Claw Energy Blades",
      "Infinity Gauntlet Snap Conduit",
    ],
    hudCode: "SYS.MK85 // INFINITY PRIME CORE",
    visualSvg: {
      helmetStyle: "#D4A22F",
      shoulderGlow: "rgba(212,162,47,0.4)",
      chestReactorShape: "triangle",
    },
  },
];

export function SuitArmory() {
  const [activeSuitId, setActiveSuitId] = useState<string>("mark-85");
  const activeSuit = SUITS.find((s) => s.id === activeSuitId) || SUITS[3];

  return (
    <section
      id="armory"
      className="relative overflow-hidden border-t border-white/5 bg-background py-24 md:py-32"
    >
      {/* Dynamic Ambient Background Glow based on active suit */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[140px] transition-all duration-700"
        style={{ backgroundColor: activeSuit.primaryColor }}
      />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <EyebrowBadge>STARK ARMORY // PROTOCOL 004</EyebrowBadge>
          <h2 className="mt-4 font-sans text-4xl font-semibold tracking-tighter text-foreground md:text-6xl">
            <TextReveal text="Iron Man Suit Selector & Armory" as="span" />
          </h2>
          <p className="mt-3 max-w-[54ch] font-sans text-sm text-zinc-400 md:text-base">
            Select any Iron Man suit below to calibrate telemetry specs, inspect arc reactor configurations, and trigger live suit switching animations.
          </p>
        </div>

        {/* 1. SUIT SWITCHER BUTTONS - MUST BE IN ONE SINGLE ROW */}
        <div className="mt-10 flex w-full justify-center">
          <div className="flex flex-row flex-nowrap items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-xl scrollbar-none max-w-full md:gap-3 md:p-2">
            {SUITS.map((suit) => {
              const isActive = suit.id === activeSuitId;
              return (
                <button
                  key={suit.id}
                  onClick={() => setActiveSuitId(suit.id)}
                  className={`group relative flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 md:px-6 md:py-3 md:text-xs ${
                    isActive
                      ? "text-black"
                      : "text-zinc-400 hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSuitPill"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: suit.primaryColor }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full transition-colors ${
                        isActive ? "bg-black animate-ping" : "bg-zinc-500 group-hover:bg-accent"
                      }`}
                    />
                    {suit.name}
                  </span>
                  <span
                    className={`relative z-10 hidden font-mono text-[9px] opacity-70 md:inline-block ${
                      isActive ? "text-black" : "text-zinc-500"
                    }`}
                  >
                    ({suit.year})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. MAIN SHOWCASE DISPLAY (CHARACTER VISUAL & SPECS HUD) */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16 items-center">
          
          {/* LEFT: CHARACTER VISUAL DISPLAY WITH ANIMATION */}
          <div className="relative flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl md:p-12 min-h-[460px]">
            {/* HUD Frame Corners */}
            <div className="pointer-events-none absolute left-5 top-5 text-accent/60">
              <HudFrame corner="tl" size={24} />
            </div>
            <div className="pointer-events-none absolute right-5 top-5 text-accent/60">
              <HudFrame corner="tr" size={24} />
            </div>
            <div className="pointer-events-none absolute bottom-5 left-5 text-accent/60">
              <HudFrame corner="bl" size={24} />
            </div>
            <div className="pointer-events-none absolute bottom-5 right-5 text-accent/60">
              <HudFrame corner="br" size={24} />
            </div>

            {/* HUD Top Readout */}
            <div className="absolute top-6 flex w-full items-center justify-between px-10 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              <span>{activeSuit.hudCode}</span>
              <span className="flex items-center gap-2 text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                ONLINE
              </span>
            </div>

            {/* ANIMATED IRON MAN CHARACTER SUIT GRAPHIC */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSuit.id}
                initial={{ opacity: 0, scale: 0.85, rotateY: -15, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, rotateY: 15, filter: "blur(10px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative my-8 flex items-center justify-center"
              >
                {/* Repulsor Energy Ring Background */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute h-80 w-80 rounded-full border border-dashed border-white/15 md:h-96 md:w-96"
                  style={{ borderColor: activeSuit.accentGlow }}
                />

                {/* Animated Concentric Pulse */}
                <motion.div
                  animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute h-64 w-64 rounded-full blur-2xl md:h-80 md:w-80"
                  style={{ backgroundColor: activeSuit.accentGlow }}
                />

                {/* IRON MAN CHARACTER SUIT SVG / HUD RENDER */}
                <div className="relative z-10 flex flex-col items-center">
                  <svg
                    width="280"
                    height="360"
                    viewBox="0 0 280 360"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  >
                    {/* Suit Body Silhouette */}
                    {/* Shoulders */}
                    <path
                      d="M60 140 L140 100 L220 140 L240 210 L200 320 L140 340 L80 320 L40 210 Z"
                      fill="#121214"
                      stroke={activeSuit.primaryColor}
                      strokeWidth="2.5"
                    />

                    {/* Shoulder Armor Plates */}
                    <path
                      d="M40 140 C60 120 90 110 140 110 C190 110 220 120 240 140 L230 180 L190 160 L140 165 L90 160 L50 180 Z"
                      fill={activeSuit.visualSvg.shoulderGlow}
                      stroke={activeSuit.primaryColor}
                      strokeWidth="1.5"
                    />

                    {/* Helmet / Mask Contour */}
                    <path
                      d="M100 50 C100 30 115 15 140 15 C165 15 180 30 180 50 L185 85 L165 110 L140 115 L115 110 L95 85 Z"
                      fill="#1A1A1E"
                      stroke={activeSuit.primaryColor}
                      strokeWidth="2"
                    />

                    {/* Face Plate (Gold Mask Accent) */}
                    <path
                      d="M110 45 L170 45 L175 75 L160 95 L140 100 L120 95 L105 75 Z"
                      fill={activeSuit.primaryColor}
                      opacity="0.85"
                    />

                    {/* Glowing Eyes */}
                    <motion.polygon
                      points="118,58 134,58 131,64 120,64"
                      fill={activeSuit.arcColor}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.polygon
                      points="146,58 162,58 159,64 148,64"
                      fill={activeSuit.arcColor}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />

                    {/* CHEST ARC REACTOR CORE */}
                    <g transform="translate(140, 185)">
                      {/* Outer Reactor Ring */}
                      <circle
                        r="32"
                        fill="#0A0A0C"
                        stroke={activeSuit.primaryColor}
                        strokeWidth="3"
                      />

                      {/* Inner Reactor Glow */}
                      <motion.circle
                        r="22"
                        fill={activeSuit.arcColor}
                        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="filter drop-shadow-[0_0_15px_rgba(0,240,255,0.9)]"
                      />

                      {/* Core Shape based on Suit */}
                      {activeSuit.visualSvg.chestReactorShape === "triangle" ? (
                        <polygon points="0,-14 12,10 -12,10" fill="#FFFFFF" />
                      ) : activeSuit.visualSvg.chestReactorShape === "hexagon" ? (
                        <polygon
                          points="0,-12 10,-6 10,6 0,12 -10,6 -10,-6"
                          fill="#FFFFFF"
                        />
                      ) : (
                        <circle r="10" fill="#FFFFFF" />
                      )}
                    </g>

                    {/* Repulsor Lines */}
                    <line
                      x1="60"
                      y1="220"
                      x2="95"
                      y2="200"
                      stroke={activeSuit.primaryColor}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="220"
                      y1="220"
                      x2="185"
                      y2="200"
                      stroke={activeSuit.primaryColor}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  </svg>

                  {/* Suit Name Banner under character visual */}
                  <div className="mt-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                    <span>{activeSuit.name}</span>
                    <span>&bull;</span>
                    <span className="text-zinc-400">{activeSuit.codename}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* HUD Bottom Info */}
            <div className="absolute bottom-5 flex w-full items-center justify-between px-10 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
              <span>TARGET LOCK // LOCKED</span>
              <span>CALIBRATION 100%</span>
            </div>
          </div>

          {/* RIGHT: SUIT DETAILS & SPECS HUD */}
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSuit.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-6"
              >
                {/* Suit Title & Film Tag */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                      {activeSuit.year} DEPLOYMENT
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="font-mono text-xs text-zinc-400">
                      {activeSuit.film}
                    </span>
                  </div>
                  <h3 className="font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    {activeSuit.name}
                  </h3>
                  <p className="font-mono text-sm font-medium text-accent">
                    &ldquo;{activeSuit.quote}&rdquo;
                  </p>
                </div>

                <p className="font-sans text-sm leading-relaxed text-zinc-300 md:text-base">
                  {activeSuit.description}
                </p>

                {/* Animated Spec Bars */}
                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  {[
                    { label: "Power Output", val: activeSuit.specs.power, icon: Radioactive },
                    { label: "Armor Grade", val: activeSuit.specs.armor, icon: ShieldCheck },
                    { label: "Flight Speed", val: activeSuit.specs.speed, icon: Gauge },
                    { label: "Nanotech Density", val: activeSuit.specs.tech, icon: Sparkle },
                  ].map((st) => {
                    const Icon = st.icon;
                    return (
                      <div key={st.label} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                          <span className="flex items-center gap-1.5 text-zinc-400">
                            <Icon size={14} className="text-accent" />
                            {st.label}
                          </span>
                          <span className="font-semibold text-foreground">{st.val}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${st.val}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: activeSuit.primaryColor }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Features & Weapons */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                      SYSTEM FEATURES
                    </span>
                    <ul className="flex flex-col gap-2 font-sans text-xs text-zinc-300">
                      {activeSuit.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-accent" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                      PRIMARY WEAPONS
                    </span>
                    <ul className="flex flex-col gap-2 font-sans text-xs text-zinc-300">
                      {activeSuit.weapons.map((w, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Fire size={12} className="text-accent" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
