"use client";
// ============================================================
// components/sections/CtaBanner.tsx
// Dark CTA card with role breakdown and orange accents
// ============================================================

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CTA_ROLES, SITE_CONFIG } from "@/lib/constant";
import { Btn, ArrowIcon } from "../ui";

const DOT_COLORS: Record<string, string> = {
  news: "bg-blue-400",
  infra: "bg-amber-400",
  urg: "bg-red-400",
  waste: "bg-violet-400",
};

export default function CtaBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-bg">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-dark rounded-4xl p-10 lg:p-16 text-[#f6f4ef] overflow-hidden grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center"
        >
          {/* Orange radial glow */}
          <div className="absolute -right-24 -top-20 w-[380px] h-[380px] rounded-full bg-radial-[at_50%_50%] from-orange-3/20 to-transparent pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-[200px] h-[200px] rounded-full bg-orange-1/5 blur-[60px] pointer-events-none" />

          {/* Left: text + CTAs */}
          <div className="relative">
            <h2 className="font-display font-light text-[clamp(32px,4vw,50px)] leading-[1.05] tracking-[-0.022em] mb-5 text-wrap-balance">
              Prêt à rendre{" "}
              <span className="italic bg-gradient-text bg-clip-text text-transparent">
                votre quartier
              </span>{" "}
              plus lisible ?
            </h2>
            <p className="text-[#bdb8a6] text-[15.5px] leading-relaxed mb-8 max-w-[480px]">
              Ouvrez la carte en temps réel ou demandez à inscrire votre commune au
              programme Smart City — c&apos;est gratuit pour les fokontany pilotes en 2026.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href={SITE_CONFIG.mapAppUrl}
                className="inline-flex items-center gap-2 bg-[#f6f4ef] text-ink font-heading font-semibold text-[13.5px] px-5 py-2.5 rounded-full hover:bg-white transition-colors"
              >
                Ouvrir la carte <ArrowIcon />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-white/20 text-[#f6f4ef] font-heading font-semibold text-[13.5px] px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                Inscrire ma commune
              </a>
            </div>
          </div>

          {/* Right: role breakdown card */}
          <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
              Qui peut utiliser Carte.mg ?
            </div>
            {CTA_ROLES.map((role) => (
              <div key={role.label} className="flex items-center gap-3 text-[13px] text-[#bdb8a6]">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${DOT_COLORS[role.color]}`} />
                <span>
                  <strong className="text-[#f6f4ef] font-heading font-semibold">
                    {role.label}
                  </strong>{" "}
                  — {role.desc}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}