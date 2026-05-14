"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────
type Category = "actualite" | "infrastructure" | "urgence" | "dechets";

const CATEGORIES: {
  id: Category;
  label: string;
  sub: string;
  dot: string;
  ring: string;
  activeBg: string;
  activeBorder: string;
}[] = [
  {
    id: "actualite",
    label: "Actualité",
    sub: "Information publique",
    dot: "bg-blue-500",
    ring: "ring-blue-200",
    activeBg: "bg-blue-50",
    activeBorder: "border-blue-400",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    sub: "Travaux, réseau, voirie",
    dot: "bg-amber-500",
    ring: "ring-amber-200",
    activeBg: "bg-amber-50",
    activeBorder: "border-amber-400",
  },
  {
    id: "urgence",
    label: "Urgence / Incident",
    sub: "Accident, sinistre",
    dot: "bg-red-500",
    ring: "ring-red-200",
    activeBg: "bg-red-50",
    activeBorder: "border-red-400",
  },
  {
    id: "dechets",
    label: "Déchets",
    sub: "Collecte, tri, dépôt sauvage",
    dot: "bg-violet-500",
    ring: "ring-violet-200",
    activeBg: "bg-violet-50",
    activeBorder: "border-violet-400",
  },
];

const PROVINCES = [
  "Antananarivo (Capitale)",
  "Fianarantsoa",
  "Toamasina",
  "Mahajanga",
  "Toliara",
  "Antsiranana",
];

const NIVEAUX = [
  { value: "info", label: "Information" },
  { value: "modere", label: "Modéré" },
  { value: "eleve", label: "Élevé" },
  { value: "critique", label: "Critique" },
];

// ─── Component ────────────────────────────────────────────────
export default function AddEventForm({ onClose }: { onClose?: () => void }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, 4);
    const urls = valid.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...valid].slice(0, 4));
    setPreviews((prev) => [...prev, ...urls].slice(0, 4));
  };

  const removeImage = (i: number) => {
    setImages((p) => p.filter((_, idx) => idx !== i));
    setPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  return (
    <Card className="w-full max-w-[560px] rounded-2xl border border-gray-200 shadow-xl bg-white p-0 gap-0 overflow-hidden">

      {/* ── Header ── */}
      <CardHeader className="px-6 py-5 pb-4 flex flex-row items-center justify-between gap-4 bg-white">
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-0.5">
            Signalement
          </p>
          <h2 className="text-[18px] font-bold tracking-tight text-gray-900">
            Ajouter un événement
          </h2>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 -mr-1 -mt-1"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </Button>
        )}
      </CardHeader>

      <Separator />

      {/* ── Body ── */}
      <CardContent className="px-6 py-5 flex flex-col gap-6 overflow-y-auto max-h-[calc(90vh-80px)]">

        {/* Catégorie */}
        <div className="flex flex-col gap-2.5">
          <Label className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-gray-400">
            Catégorie <span className="text-red-400">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-2.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-3 rounded-xl border text-left transition-all duration-150",
                  category === cat.id
                    ? `${cat.activeBg} ${cat.activeBorder} shadow-sm`
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                <span
                  className={cn(
                    "w-2.5 h-2.5 rounded-full shrink-0 mt-0.5",
                    cat.dot,
                    category === cat.id && `ring-4 ${cat.ring}`
                  )}
                />
                <div>
                  <p className="text-[12px] font-bold tracking-tight text-gray-800 leading-tight">
                    {cat.label}
                  </p>
                  <p className="text-[10.5px] text-gray-400 leading-tight mt-0.5">
                    {cat.sub}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Titre */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="titre" className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-gray-400">
            Titre <span className="text-red-400">*</span>
          </Label>
          <Input
            id="titre"
            placeholder="Ex : Coupure de courant à Ambohimanga"
            className="h-10 rounded-xl border-gray-200 text-[13px] placeholder:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:border-gray-400"
          />
        </div>

        {/* Province + Commune */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-gray-400">
              Province
            </Label>
            <Select>
              <SelectTrigger className="h-10 rounded-xl border-gray-200 text-[13px] focus:ring-1 focus:ring-gray-400">
                <SelectValue placeholder="Sélectionner…" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {PROVINCES.map((p) => (
                  <SelectItem key={p} value={p} className="text-[13px]">
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="commune" className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-gray-400">
              Commune / Lieu-dit
            </Label>
            <Input
              id="commune"
              placeholder="Ex : Analakely"
              className="h-10 rounded-xl border-gray-200 text-[13px] placeholder:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:border-gray-400"
            />
          </div>
        </div>

        {/* Date + Niveau */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="date" className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-gray-400">
              Date &amp; Heure
            </Label>
            <Input
              id="date"
              type="datetime-local"
              className="h-10 rounded-xl border-gray-200 text-[13px] focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:border-gray-400"
              defaultValue={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-gray-400">
              Niveau
            </Label>
            <Select defaultValue="info">
              <SelectTrigger className="h-10 rounded-xl border-gray-200 text-[13px] focus:ring-1 focus:ring-gray-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {NIVEAUX.map((n) => (
                  <SelectItem key={n.value} value={n.value} className="text-[13px]">
                    {n.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="desc" className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-gray-400">
            Description
          </Label>
          <Textarea
            id="desc"
            rows={3}
            placeholder="Détaillez l'événement, les zones impactées, les recommandations…"
            className="rounded-xl border-gray-200 text-[13px] placeholder:text-gray-300 resize-none focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:border-gray-400 leading-relaxed"
          />
        </div>

        {/* Upload image */}
        <div className="flex flex-col gap-2">
          <Label className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-gray-400">
            Photos / Preuves
            <span className="ml-1.5 text-gray-300 font-normal normal-case tracking-normal text-[10px]">
              (max 4)
            </span>
          </Label>

          {/* Drop zone */}
          <label
            htmlFor="file-upload"
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
            className={cn(
              "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-150 py-5",
              dragging
                ? "border-gray-400 bg-gray-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/60"
            )}
          >
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5 text-gray-400">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-[12.5px] font-medium text-gray-600">
                Glisser-déposer ou <span className="text-gray-800 underline underline-offset-2">parcourir</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG, WEBP — 5 Mo max</p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>

          {/* Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-1">
              {previews.map((src, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden aspect-square bg-gray-100">
                  <Image src={src} alt={`preview-${i}`} fill className="object-cover" sizes="80px" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" className="w-4 h-4">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 pt-1 pb-1">
          {onClose && (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-10 rounded-xl text-[13px] font-medium border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Annuler
            </Button>
          )}
          <Button
            type="submit"
            className="flex-1 h-10 rounded-xl text-[13px] font-semibold bg-gray-900 hover:bg-gray-800 text-white shadow-sm"
          >
            Publier l&apos;événement
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}