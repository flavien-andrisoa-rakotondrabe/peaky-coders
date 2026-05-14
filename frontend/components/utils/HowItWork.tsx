"use client";
// ============================================================
// components/sections/HowItWorks.tsx
// 3 étapes illustrées avec icônes SVG et gradient numbers
// ============================================================

import { motion } from "framer-motion";
import { STEPS } from "@/lib/constant";
import {
  SectionWrapper,
  Container,
  SectionEyebrow,
  FadeIn,
  StaggerChildren,
  staggerItem,
  GradientText,
} from "../ui";

// SVG icons by step type
const ICONS: Record<string, React.ReactNode> = {
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22s8-8 8-13a8 8 0 0 0-16 0c0 5 8 13 8 13z"/>
      <circle cx="12" cy="9" r="2.6"/>
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-6 h-6">
      <path d="M3 17l6-6 4 4 8-8"/>
      <path d="M14 7h7v7"/>
    </svg>
  ),
};

export default function HowItWorks() {
  return (
    <SectionWrapper id="how" className="bg-bg">
      <Container>
        <FadeIn className="mb-14">
          <SectionEyebrow num="02" label="Fonctionnement" />
          <h2 className="font-display text-[clamp(34px,4vw,52px)] leading-[1.06] tracking-[-0.022em] text-wrap-balance">
            Trois gestes simples,
            <br />
            <span className="italic text-ink-3">de la rue au tableau de bord.</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              variants={staggerItem}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="relative bg-surface border border-line rounded-3xl p-7 overflow-hidden group cursor-default"
            >
              {/* Giant number background */}
              <span className="absolute right-4 top-2 font-display text-[88px] leading-none text-bg-2 select-none pointer-events-none transition-all duration-500 group-hover:text-orange-3/10">
                {step.num}
              </span>

              {/* Icon */}
              <div className="relative w-12 h-12 rounded-2xl bg-bg-2 grid place-items-center text-ink mb-5 transition-all duration-300 group-hover:bg-orange-1/10 group-hover:text-orange-1">
                {ICONS[step.icon]}
              </div>

              {/* Step label */}
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-3 mb-2">
                Étape {step.num}
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-[22px] leading-tight tracking-[-0.01em] mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[14.5px] text-ink-2 leading-relaxed">
                {step.description}
              </p>

              {/* Bottom gradient accent on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-main opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  );
}