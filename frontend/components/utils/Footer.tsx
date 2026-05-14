"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  Heart,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── CONFIG — personnalisez ici ───────────────────────────────────────────────

const BRAND = {
  name: "Luminary",
  tagline: "Built for teams that move fast.",
  icon: "✦",
  badge: "v2.0",
};

const LINKS = [
  {
    title: "Product",
    items: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#", badge: "New" },
      { label: "Roadmap", href: "#" },
      { label: "Status", href: "#", external: true },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#", badge: "Hiring" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Developers",
    items: [
      { label: "Docs", href: "#" },
      { label: "API", href: "#" },
      { label: "SDK", href: "#" },
      { label: "Open Source", href: "#", external: true },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Licenses", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Mail, href: "#", label: "Mail" },
  { icon: MapPin, href: "#", label: "Twitter" },
];

const CONTACT = [
  { icon: Mail, text: "hello@luminary.dev" },
  { icon: MapPin, text: "Paris, France" },
  { icon: Phone, text: "+33 1 23 45 67 89" },
];

// ─── Variants ────────────────────────────────────────────────────────────────

const colVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── NewsletterForm ───────────────────────────────────────────────────────────

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [focused, setFocused] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || done) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  };

  return (
    <form onSubmit={submit} className="mt-4">
      <div
        className={cn(
          "flex gap-2 p-1.5 rounded-xl border bg-background/60 backdrop-blur-sm transition-all duration-200",
          focused
            ? "border-primary/50 shadow-[0_0_0_3px_hsl(var(--primary)/0.09)]"
            : "border-border/60"
        )}
      >
        {done ? (
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-emerald-500 font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle2 className="size-4" /> You're subscribed!
          </motion.div>
        ) : (
          <>
            <Input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50 text-sm h-8"
            />
            <motion.div whileTap={{ scale: 0.96 }}>
              <Button
                type="submit"
                size="sm"
                disabled={loading}
                className="h-8 px-4 rounded-lg text-sm font-semibold gap-1.5 shrink-0 relative overflow-hidden group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/10 skew-x-12 transition-transform duration-700" />
                {loading ? (
                  <motion.div
                    className="size-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </motion.div>
          </>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground/60 mt-2 px-1">
        No spam, unsubscribe anytime. We respect your privacy.
      </p>
    </form>
  );
}

// ─── SocialBtn ────────────────────────────────────────────────────────────────

function SocialBtn({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2, scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={cn(
        "size-9 rounded-xl border border-border/50 bg-background/50",
        "flex items-center justify-center text-muted-foreground",
        "hover:text-foreground hover:border-border hover:bg-muted/70",
        "transition-colors duration-150 backdrop-blur-sm"
      )}
    >
      <Icon className="size-4" />
    </motion.a>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-border/50 overflow-hidden">
      {/* Ambient top glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-150 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-125 h-50 bg-primary/5 blur-[80px] rounded-full" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        {/* ── TOP SECTION ── */}
        <div className="pt-14 pb-10 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          {/* Brand column */}
          <motion.div
            className="space-y-5"
            custom={0}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <motion.div
                className="size-9 rounded-[11px] bg-primary flex items-center justify-center shadow-lg shadow-primary/30 text-primary-foreground font-bold text-[17px]"
                whileHover={{ rotate: 8, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {BRAND.icon}
              </motion.div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[17px] tracking-tight">
                  {BRAND.name}
                </span>
                <Badge
                  variant="secondary"
                  className="text-[9px] font-bold tracking-wider px-1.5 py-0 h-4"
                >
                  {BRAND.badge}
                </Badge>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-60">
              {BRAND.tagline} Loved by thousands of developers worldwide.
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              {CONTACT.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-default"
                >
                  <Icon className="size-3.5 text-muted-foreground/60 shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIALS.map((s) => (
                <SocialBtn key={s.label} {...s} />
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1">
                Stay in the loop
              </p>
              <NewsletterForm />
            </div>
          </motion.div>

          {/* Link columns */}
          {LINKS.map((col, ci) => (
            <motion.div
              key={col.title}
              className="space-y-3"
              custom={ci + 1}
              variants={colVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              <p className="text-[11px] font-bold tracking-[1.2px] uppercase text-muted-foreground/70">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <motion.a
                      href={item.href}
                      className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                      whileHover={{ x: 2 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    >
                      {item.label}
                      {"badge" in item && item.badge && (
                        <span className="inline-flex items-center text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                          {item.badge}
                        </span>
                      )}
                      {"external" in item && item.external && (
                        <ExternalLink className="size-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Separator className="opacity-50" />

        {/* ── BOTTOM BAR ── */}
        <motion.div
          className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-xs text-muted-foreground/60 order-2 sm:order-1">
            © {new Date().getFullYear()} {BRAND.name}, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 order-1 sm:order-2">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="size-3 fill-rose-500 text-rose-500" />
            </motion.span>
            <span>using</span>
            <span className="font-semibold text-foreground/70">
              Next.js · shadcn · Tailwind
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
