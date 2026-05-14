"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TESTIMONIAL } from "@/lib/constant";
export default function Testimonial() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const parts = TESTIMONIAL.quote.split(TESTIMONIAL.highlight);

  return (
    <section className="relative py-24 bg-gradient-dark text-[#f6f4ef] overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-2/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-orange-3/8 blur-[80px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-8" ref={ref}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#000] mb-10"
        >
          <span className="w-6 h-px bg-[#8a7d5a]" />
          Témoignage pilote
        </motion.div>

        {/* Large quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light text-[clamp(28px,3.5vw,46px)] leading-[1.18] tracking-[-0.015em] text-wrap-balance max-w-[980px] mb-10"
        >
          «&nbsp;
          {parts[0]}
          <em className="not-italic bg-gradient-text bg-clip-text text-transparent">
            {TESTIMONIAL.highlight}
          </em>
          {parts[1]}
          &nbsp;»
        </motion.blockquote>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-[#3a3a3a] border border-white/10 grid place-items-center font-mono text-sm font-semibold text-[#000]">
            {TESTIMONIAL.initials}
          </div>
          <div>
            <div className="font-heading font-semibold text-[14px] text-[#000]">
              {TESTIMONIAL.author}
            </div>
            <div className="font-mono text-[11px] text-[#000000] tracking-wider mt-0.5">
              {TESTIMONIAL.role}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
