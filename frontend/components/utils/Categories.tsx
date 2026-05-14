"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/constant";
import {
  SectionWrapper,
  Container,
  SectionEyebrow,
  FadeIn,
  StaggerChildren,
  staggerItem,
  Btn,
} from "../ui";

const COLOR_STYLES: Record<
  string,
  { dot: string; glow: string; border: string }
> = {
  news: {
    dot: "bg-blue-500",
    glow: "from-blue-500/20",
    border: "hover:border-blue-300",
  },
  infra: {
    dot: "bg-amber-500",
    glow: "from-amber-500/20",
    border: "hover:border-amber-300",
  },
  urg: {
    dot: "bg-red-500",
    glow: "from-red-500/20",
    border: "hover:border-red-300",
  },
  waste: {
    dot: "bg-violet-500",
    glow: "from-violet-500/20",
    border: "hover:border-violet-300",
  },
};

export default function Categories() {
  return (
    <SectionWrapper id="cats" className="relative bg-background">

      {/* soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-green-500/5 pointer-events-none" />

      <Container>

        {/* HEADER */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">

          <div className="max-w-[620px]">
            <SectionEyebrow num="01" label="Catégories" />

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Une lecture simple de la{" "}
              <span className="text-blue-500">ville</span>
            </h2>

            <p className="mt-4 text-muted-foreground text-lg">
              Chaque signalement est classé automatiquement pour rendre la ville
              plus lisible, rapide et intelligente.
            </p>
          </div>

          <Btn variant="ghost" href="#">
            Guide →
          </Btn>
        </FadeIn>

        {/* GRID */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {CATEGORIES.map((cat) => {
            const style = COLOR_STYLES[cat.color];

            return (
              <motion.div
                key={cat.id}
                variants={staggerItem}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`relative group rounded-3xl border bg-white/70 backdrop-blur-xl p-6 overflow-hidden cursor-pointer transition-all ${style.border}`}
              >

                {/* glow background */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br ${style.glow}`}
                />

                {/* floating blob */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-blue-400/10 blur-2xl group-hover:scale-125 transition-transform duration-500" />

                {/* badge */}
                <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white shadow-sm w-fit">
                  <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                  <span className="text-xs font-medium">{cat.label}</span>
                </div>

                {/* title */}
                <h3 className="relative mt-5 text-xl font-bold">
                  {cat.title}
                </h3>

                {/* description */}
                <p className="relative mt-3 text-sm text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>

                {/* footer */}
                <div className="relative flex items-center justify-between mt-6 pt-4 border-t border-dashed">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {cat.code}
                  </span>

                  <span className="text-2xl font-bold">
                    {cat.count}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  );
}