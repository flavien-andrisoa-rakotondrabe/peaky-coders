"use client";
// ============================================================
// components/sections/Features.tsx
// Grille 3×2 de fonctionnalités avec icônes
// ============================================================

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constant";
import {
  SectionWrapper,
  Container,
  SectionEyebrow,
  FadeIn,
  StaggerChildren,
  staggerItem,
} from "../ui";

// Icon registry
const ICONS: Record<string, React.ReactNode> = {
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-[18px] h-[18px]">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3v18"/>
    </svg>
  ),
  form: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <path d="M3 9h18M8 4v5"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-[18px] h-[18px]">
      <path d="M4 20V10M10 20V4M16 20V14M22 20H2"/>
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/>
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z"/>
      <circle cx="12" cy="9" r="2.6"/>
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M4 7h16M4 12h16M4 17h10"/>
    </svg>
  ),
};

export default function Features() {
  return (
    <SectionWrapper id="feat" className="bg-surface">
      <Container>
        <FadeIn className="mb-14">
          <SectionEyebrow num="04" label="Fonctionnalités" />
          <h2 className="font-display text-[clamp(34px,4vw,52px)] leading-[1.06] tracking-[-0.022em] text-wrap-balance">
            Pensé pour les{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">citoyens</span>,
            <br />
            <span className="italic text-ink-3">outillé pour les collectivités.</span>
          </h2>
        </FadeIn>

        {/* Features grid */}
        <StaggerChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-line rounded-3xl overflow-hidden divide-y divide-line sm:divide-y-0"
          staggerDelay={0.07}
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              variants={staggerItem}
              whileHover={{ backgroundColor: "#fdf9f4", transition: { duration: 0.15 } }}
              className={`relative bg-surface p-8 flex flex-col gap-3 min-h-[200px] group cursor-default
                ${i % 3 !== 2 ? "lg:border-r lg:border-line" : ""}
                ${i < 3 ? "lg:border-b lg:border-line" : ""}
                ${i % 2 === 0 ? "sm:border-r sm:border-line lg:border-r-0" : ""}
                ${i < 4 ? "sm:border-b sm:border-line" : ""}
              `}
            >
              {/* Icon */}
              <div className="w-9 h-9 rounded-xl bg-bg-2 grid place-items-center text-ink transition-all duration-300 group-hover:bg-orange-1/15 group-hover:text-orange-1">
                {ICONS[feat.icon]}
              </div>

              {/* Title */}
              <h4 className="font-heading font-bold text-[17px] tracking-[-0.01em] leading-tight">
                {feat.title}
              </h4>

              {/* Description */}
              <p className="text-sm text-ink-2 leading-relaxed flex-1">
                {feat.description}
              </p>

              {/* Gradient line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-main scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  );
}