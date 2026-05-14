"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/constant";
import { SectionWrapper, Container, SectionEyebrow, FadeIn, Btn } from "../ui";

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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Categories() {
  return (
    <SectionWrapper id="cats" className="relative bg-background/40">
      {/* background soft glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-green-500/5 pointer-events-none" />

      <Container>
        {/* HEADER */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-[620px]">
            <SectionEyebrow num="01" label="Catégories" />

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Une lecture simple de la{" "}
              <span className="text-green-500">ville</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => {
            const style = COLOR_STYLES[cat.color];

            return (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className={`relative group rounded-3xl shadow-xl bg-white/60 backdrop-blur-xl p-6 overflow-hidden cursor-pointer transition-all duration-300 ${style.border}`}
              >
                {/* glow hover background */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br ${style.glow}`}
                />

                {/* floating blob */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-black/5 blur-2xl group-hover:scale-125 transition-transform duration-500" />

                {/* badge */}
                <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/5 w-fit">
                  <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                  <span className="text-xs font-medium">{cat.label}</span>
                </div>

                {/* title */}
                <h3 className="relative mt-5 text-xl font-bold">{cat.title}</h3>

                {/* description */}
                <p className="relative mt-3 text-sm text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>

                {/* footer */}
                <div className="relative flex items-center justify-between mt-6 pt-4 border-t border-dashed border-black/10">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {cat.code}
                  </span>

                  <span className="text-2xl font-bold">{cat.count}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
