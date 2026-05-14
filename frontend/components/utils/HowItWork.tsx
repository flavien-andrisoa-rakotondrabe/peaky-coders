"use client";

import { motion } from "framer-motion";
import { STEPS } from "@/lib/constant";
import { SectionWrapper, Container, SectionEyebrow, FadeIn } from "../ui";

const ICONS: Record<string, React.ReactNode> = {
  pin: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-6 h-6"
    >
      <path d="M12 22s8-8 8-13a8 8 0 0 0-16 0c0 5 8 13 8 13z" />
      <circle cx="12" cy="9" r="2.6" />
    </svg>
  ),
  globe: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-6 h-6"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  chart: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-6 h-6"
    >
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  ),
};

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -80 : 80,
    scale: 0.96,
  }),
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HowItWorks() {
  return (
    <SectionWrapper id="how" className="bg-background">
      <Container>
        <FadeIn className="mb-14">
          <SectionEyebrow num="02" label="Fonctionnement" />

          <h2 className="text-5xl md:text-6xl font-bold leading-tight text-foreground">
            Trois gestes simples,
            <br />
            <span className="text-muted-foreground italic">
              de la rue au tableau de bord.
            </span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.25 },
              }}
              className="
                relative
                bg-white/60
                backdrop-blur-xl
                border border-black/5
                rounded-3xl
                p-7
                overflow-hidden
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              {/* BIG NUMBER */}
              <span className="absolute right-4 top-2 text-[80px] font-bold text-black/5 select-none">
                {step.num}
              </span>

              {/* ICON */}
              <div className="w-12 h-12 rounded-2xl grid place-items-center bg-white/70 border border-black/5 text-red-500 mb-5">
                {ICONS[step.icon]}
              </div>

              {/* LABEL */}
              <div className="text-xs uppercase tracking-widest text-black/40 font-mono mb-2">
                Étape {step.num}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* ACCENT BAR */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
