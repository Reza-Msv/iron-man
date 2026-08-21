"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrambleText } from "@/components/ui/AnimatedText";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled || mobileMenuOpen
          ? "border-b border-white/10 bg-black/80 backdrop-blur-2xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-foreground transition-all hover:text-accent"
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(212,162,47,0.9)] animate-pulse"
          />
          <ScrambleText text="STARK / INDUSTRIES" scrambleOnHover={true} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#lore"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-accent"
          >
            Database
          </a>
          <a
            href="#armory"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-accent"
          >
            Armory
          </a>
          <a
            href="#systems"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-accent"
          >
            Systems
          </a>
          <a
            href="#footer"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-accent"
          >
            Archive
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#armory"
            className="group hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-foreground backdrop-blur-md transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent sm:inline-flex"
          >
            Select Suit
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground md:hidden"
          >
            {mobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-white/10 bg-black/95 px-6 py-6 backdrop-blur-3xl md:hidden"
          >
            <nav className="flex flex-col gap-4 font-mono text-xs uppercase tracking-[0.25em]">
              <a
                href="#lore"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-300 hover:text-accent"
              >
                Database
              </a>
              <a
                href="#armory"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-300 hover:text-accent"
              >
                Armory
              </a>
              <a
                href="#systems"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-300 hover:text-accent"
              >
                Systems
              </a>
              <a
                href="#footer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-300 hover:text-accent"
              >
                Archive
              </a>

              <a
                href="#armory"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-3 text-accent"
              >
                Select Suit &rarr;
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
