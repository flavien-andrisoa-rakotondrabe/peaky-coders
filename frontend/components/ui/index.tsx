"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// ───────────────────────────────
// Section Wrapper
// ───────────────────────────────
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

// ───────────────────────────────
// Container
// ───────────────────────────────
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 ${className}`}
    >
      {children}
    </div>
  );
}

// ───────────────────────────────
// Section Eyebrow (SOFT RED/GREEN ACCENT)
// ───────────────────────────────
export function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="font-mono text-[11px] text-red-400 font-semibold tracking-widest uppercase">
        {num}
      </span>

      <span className="w-5 h-px bg-green-400/40" />

      <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

// ───────────────────────────────
// Fade In
// ───────────────────────────────
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

// ───────────────────────────────
// Stagger
// ───────────────────────────────
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

// ───────────────────────────────
// Item
// ───────────────────────────────
export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ───────────────────────────────
// Gradient Text (REMOVED → replaced with accent text only)
// ───────────────────────────────
export function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`text-red-400 font-semibold ${className}`}>
      {children}
    </span>
  );
}

// ───────────────────────────────
// Arrow Icon
// ───────────────────────────────
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

// ───────────────────────────────
// Button (CLEAN RED/GREEN SYSTEM)
// ───────────────────────────────
const BTN_VARIANTS = {
  primary:
    "bg-green-500 text-white hover:bg-green-600 active:scale-[0.98] shadow-sm",
  danger:
    "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] shadow-sm",
  ghost: "bg-transparent text-foreground border border-border hover:bg-muted",
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
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-[14px] transition-all duration-200";

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

// ───────────────────────────────
// Live Dot (SOFT SYSTEM COLORS)
// ───────────────────────────────
const DOT_COLORS = {
  green: { ring: "bg-green-500/20", dot: "bg-green-500" },
  red: { ring: "bg-red-500/20", dot: "bg-red-500" },
  gray: { ring: "bg-gray-500/20", dot: "bg-gray-500" },
};

export function LiveDot({
  color = "green",
}: {
  color?: keyof typeof DOT_COLORS;
}) {
  const { ring, dot } = DOT_COLORS[color];

  return (
    <span className="relative inline-flex items-center justify-center w-3 h-3">
      <span
        className={`absolute w-full h-full rounded-full ${ring} animate-ping opacity-70`}
      />
      <span className={`relative w-2 h-2 rounded-full ${dot}`} />
    </span>
  );
}
