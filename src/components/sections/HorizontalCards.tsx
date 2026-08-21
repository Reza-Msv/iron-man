"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CaretLeft,
  CaretRight,
  Lightning,
  ShieldCheck,
  Cpu,
  FlyingSaucer,
  Atom,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import { TextReveal } from "@/components/ui/AnimatedText";

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
    gradient: "from-cyan-500/20 via-sky-500/5 to-transparent",
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
    gradient: "from-amber-500/20 via-yellow-500/5 to-transparent",
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
    gradient: "from-red-500/20 via-rose-500/5 to-transparent",
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
    gradient: "from-purple-500/20 via-fuchsia-500/5 to-transparent",
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
    gradient: "from-emerald-500/20 via-teal-500/5 to-transparent",
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
    gradient: "from-amber-500/25 via-yellow-500/10 to-transparent",
  },
];

export function HorizontalCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="lore"
      className="relative overflow-hidden border-t border-white/5 bg-background py-24 md:py-32"
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <EyebrowBadge>STARK DATABASE // ARCHIVE &amp; LORE</EyebrowBadge>
            <h2 className="font-sans text-4xl font-semibold tracking-tighter text-foreground md:text-6xl">
              <TextReveal text="Iron Man Tech & Innovation Showcase" as="span" />
            </h2>
            <p className="max-w-[50ch] font-sans text-sm text-zinc-400 md:text-base">
              Swipe or use navigation controls to explore Stark Industries landmark armor breakthroughs, arc energy innovations, and battlefield containment protocols.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground backdrop-blur-md transition-all hover:border-accent hover:bg-accent/10 active:scale-95"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground backdrop-blur-md transition-all hover:border-accent hover:bg-accent/10 active:scale-95"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </div>
        </div>

        {/* Horizontal Cards Container */}
        <div
          ref={scrollRef}
          className="mt-12 flex snap-x snap-mandatory overflow-x-auto pb-8 pt-4 scrollbar-none gap-6 md:gap-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedCard(card)}
                className="group relative flex w-[320px] shrink-0 cursor-pointer snap-start flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] md:w-[380px]"
              >
                {/* Gradient background glow on hover */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b ${card.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* HUD frame accents */}
                <div className="pointer-events-none absolute right-4 top-4 text-white/20 transition-colors group-hover:text-accent">
                  <HudFrame corner="tr" size={16} />
                </div>
                <div className="pointer-events-none absolute bottom-4 left-4 text-white/20 transition-colors group-hover:text-accent">
                  <HudFrame corner="bl" size={16} />
                </div>

                {/* Card Top */}
                <div className="relative z-10 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                      {card.code}
                    </span>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: card.accentColor }}
                    >
                      <Icon size={22} weight="duotone" />
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400">
                      {card.category}
                    </span>
                    <h3 className="mt-1 font-sans text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                      {card.title}
                    </h3>
                    <p className="font-mono text-[11px] text-zinc-400">
                      {card.subtitle}
                    </p>
                  </div>

                  <p className="line-clamp-3 font-sans text-xs leading-relaxed text-zinc-300">
                    {card.description}
                  </p>
                </div>

                {/* Card Bottom Stats Preview */}
                <div className="relative z-10 mt-8 border-t border-white/10 pt-5">
                  <div className="grid grid-cols-2 gap-4">
                    {card.stats.slice(0, 2).map((s) => (
                      <div key={s.label} className="flex flex-col gap-0.5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                          {s.label}
                        </span>
                        <span className="font-mono text-sm font-semibold text-foreground">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                    <span>Inspect Specs &rarr;</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-zinc-950 p-6 md:p-8"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-foreground"
              >
                <X size={18} weight="bold" />
              </button>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {selectedCard.code}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                  {selectedCard.category}
                </span>
              </div>

              <h3 className="mt-2 font-sans text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {selectedCard.title}
              </h3>
              <p className="font-mono text-xs text-zinc-400">
                {selectedCard.subtitle}
              </p>

              <p className="mt-4 font-sans text-sm leading-relaxed text-zinc-300 md:text-base">
                {selectedCard.description}
              </p>

              {/* Stats Bar Grid */}
              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                {selectedCard.stats.map((st) => (
                  <div key={st.label} className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                      {st.label}
                    </span>
                    <span
                      className="font-mono text-base font-semibold md:text-lg"
                      style={{ color: selectedCard.accentColor }}
                    >
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Details breakdown */}
              <div className="mt-6">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                  TECHNICAL BREAKDOWN
                </h4>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {selectedCard.details.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 font-sans text-xs text-zinc-300 md:text-sm"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="rounded-full border border-accent/40 bg-accent/10 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent transition-colors hover:bg-accent hover:text-black"
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
