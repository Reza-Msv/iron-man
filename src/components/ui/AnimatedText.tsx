"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

// 1. Staggered Word / Character Text Reveal
type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
};

export function TextReveal({
  text,
  className = "",
  delay = 0,
  as = "span",
}: TextRevealProps) {
  const words = text.split(" ");
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={`inline-flex flex-wrap gap-[0.28em] ${className}`}
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </Component>
  );
}

// 2. Stark Arc Reactor Shimmer / Metallic Glowing Text
type GlowingTextProps = {
  children: ReactNode;
  className?: string;
  glowColor?: string;
};

export function GlowingText({
  children,
  className = "",
  glowColor = "rgba(212, 162, 47, 0.4)",
}: GlowingTextProps) {
  return (
    <span
      className={`relative inline-block transition-all duration-300 ${className}`}
      style={{
        textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
      }}
    >
      {children}
    </span>
  );
}

// 3. Cybernetic Scramble Text Effect
type ScrambleTextProps = {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
};

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789//--_#$&*";

export function ScrambleText({
  text,
  className = "",
  scrambleOnHover = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  const triggerScramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    triggerScramble();
  }, [text]);

  return (
    <span
      className={`font-mono transition-colors ${className}`}
      onMouseEnter={scrambleOnHover ? triggerScramble : undefined}
    >
      {displayText}
    </span>
  );
}
