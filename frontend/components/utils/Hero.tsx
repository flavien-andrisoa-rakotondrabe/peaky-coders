"use client";

import { motion } from "framer-motion";
import { HERO_STATS, FLOATING_EVENTS, SITE_CONFIG } from "@/lib/constant";
import { Btn, ArrowIcon, GradientText, LiveDot } from "../ui";
import MadagascarMap from "./MadagascarMap";

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background pt-[70px]">

      {/* 🌊 Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500/20 blur-[140px] rounded-full" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-green-500/20 blur-[140px] rounded-full" />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-14 items-center">

        {/* ================= LEFT ================= */}
        <motion.div variants={heroVariants} initial="hidden" animate="visible">

          {/* badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white/70 backdrop-blur">
              <LiveDot color="green" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Smart City · Madagascar · temps réel
              </span>
            </div>
          </motion.div>

          {/* title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Une ville plus{" "}
            <GradientText>intelligente</GradientText>,{" "}
            <br />
            connectée et{" "}
            <span className="text-blue-500">propre</span>
          </motion.h1>

          {/* description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-muted-foreground text-lg max-w-[520px]"
          >
            Signalez les problèmes, suivez les événements et visualisez la
            gestion urbaine en temps réel dans toutes les provinces de Madagascar.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex gap-3 mt-8 flex-wrap">
            <Btn variant="primary" href={SITE_CONFIG.mapAppUrl}>
              Explorer la carte <ArrowIcon />
            </Btn>
            <Btn variant="ghost" href="#how">
              Comment ça marche
            </Btn>
          </motion.div>

          {/* stats */}
          <motion.div
            variants={itemVariants}
            className="mt-10 grid grid-cols-3 gap-6 border-t pt-6"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= RIGHT ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[580px] hidden lg:block"
        >

          {/* map card */}
          <div className="absolute inset-0 rounded-3xl border bg-white shadow-xl overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <span className="text-xs font-mono uppercase text-muted-foreground">
                Madagascar Live
              </span>
              <LiveDot color="green" />
            </div>

            <MadagascarMap showPins animated className="h-full" />
          </div>

          {/* floating glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-green-500/10 blur-2xl" />
        </motion.div>

      </div>
    </section>
  );
}