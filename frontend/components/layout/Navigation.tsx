"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constant";
import { Btn, ArrowIcon, LiveDot } from "../ui";
import { cn } from "@/lib/utils";

import Logo from "@/components/utils/Logo";
import Button3DV2 from "@/components/utils/Button3DV2";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all",
        scrolled &&
          "backdrop-blur-xl bg-white/70 border-b border-border shadow-sm",
      )}
    >
      <div className="max-w-310 mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* logo */}

        <Logo />

        {/* links */}
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground relative group"
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all" />
            </a>
          ))}
        </div>

        {/* actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border">
            <LiveDot color="green" />
            <span className="text-xs uppercase">Live</span>
          </div>

          <Button3DV2
            label="Explorer"
            breakpoints={[{ tw: "sm", width: 80, height: 48, fontSize: 16 }]}
          />
        </div>

        {/* mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-foreground" />
          <span className="w-6 h-0.5 bg-foreground" />
          <span className="w-6 h-0.5 bg-foreground" />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden border-t bg-white px-6 py-4"
        >
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="block py-2">
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
