"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Lightning,
  ShieldCheck,
  Cpu,
  FlyingSaucer,
  Atom,
  Sparkle,
  X,
  CornersOut,
} from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import { TextReveal, GlowingText } from "@/components/ui/AnimatedText";

type CardData = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  details: string[];
  stats: { label: string; value: string }[];
  icon: typeof Lightning;
  accentColor: string;
  gradient: string;
};

const CARDS: CardData[] = [
  {
    id: "card-1",
    code: "TECH // 001",
    title: "Arc Reactor V2",
    subtitle: "New Element Cold Fusion Core",
    category: "POWER SOURCE",
    description:
      "Synthesized in a particle accelerator, replacing palladium with a non-toxic new element capable of delivering 3.4 GJ/s continuous energy output.",
    details: [
      "Zero harmful radiation output",
      "Vibranium-stabilized magnetic bottle",
      "Powers suit flight & repulsor array indefinitely",
      "Triangular core geometry with quantum containment",
    ],
    stats: [
      { label: "Energy Output", value: "3.4 GJ/s" },
      { label: "Core Temp", value: "1,420 K" },
      { label: "Efficiency", value: "99.98%" },
    ],
    icon: Atom,
    accentColor: "#00F0FF",
    gradient: "from-cyan-500/25 via-sky-500/10 to-transparent",
  },
  {
    id: "card-2",
    code: "ARMAMENT // 002",
    title: "Repulsor Beams",
    subtitle: "Phase-Guided Plasma Thrusters",
    category: "FLIGHT & WEAPONRY",
    description:
      "Dual palm-mounted particle accelerators providing flight stabilization, thrust maneuvering, and high-density focused energy blasts.",
    details: [
      "Sub-millisecond discharge cycle",
      "Adaptive beam focus from non-lethal pulse to hull-piercing laser",
      "Integrated smart target acquisition via J.A.R.V.I.S.",
      "Integrated Unibeam chest focus multiplier",
    ],
    stats: [
      { label: "Max Force", value: "12,000 N" },
      { label: "Discharge Speed", value: "Mach 8.5" },
      { label: "Targeting", value: "Neural HUD" },
    ],
    icon: Lightning,
    accentColor: "#D4A22F",
    gradient: "from-amber-500/25 via-yellow-500/10 to-transparent",
  },
  {
    id: "card-3",
    code: "HEAVY // 003",
    title: "Mark XLIV Hulkbuster",
    subtitle: "Orbital Drop Heavy Containment",
    category: "TACTICAL CONTAINMENT",
    description:
      "Co-engineered with Dr. Bruce Banner. Deployed from the Veronica satellite station to form a massive exoskeleton capable of subduing extreme threats.",
    details: [
      "Orbital deployment module with automated field assembly",
      "Independent jackhammer repulsor arms & cage restrainders",
      "Multiple replacement limbs automatically delivered in combat",
      "Dual arc reactors for extreme load distribution",
    ],
    stats: [
      { label: "Weight", value: "78.5 Tons" },
      { label: "Armor Grade", value: "Titanium-Gold Class IV" },
      { label: "Reactor Count", value: "11 Cores" },
    ],
    icon: ShieldCheck,
    accentColor: "#EF4444",
    gradient: "from-red-500/25 via-rose-500/10 to-transparent",
  },
  {
    id: "card-4",
    code: "NANO // 004",
    title: "Liquid Nanotech Matrix",
    subtitle: "Sub-Micron Self-Healing Armor",
    category: "ADVANCED MATERIALS",
    description:
      "Sub-micron gold-titanium nanoparticle housing stored inside Tony Stark's chest housing, morphing instantly into tools, weapons, and shields.",
    details: [
      "Instant weapon morphing (Energy blades, shields, cannons)",
      "Automated self-healing nanoparticle reconstruction",
      "Atmospheric sealing for outer space EVA maneuvers",
      "Zero deployment latency under active physical stress",
    ],
    stats: [
      { label: "Deploy Time", value: "0.4 Seconds" },
      { label: "Nanoparticle Count", value: "4.8 Trillion" },
      { label: "Tensile Strength", value: "420 GPa" },
    ],
    icon: Sparkle,
    accentColor: "#A855F7",
    gradient: "from-purple-500/25 via-fuchsia-500/10 to-transparent",
  },
  {
    id: "card-5",
    code: "AI // 005",
    title: "F.R.I.D.A.Y. Neural AI",
    subtitle: "Tactical Battlefield Assistant",
    category: "INTELLIGENCE MATRIX",
    description:
      "Next-generation user assistant interface replacing J.A.R.V.I.S., analyzing enemy combat patterns and auto-optimizing power distribution.",
    details: [
      "Predictive combat trajectory calculation",
      "Structural weakness vulnerability scanning",
      "Direct satellite uplink & Stark global satellite network",
      "Automated emergency life support override protocol",
    ],
    stats: [
      { label: "Compute Power", value: "88.4 ExaFLOPS" },
      { label: "Latency", value: "0.002 ms" },
      { label: "Security Level", value: "Class Ω" },
    ],
    icon: Cpu,
    accentColor: "#10B981",
    gradient: "from-emerald-500/25 via-teal-500/10 to-transparent",
  },
  {
    id: "card-6",
    code: "ENDGAME // 006",
    title: "Vibranium Gauntlet",
    subtitle: "Cosmic Energy Channeling Conduit",
    category: "CELESTIAL HARNESS",
    description:
      "Nanotech infinity gauntlet integrated into the Mark LXXXV armor, engineered to siphon and stabilize cosmic energy across all six stones.",
    details: [
      "Vibranium energy redirection channel",
      "Selective stone snap lock mechanism",
      "Emergency suit override to protect pilot vital organs",
      "Cosmic radiation dispersal heat sinks",
    ],
    stats: [
      { label: "Energy Capacity", value: "Infinite" },
      { label: "Core Material", value: "Vibranium Nano-Lattice" },
      { label: "Status", value: "Legendary" },
    ],
    icon: FlyingSaucer,
    accentColor: "#F59E0B",
    gradient: "from-amber-500/30 via-yellow-500/15 to-transparent",
  },
  {
    id: "card-7",
    code: "DEFENSE // 007",
    title: "Energy Matrix Shield",
    subtitle: "Deployable Hex-Refractor Barrier",
    category: "DEFENSIVE SHIELDING",
    description:
      "Solid-light repulsor matrix shield deployed from forearm housing, absorbing kinetic impacts and dispersing energy across sub-atomic dampeners.",
    details: [
      "Hexagonal solid-light energy lattice",
      "Deflects high-velocity kinetic projectiles",
      "Instantaneous emergency deployment",
      "Zero weight impact on suit maneuverability",
    ],
    stats: [
      { label: "Deflect Rating", value: "99.8%" },
      { label: "Deploy Speed", value: "0.01 s" },
      { label: "Power Draw", value: "Adaptive" },
    ],
    icon: ShieldCheck,
    accentColor: "#3B82F6",
    gradient: "from-blue-500/25 via-sky-500/10 to-transparent",
  },
  {
    id: "card-8",
    code: "ORDNANCE // 008",
    title: "Smart Micro-Missiles",
    subtitle: "Shoulder-Mounted Kinetic Ordnance",
    category: "TACTICAL STRIKE",
    description:
      "High-density armor-piercing micro-missiles housing laser guidance and smart IFF friend-or-foe targeting modules.",
    details: [
      "Shoulder pop-up launch pod array",
      "Self-guided kinetic warheads",
      "Integrated target tracking via J.A.R.V.I.S.",
      "Multi-target simultaneous tracking",
    ],
    stats: [
      { label: "Payload", value: "12 Warheads" },
      { label: "Range", value: "3.5 km" },
      { label: "Target Lock", value: "Multi-Target" },
    ],
    icon: Lightning,
    accentColor: "#E11D48",
    gradient: "from-rose-500/25 via-red-500/10 to-transparent",
  },
  {
    id: "card-9",
    code: "NEURAL // 009",
    title: "J.A.R.V.I.S. Core",
    subtitle: "Just A Rather Very Intelligent System",
    category: "PRIMARY AI MATRIX",
    description:
      "Tony Stark's original artificial intelligence assistant, managing suit telemetry, environmental hazards, flight controls, and home security.",
    details: [
      "Natural language voice conversation",
      "Automated threat response & diagnostic link",
      "Orbital satellite real-time sync",
      "Neural link direct pilot brainwave interface",
    ],
    stats: [
      { label: "Neural Speed", value: "Sub-ms" },
      { label: "Core Memory", value: "Unlimited" },
      { label: "Status", value: "Legendary" },
    ],
    icon: Cpu,
    accentColor: "#6366F1",
    gradient: "from-indigo-500/25 via-purple-500/10 to-transparent",
  },
];

export function HorizontalCards() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [scrollDistance, setScrollDistance] = useState<number>(0);

  // Smooth scroll tracking across section height
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate exact scroll distance using DOM offset position of the last card
  useEffect(() => {
    const updateDistance = () => {
      if (trackRef.current && containerRef.current) {
        const trackEl = trackRef.current;
        const containerEl = containerRef.current;
        const lastChild = trackEl.lastElementChild as HTMLElement;
        if (lastChild) {
          // Precise pixel distance needed to align last card right edge + 64px right margin
          const totalWidth = lastChild.offsetLeft + lastChild.offsetWidth + 64;
          const maxScroll = Math.max(0, totalWidth - containerEl.offsetWidth);
          setScrollDistance(maxScroll);
        }
      }
    };

    updateDistance();
    const timer = setTimeout(updateDistance, 150);
    window.addEventListener("resize", updateDistance);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateDistance);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <section
      ref={targetRef}
      id="lore"
      className="relative h-[220vh] bg-background border-t border-white/5"
    >
      {/* Sticky Full-Viewport Container */}
      <div className="sticky top-0 flex h-[100dvh] w-full flex-col justify-between overflow-hidden py-3 sm:py-6 md:py-8">
        
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 -z-10 h-[650px] w-[650px] rounded-full bg-accent/10 blur-[150px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-[550px] w-[550px] rounded-full bg-amber-500/10 blur-[130px]" />

        {/* Top Header - RIGHT SIDE ALIGNED, RESPONSIVE YELLOW TEXT */}
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="flex flex-col items-end text-right">
            <EyebrowBadge>STARK DATABASE // ARCHIVE &amp; LORE</EyebrowBadge>
            <h2 className="mt-1 font-sans text-2xl font-bold leading-[0.95] tracking-tighter text-accent sm:text-5xl md:text-6xl lg:text-7xl">
              <GlowingText glowColor="rgba(212, 162, 47, 0.6)">
                <TextReveal
                  text="Iron Man Tech & Innovation Showcase"
                  as="span"
                  delay={0.1}
                />
              </GlowingText>
            </h2>
          </div>
        </div>

        {/* Middle: CARDS Track with Dynamic Height Fitting for Mobile Viewports */}
        <div
          ref={containerRef}
          className="my-auto w-full overflow-hidden py-3 sm:py-6 md:py-10"
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-4 px-4 pr-12 sm:gap-6 sm:px-6 sm:pr-16 md:gap-10 md:px-12 md:pr-24 items-stretch py-2 sm:py-4"
          >
            {CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedCard(card)}
                  className="group relative flex h-[48dvh] min-h-[380px] max-h-[580px] w-[280px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-3 hover:border-accent/60 hover:shadow-[0_25px_60px_rgba(212,162,47,0.2)] sm:w-[380px] sm:p-7 md:w-[460px] md:p-9 lg:w-[500px]"
                >
                  {/* Background Radial Gradient */}
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b ${card.gradient} opacity-20 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  {/* High-Tech HUD Corners */}
                  <div className="pointer-events-none absolute right-4 top-4 text-white/20 transition-colors group-hover:text-accent sm:right-6 sm:top-6">
                    <HudFrame corner="tr" size={20} />
                  </div>
                  <div className="pointer-events-none absolute bottom-4 left-4 text-white/20 transition-colors group-hover:text-accent sm:bottom-6 sm:left-6">
                    <HudFrame corner="bl" size={20} />
                  </div>

                  {/* Card Header Content */}
                  <div className="relative z-10 flex flex-col gap-3 sm:gap-4 md:gap-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent sm:text-xs">
                        {card.code}
                      </span>
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 md:h-16 md:w-16"
                        style={{ color: card.accentColor }}
                      >
                        <Icon size={26} className="sm:text-[30px] md:text-[34px]" weight="duotone" />
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 sm:text-xs">
                        {card.category}
                      </span>
                      <h3 className="mt-0.5 font-sans text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl md:text-4xl">
                        {card.title}
                      </h3>
                      <p className="font-mono text-[11px] text-zinc-400 sm:text-xs">
                        {card.subtitle}
                      </p>
                    </div>

                    <p className="line-clamp-2 font-sans text-xs leading-relaxed text-zinc-300 sm:line-clamp-3 md:line-clamp-4 md:text-sm">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Bottom Specs & Expand Action */}
                  <div className="relative z-10 border-t border-white/10 pt-3 sm:pt-4 md:pt-6">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {card.stats.map((s) => (
                        <div key={s.label} className="flex flex-col gap-0.5">
                          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-500 sm:text-[9px]">
                            {s.label}
                          </span>
                          <span className="font-mono text-xs font-bold text-foreground sm:text-sm md:text-base">
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-accent sm:mt-5 sm:text-xs">
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        Inspect Blueprint
                        <CornersOut size={14} weight="bold" />
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Scroll Progress Bar */}
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="mb-1.5 h-px bg-white/10">
            <motion.div
              className="h-full origin-left bg-accent"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 sm:text-[10px]">
            <span>ARCHIVE // 001 - 009</span>
            <span>HORIZONTAL SCROLL</span>
            <span>Scroll &darr;</span>
          </div>
        </div>

      </div>

      {/* Expanded Blueprint Card Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-zinc-950 p-6 md:p-10"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-foreground"
              >
                <X size={20} weight="bold" />
              </button>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  {selectedCard.code}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                  {selectedCard.category}
                </span>
              </div>

              <h3 className="mt-3 font-sans text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                {selectedCard.title}
              </h3>
              <p className="font-mono text-sm text-zinc-400">
                {selectedCard.subtitle}
              </p>

              <p className="mt-4 font-sans text-base leading-relaxed text-zinc-300 md:text-lg">
                {selectedCard.description}
              </p>

              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                {selectedCard.stats.map((st) => (
                  <div key={st.label} className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      {st.label}
                    </span>
                    <span
                      className="font-mono text-lg font-bold md:text-xl"
                      style={{ color: selectedCard.accentColor }}
                    >
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technical Details */}
              <div className="mt-8">
                <h4 className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-400">
                  TECHNICAL BREAKDOWN
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {selectedCard.details.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 font-sans text-sm text-zinc-300 md:text-base"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="rounded-full border border-accent/40 bg-accent/10 px-8 py-3 font-mono text-xs uppercase tracking-[0.22em] text-accent transition-colors hover:bg-accent hover:text-black"
                >
                  Close Diagnostic
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
