// components/ui/index.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// ─── SectionWrapper ───────────────────────────────────────────
export function SectionWrapper({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

// ─── Container ────────────────────────────────────────────────
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

// ─── SectionEyebrow ───────────────────────────────────────────
export function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="font-mono text-[11px] text-orange-1 font-semibold tracking-widest uppercase">
        {num}
      </span>
      <span className="w-5 h-px bg-orange-1/40" />
      <span className="font-mono text-[11px] text-ink-3 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

// ─── FadeIn ───────────────────────────────────────────────────
export function FadeIn({
  className = "",
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerChildren ──────────────────────────────────────────
const staggerContainer = (staggerDelay = 0.08) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});

export function StaggerChildren({
  className = "",
  children,
  staggerDelay = 0.08,
}: {
  className?: string;
  children: React.ReactNode;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer(staggerDelay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// ─── staggerItem (variants object, not a component) ───────────
export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── GradientText ─────────────────────────────────────────────
export function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`bg-gradient-text bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

// ─── ArrowIcon ────────────────────────────────────────────────
export function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

// ─── Btn ──────────────────────────────────────────────────────
const BTN_VARIANTS = {
  primary:
    "bg-gradient-main text-white shadow-btn hover:opacity-90 active:scale-[0.98]",
  ghost:
    "bg-transparent text-ink border border-line hover:bg-bg-2 hover:border-ink-3/30",
  outline:
    "bg-surface text-ink border border-line hover:border-orange-1 hover:text-orange-1",
};

export function Btn({
  variant = "primary",
  href,
  onClick,
  children,
  className = "",
}: {
  variant?: keyof typeof BTN_VARIANTS;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-[14px] tracking-[-0.01em] transition-all duration-200 cursor-pointer";
  const styles = `${base} ${BTN_VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
// ─── LiveDot ──────────────────────────────────────────────────
const DOT_COLORS = {
  green:  { ring: "bg-green-500/20",  dot: "bg-green-500"  },
  orange: { ring: "bg-orange-500/20", dot: "bg-orange-500" },
  red:    { ring: "bg-red-500/20",    dot: "bg-red-500"    },
  blue:   { ring: "bg-blue-500/20",   dot: "bg-blue-500"   },
};

export function LiveDot({
  color = "green",
}: {
  color?: keyof typeof DOT_COLORS;
}) {
  const { ring, dot } = DOT_COLORS[color];

  return (
    <span className={`relative inline-flex items-center justify-center w-3 h-3`}>
      <span className={`absolute w-full h-full rounded-full ${ring} animate-ping opacity-75`} />
      <span className={`relative w-2 h-2 rounded-full ${dot}`} />
    </span>
  );
}