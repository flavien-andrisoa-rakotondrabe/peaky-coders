"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constant";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Moon,
  Sun,
  Menu,
  X,
  Zap,
  LayoutDashboard,
  CreditCard,
  ShoppingBag,
  Truck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/utils/Logo";
import Button3DV2 from "@/components/utils/Button3DV2";

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = NAV_LINKS;

// ─── ThemeToggle ──────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-9" />;
  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.06 }}
      className={cn(
        "relative size-9 rounded-lg border flex items-center justify-center",
        "bg-background/80 hover:bg-muted backdrop-blur-sm",
        "transition-colors duration-200 overflow-hidden border-border/50",
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -80, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 80, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute"
        >
          {isDark ? (
            <Moon className="size-[15px] text-amber-300" />
          ) : (
            <Sun className="size-[15px] text-amber-500" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Desktop NavLink ──────────────────────────────────────────────────────────

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      className="relative px-3 py-1.5 text-[13.5px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 rounded-lg group"
      whileHover="hovered"
    >
      <motion.span
        variants={{ hovered: { opacity: 1 }, initial: { opacity: 0 } }}
        initial="initial"
        className="absolute inset-0 rounded-lg bg-muted/60"
        transition={{ duration: 0.14 }}
      />
      <span className="relative z-10">{label}</span>
    </motion.a>
  );
}

// ─── Mobile NavItem ───────────────────────────────────────────────────────────

const MOBILE_ICONS = [CreditCard, Truck, ShoppingBag, LayoutDashboard];

function MobileNavItem({
  label,
  href,
  index,
}: {
  label: string;
  href: string;
  index: number;
}) {
  const Icon = MOBILE_ICONS[index % MOBILE_ICONS.length];

  return (
    <motion.a
      href={href}
      className={cn(
        "flex items-center justify-between px-4 py-3 rounded-xl group",
        "text-sm font-medium text-muted-foreground hover:text-foreground",
        "hover:bg-muted/50 transition-colors duration-150",
      )}
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.06 + 0.1,
        duration: 0.28,
        ease: "easeOut",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <Icon className="size-4 text-muted-foreground group-hover:text-[#e8251a] transition-colors" />
        </span>
        {label}
      </div>
      <ChevronRight className="size-3.5 opacity-35 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all" />
    </motion.a>
  );
}

// ─── BFM Badge ────────────────────────────────────────────────────────────────

// function BFMBadge() {
//   return (
//     <div
//       className={cn(
//         "hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full",
//         "border border-[#007a38]/30 bg-[#eaf7ee] text-[#005a2a]",
//         "text-[10px] font-bold tracking-[0.1em] uppercase",
//       )}
//       style={{ fontFamily: "var(--font-mono)" }}
//     >
//       <span className="size-1.5 rounded-full bg-[#007a38] animate-pulse inline-block" />
//       Agréé BFM
//     </div>
//   );
// }

// ─── Header ──────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 14);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-2xl border-b border-border/60 shadow-sm"
          : "bg-transparent",
      )}
      initial={{ y: -68, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle top red line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, #e8251a 0%, #007a38 50%, #e8251a 100%)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[62px] flex items-center justify-between gap-4">
        {/* ── Logo ── */}
        <Logo />

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} label={item.label} href={item.href} />
          ))}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-2">
          {/* <BFMBadge /> */}
          <ThemeToggle />

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-4 rounded-lg text-[13.5px] font-medium hover:bg-muted/70"
            >
              Connexion
            </Button>

            <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -1 }}>
              <Button
                size="sm"
                className={cn(
                  "h-9 px-4 rounded-lg text-[13.5px] font-semibold gap-1.5",
                  "bg-[#007a38] hover:bg-[#005a2a] text-white",
                  "shadow-md shadow-[#007a38]/30 hover:shadow-[#007a38]/50",
                  "transition-all duration-200 btn-shimmer",
                )}
              >
                Commencer
                <ArrowRight className="size-3.5" />
              </Button>
            </motion.div>
          </div>

          {/* Mobile CTA icon */}
          <Button
            size="sm"
            className="sm:hidden h-9 px-3 rounded-lg bg-[#007a38] hover:bg-[#005a2a] text-white"
          >
            <Zap className="size-3.5" />
          </Button>

          {/* Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <motion.button
                className={cn(
                  "md:hidden size-9 rounded-lg border border-border/50",
                  "bg-background/80 flex items-center justify-center",
                  "hover:bg-muted transition-colors backdrop-blur-sm",
                )}
                whileTap={{ scale: 0.88 }}
                aria-label="Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileOpen ? "x" : "menu"}
                    initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.17 }}
                    className="absolute"
                  >
                    {mobileOpen ? (
                      <X className="size-4" />
                    ) : (
                      <Menu className="size-4" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 p-0">
              <div className="flex items-center px-5 pt-5 pb-4">
                <Logo />
              </div>
              <Separator />

              <div className="px-3 py-4 space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <MobileNavItem
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    index={i}
                  />
                ))}
              </div>

              <Separator />

              <motion.div
                className="px-4 pt-4 space-y-2.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.28 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-10 rounded-xl font-medium"
                >
                  Connexion
                </Button>
                <Button className="w-full h-10 rounded-xl font-semibold gap-2 bg-[#007a38] hover:bg-[#005a2a] text-white shadow-lg shadow-[#007a38]/25">
                  <ArrowRight className="size-4" />
                  Commencer
                </Button>
              </motion.div>

              <motion.div
                className="absolute bottom-5 left-0 right-0 px-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div
                  className="text-center text-[10px] text-muted-foreground"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  © 2025 Mada Smart · BFM N° 2024/0142
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
