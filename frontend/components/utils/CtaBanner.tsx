"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CTA_ROLES, SITE_CONFIG } from "@/lib/constant";
import { ArrowIcon } from "../ui";

const DOT_COLORS: Record<string, string> = {
  news: "bg-green-500",
  infra: "bg-red-500",
  urg: "bg-red-600",
  waste: "bg-green-600",
};

export default function CtaBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative
            bg-surface
            backdrop-blur-2xl
            border border-border
            rounded-3xl
            p-10 lg:p-16
            grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]
            gap-10
            items-center
            shadow-xl
            overflow-hidden
          "
        >
          {/* 🌫️ soft glow using global CSS gradient */}
          <div className="absolute -right-24 -top-20 w-[380px] h-[380px] bg-gradient-glow rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-red-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* LEFT */}
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
              Prêt à rendre{" "}
              <span className="text-gradient italic">votre quartier</span> plus
              lisible ?
            </h2>

            <p className="mt-5 text-muted-foreground text-[15.5px] leading-relaxed max-w-[480px]">
              Ouvrez la carte en temps réel ou demandez à inscrire votre commune
              au programme Smart City — c’est gratuit pour les fokontany
              pilotes.
            </p>

            {/* CTA */}
            <div className="flex gap-3 flex-wrap mt-8">
              <a
                href={SITE_CONFIG.mapAppUrl}
                className="
                  inline-flex items-center gap-2
                  bg-red-600
                  text-foreground
                  text-muted
                  font-semibold
                  px-5 py-2.5
                  rounded-full
                  shadow-md
                  hover:opacity-90 transition
                "
              >
                Ouvrir la carte <ArrowIcon />
              </a>

              <a
                href="#"
                className="
                  inline-flex items-center gap-2
                  border border-border
                  text-foreground
                  px-5 py-2.5
                  rounded-full
                  bg-surface
                  hover:bg-muted
                  transition
                "
              >
                Inscrire ma commune
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
            relative
            bg-surface
            border border-border
            rounded-2xl
            p-6
            flex flex-col gap-4
            backdrop-blur-xl
          "
          >
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
              Qui peut utiliser Carte.mg ?
            </div>

            {CTA_ROLES.map((role) => (
              <div
                key={role.label}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    DOT_COLORS[role.color]
                  }`}
                />

                <span>
                  <strong className="text-foreground font-semibold">
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
