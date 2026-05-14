"use client";

import { useState } from "react";
import Image from "next/image";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ─── Types ────────────────────────────────────────────────────
interface ReportCardProps {
  category?: string;
  title?: string;
  location?: string;
  date?: string;
  time?: string;
  description?: string;
  /** Chemin Next.js Image (ex: "/images/depot.jpg") */
  coverImage?: string;
  /** Score de priorité 1–5 */
  priorityScore?: number;
  isFavorited?: boolean;
  reportCode?: string;
}

// ─── Configs ──────────────────────────────────────────────────
const PRIORITY: Record<number, { label: string; bar: string; text: string }> = {
  1: { label: "Faible", bar: "bg-emerald-500", text: "text-emerald-600" },
  2: { label: "Modérée", bar: "bg-sky-500", text: "text-sky-600" },
  3: { label: "Moyenne", bar: "bg-amber-500", text: "text-amber-600" },
  4: { label: "Élevée", bar: "bg-orange-500", text: "text-orange-600" },
  5: { label: "Critique", bar: "bg-red-500", text: "text-red-600" },
};

const CATEGORY: Record<string, { dot: string }> = {
  Déchets: { dot: "bg-violet-500" },
  Infrastructure: { dot: "bg-amber-500" },
  Urgence: { dot: "bg-red-500" },
  Actualité: { dot: "bg-blue-500" },
};

// ─── PriorityBars ─────────────────────────────────────────────
function PriorityBars({
  score,
  onChange,
}: {
  score: number;
  onChange: (n: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? score;
  const cfg = PRIORITY[score];

  const heights = ["h-[8px]", "h-[11px]", "h-[14px]", "h-[17px]", "h-[20px]"];

  return (
    <TooltipProvider delayDuration={80}>
      <div className="flex items-center gap-2">
        <div className="flex items-end gap-[3px]">
          {[1, 2, 3, 4, 5].map((n) => (
            <Tooltip key={n}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChange(n)}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(null)}
                  aria-label={`Priorité ${PRIORITY[n].label}`}
                  className="focus:outline-none"
                >
                  <span
                    className={[
                      "block w-[6px] rounded-full transition-all duration-150",
                      heights[n - 1],
                      n <= active ? `${PRIORITY[active].bar}` : "bg-gray-200",
                    ].join(" ")}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-[11px] px-2 py-0.5">
                {PRIORITY[n].label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <span className={`text-[11px] font-semibold ${cfg.text}`}>
          {cfg.label}
        </span>
      </div>
    </TooltipProvider>
  );
}

// ─── ReportCard ───────────────────────────────────────────────
export default function HoverCards({
  category = "Déchets",
  title = "Dépôt sauvage signalé",
  location = "Tanambao IV, Antsiranana",
  date = "13 mai",
  time = "18:50",
  description = "Citoyen lambda a signalé un dépôt important — équipe d'enlèvement mobilisée.",
  coverImage,
  priorityScore: initScore = 4,
  isFavorited: initFav = false,
  reportCode = "RPT-2024-0342",
}: ReportCardProps) {
  const [favorited, setFavorited] = useState(initFav);
  const [score, setScore] = useState(initScore);

  const cat = CATEGORY[category] ?? CATEGORY["Déchets"];

  return (
    <Card className="w-[300px] overflow-hidden rounded-2xl border border-gray-200/80 shadow-md p-0 gap-0">
      {/* ── Cover image ───────────────────────────────────── */}
      <div className="relative h-[136px] bg-gray-100">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="300px"
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-35"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg,#e5e7eb 0,#e5e7eb 1px,transparent 1px,transparent 10px)",
              backgroundSize: "14px 14px",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-6 h-6 text-gray-400"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="font-mono text-[9px] text-gray-400 tracking-widest">
              photo · {reportCode.toLowerCase()}
            </span>
          </div>
        )}

        
      </div>

      {/* ── Corps ─────────────────────────────────────────── */}
      <CardContent className="px-4 pt-3.5 pb-3 flex flex-col gap-2.5">
        <h3 className="font-semibold text-[14.5px] leading-snug tracking-tight text-gray-900">
          {title}
        </h3>

        <div className="flex items-center gap-3 text-[11.5px] text-gray-400">
          <span className="flex items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3 h-3 shrink-0"
            >
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {location}
          </span>
          <span className="flex items-center gap-1 ml-auto shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3 h-3 shrink-0"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            {date}, {time}
          </span>
        </div>

        <p className="text-[12.5px] text-gray-500 leading-relaxed line-clamp-2">
          {description}
        </p>
      </CardContent>

      <Separator />

      {/* ── Footer ────────────────────────────────────────── */}
      <CardFooter className="px-4 py-2.5 flex items-center justify-between">
        {/* Score de priorité */}
        <PriorityBars score={score} onChange={setScore} />

        {/* Code rapport + bouton favoris */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-gray-300 tracking-widest">
            {reportCode}
          </span>

          <TooltipProvider delayDuration={80}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFavorited((f) => !f)}
                  aria-label={
                    favorited ? "Retirer des favoris" : "Ajouter aux favoris"
                  }
                  className={`
                    h-8 w-8 rounded-full transition-all duration-200
                    ${
                      favorited
                        ? "text-red-500 bg-red-50 hover:bg-red-100"
                        : "text-gray-300 hover:text-red-400 hover:bg-red-50"
                    }
                  `}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill={favorited ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-[11px] px-2 py-0.5">
                {favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
}
