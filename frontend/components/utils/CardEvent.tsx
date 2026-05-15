"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EventInterface } from "@/types/event.interface";

// ─── Types ────────────────────────────────────────────────────
type Category = "actu" | "dechet" | "infra" | "urgence";

interface MarkerPopupProps {
  category?: Category;
  title?: string;
  location?: string;
  sublocation?: string;
  description?: string;
  timeAgo?: string;
  isFavorited?: boolean;
  onClick?: () => void;
}

// ─── Config catégories ────────────────────────────────────────
export const CAT: Record<
  Category,
  { border: string; dot: string; className: string; badgeText: string }
> = {
  actu: {
    border: "border-l-blue-400",
    dot: "bg-blue-500",
    className: "bg-blue-50 border-blue-200 text-blue-700",
    badgeText: "ACTUALITÉ",
  },
  dechet: {
    border: "border-l-violet-400",
    dot: "bg-violet-500",
    className: "bg-violet-50 border-violet-200 text-violet-700",
    badgeText: "DÉCHETS",
  },
  infra: {
    border: "border-l-amber-400",
    dot: "bg-amber-500",
    className: "bg-amber-50 border-amber-200 text-amber-700",
    badgeText: "INFRASTRUCTURE",
  },
  urgence: {
    border: "border-l-red-400",
    dot: "bg-red-500",
    className: "bg-red-50 border-red-200 text-red-700",
    badgeText: "URGENCE",
  },
};

// ─── MarkerPopup ──────────────────────────────────────────────
export default function CardEvent({ item }: { item: EventInterface }) {
  const [favorited, setFavorited] = useState(0);
  const cat = CAT[item?.category ?? "actu"];

  return (
    <TooltipProvider delayDuration={100}>
      <Card
        className={`
          w-[340px] rounded-xl bg-white
          shadow-[0_4px_24px_rgba(0,0,0,0.09)]
          p-0 gap-0 overflow-hidden
          cursor-pointer group
          transition-shadow duration-200 ring-0
          hover:shadow-[0_6px_28px_rgba(0,0,0,0.13)]
        `}
      >
        <div className="px-4 py-3.5 flex flex-col gap-2">
          {/* ── Ligne 1 : titre + temps ── */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-[16px] leading-snug tracking-tight text-gray-900 flex-1">
              {item?.title}
            </h3>
            <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
              <span className="text-[11px] text-gray-400 tabular-nums">
                {item?.date}
              </span>

              {/* Bouton favoris */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      // setFavorited((f) => !f);
                    }}
                    aria-label={
                      favorited ? "Retirer des favoris" : "Ajouter aux favoris"
                    }
                    className={`
                      h-6 w-6 cursor-pointer rounded-full -mr-1 transition-all duration-200
                      ${
                        favorited
                          ? "text-red-500 bg-red-50"
                          : "text-gray-300 hover:text-red-400 hover:bg-red-50"
                      }
                    `}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5"
                      fill={favorited ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                {/* <TooltipContent side="top" className="text-[11px] px-2 py-0.5">
                  {favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
                </TooltipContent> */}
              </Tooltip>
            </div>
          </div>

          {/* ── Ligne 2 : localisation ── */}
          <div className="flex items-center gap-1 text-[11.5px] text-gray-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3 h-3 shrink-0 text-gray-400"
            >
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {/* <span className="font-medium text-gray-500">{item.location}</span> */}
          </div>

          {/* ── Ligne 3 : description ── */}
          <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">
            {item?.description}
          </p>

          {/* ── Ligne 4 : badge catégorie ── */}
          <div className="pt-0.5">
            <span
              className={`
                inline-flex items-center gap-1.5 px-2 py-[3px]
                rounded-full border text-[10px] font-bold tracking-widest
                ${cat.badge}
              `}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
              {cat.badgeText}
            </span>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
}
