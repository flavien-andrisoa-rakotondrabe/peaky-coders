"use client";

import Link from "next/link";
import Logo from "@/components/utils/Logo";

import { useCallback, useState, Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { HDRScene } from "@/components/hdr/Scene";

const PANEL_IMAGES = {
  login: {
    title: "Bon retour parmi nous !",
    sub: "Accédez à votre espace personnelle, vos annonces et vos signalements.",
  },
  signup: {
    title: "Découvrir autrement,\nse renseigner mieux.",
    sub: "Rejoignez 12 000+ utilisateurs à travers Madagascar.",
  },
};

type Tab = "login" | "signup";

const TABS: Tab[] = ["login", "signup"];

export default function AuthPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Récupérer l'onglet actuel depuis l'URL (ou défaut)
  const currentTab = (searchParams.get("tab") as Tab) ?? TABS[0];

  // 2. Fonction pour mettre à jour l'URL proprement
  const changeTab = useCallback(
    (newTab: Tab) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", newTab);

      // router.replace évite d'ajouter une nouvelle entrée dans l'historique
      // à chaque clic (plus propre pour des onglets)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router],
  );

  const panel = PANEL_IMAGES[currentTab];

  return (
    <div className="flex min-h-screen bg-background">
      {/* ── Left illustration ── */}
      <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex lg:w-[45%] xl:w-1/2">
        {/* <div className="hero-overlay absolute inset-0 z-10" /> */}

        <div className="relative z-20">
          <Logo />
        </div>

        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 4], fov: 45 }}
            gl={{
              powerPreference: "high-performance",
              // precision: "mediump",
            }}
          >
            <Suspense fallback={null}>
              <HDRScene hdrPath="/hdr/bg.hdr" />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-20 space-y-3">
          <p className="font-display text-3xl leading-tight font-bold whitespace-pre-line text-white">
            {panel.title}
          </p>
          <p className="font-body text-sm text-white/70">{panel.sub}</p>
          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 pt-4">
            {[
              { icon: "🏡", label: "2 000+ nouvelles" },
              { icon: "⭐", label: "98% satisfaction" },
              { icon: "🔒", label: "Participants reglementés" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur-sm"
              >
                <span className="text-sm leading-none">{b.icon}</span>
                <span className="font-body text-xs font-medium text-white/90">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form area ── */}
      <div className="flex flex-1 flex-col">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 px-6 pt-6 pb-0 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* ── Tab switcher ── */}
            <div className="mb-8 flex rounded-2xl bg-muted p-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => changeTab(t)}
                  className={cn(
                    "font-body flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all",
                    currentTab === t
                      ? "bg-card text-foreground shadow-card"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t === "login" ? "Se connecter" : "Créer un compte"}
                </button>
              ))}
            </div>

            {/* ── Forms ── */}
            {currentTab === "login" ? (
              <LoginForm onSwitchToSignup={() => changeTab("signup")} />
            ) : (
              <SignupForm onSwitchToLogin={() => changeTab("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
