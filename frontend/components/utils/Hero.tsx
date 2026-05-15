"use client";

import { motion } from "framer-motion";
import { HERO_STATS, SITE_CONFIG } from "@/lib/constant";
import { Btn, ArrowIcon, LiveDot } from "../ui";
import MadagascarMap from "@/components/maps/MadagascarMap";
import TypingText from "./TypingText";

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const data = ["connecté", "intelligent", "évolué"];
export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background pt-[85px]">
      {/* 🌫️ BACKGROUND GLOW (global theme) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-red-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-green-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-14 items-center pt-2">
        {/* ================= LEFT ================= */}
        <motion.div variants={heroVariants} initial="hidden" animate="visible">
          {/* badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div
              className="
              inline-flex items-center gap-2
              px-4 py-2
              rounded-full
              bg-surface
              border border-border
              backdrop-blur-xl
            "
            >
              <LiveDot color="green" />

              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Smart City · Madagascar · temps réel
              </span>
            </div>
          </motion.div>

          {/* title */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-6xl font-bold leading-tight text-foreground py-5"
          >
            Une ville plus{" "}
            <span className="text-red-500 italic">intelligente</span>, connectée
            et{" "}
            <span className="text-green-500">
              <TypingText
                words={[
                  "propre",
                  "sécurisée",
                  "moderne",
                  "organisée",
                  "durable",
                  "interactive",
                ]}
              />
            </span>
          </motion.h1>

          {/* description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-muted-foreground text-lg max-w-[520px]"
          >
            Signalez les problèmes, suivez les événements et visualisez la
            gestion urbaine en temps réel dans toutes les provinces de
            Madagascar.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex gap-3 mt-8 flex-wrap"
          >
            {/* 🔴 PRIMARY BUTTON FIXED */}
            <Btn variant="primary" href={SITE_CONFIG.mapAppUrl}>
              Explorer la carte <ArrowIcon />
            </Btn>

            {/* 🟢 SECONDARY BUTTON CLEAN */}
            <Btn
              variant="ghost"
              href="#how"
              className="bg-surface border border-border text-foreground hover:bg-muted"
            >
              Comment ça marche
            </Btn>
          </motion.div>

          {/* stats */}
          <motion.div
            variants={itemVariants}
            className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-foreground">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= RIGHT ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[580px] hidden lg:block"
        >
          {/* map card */}
          <div
            className="
            absolute inset-0
            rounded-3xl
            bg-surface
            border border-border
            backdrop-blur-2xl
            shadow-xl
            overflow-hidden
          "
          >
            <div className="p-4 border-b border-border flex justify-between items-center">
              <span className="text-xs font-mono uppercase text-muted-foreground">
                Madagascar Live
              </span>
              <LiveDot color="green" />
            </div>

            <MadagascarMap showPins animated className="h-full" />
          </div>

          {/* glow */}
          <div className="absolute inset-0 bg-gradient-glow blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
