"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TESTIMONIAL } from "@/lib/constant";

export default function Testimonial() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const parts = TESTIMONIAL.quote.split(TESTIMONIAL.highlight);

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* 🌫️ soft global glow (red/green theme) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-8" ref={ref}>
        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground font-mono mb-10"
        >
          <span className="w-6 h-px bg-border" />
          Témoignage pilote
        </motion.div>

        {/* QUOTE */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="
            text-3xl md:text-4xl lg:text-5xl
            font-bold
            leading-tight
            text-foreground
            max-w-[980px]
            mb-10
          "
        >
          « {parts[0]}
          <span className="text-gradient font-semibold">
            {TESTIMONIAL.highlight}
          </span>
          {parts[1]} »
        </motion.blockquote>

        {/* AUTHOR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          {/* AVATAR */}
          <div
            className="
            w-12 h-12
            rounded-full
            bg-surface
            border border-border
            grid place-items-center
            font-mono text-sm font-semibold
            text-foreground
          "
          >
            {TESTIMONIAL.initials}
          </div>

          {/* INFO */}
          <div>
            <div className="font-semibold text-foreground text-sm">
              {TESTIMONIAL.author}
            </div>
            <div className="text-xs text-muted-foreground tracking-widest mt-0.5">
              {TESTIMONIAL.role}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
