"use client";
// ============================================================
// components/layout/Navbar.tsx
// Sticky nav with blur backdrop · Logo · Links · CTAs
// ============================================================

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constant";
import { Btn, ArrowIcon, LiveDot } from "../ui";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-line shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-xl bg-gradient-main grid place-items-center text-white font-mono font-bold text-sm shadow-orange-sm flex-shrink-0 transition-transform group-hover:scale-105">
            M
          </span>
          <span className="font-heading font-bold text-[15px] tracking-tight text-ink">
            {SITE_CONFIG.name}
            <span className="text-ink-3 font-medium">{SITE_CONFIG.domain}</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-heading font-medium text-ink-2 hover:text-ink transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-main group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {/* Live badge */}
          <div className="flex items-center gap-2 border border-line rounded-full px-3 py-1.5 bg-surface">
            <LiveDot color="green" />
            <span className="font-mono text-[10px] text-ink-3 uppercase tracking-widest">
              Live
            </span>
          </div>
          <Btn variant="ghost" href={SITE_CONFIG.mapAppUrl}>
            Se connecter
          </Btn>
          <Btn variant="primary" href={SITE_CONFIG.mapAppUrl}>
            Ouvrir la carte <ArrowIcon />
          </Btn>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={cn("w-5 h-0.5 bg-ink transition-all", menuOpen && "rotate-45 translate-y-2")} />
          <span className={cn("w-5 h-0.5 bg-ink transition-all", menuOpen && "opacity-0")} />
          <span className={cn("w-5 h-0.5 bg-ink transition-all", menuOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-surface border-t border-line px-6 pb-6 flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-heading font-medium text-ink-2 py-2 border-b border-line"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Btn variant="primary" href={SITE_CONFIG.mapAppUrl} className="w-full justify-center mt-2">
            Ouvrir la carte <ArrowIcon />
          </Btn>
        </motion.div>
      )}
    </motion.nav>
  );
}