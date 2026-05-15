"use client";

import Logo from "@/components/utils/Logo";
import { useState } from "react";
import CardEvent from "@/components/utils/CardEvent";
import Button3DV2 from "@/components/utils/Button3DV2";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RegionMap from "@/components/maps/RegionMap";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SignalForm from "@/components/utils/SignalForm";

const FILTERS = [
  { value: "actu", label: "Evénements", className: "bg-blue-500" },
  { value: "infra", label: "Infrastructure", className: "bg-yellow-500" },
  { value: "dechet", label: "Déchets", className: "bg-purple-500" },
  { value: "urgence", label: "Informations", className: "bg-red-500" },
];

export default function RegionPage() {
  const params = useParams();

  const [filter, setFilter] = useState(FILTERS[0].value);
  const [open, setOpen] = useState(false);

  if (params.id)
    return (
      <div className="p-8">
        <Logo />
        <div className="relative flex gap-8 p-8 h-dvh">
          <div className="flex-1">
            <RegionMap id={params.id} />
          </div>
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {FILTERS.map((item) => (
                  <Badge
                    key={`badge-${item.value}`}
                    variant={"outline"}
                    className={cn(
                      "cursor-pointer select-none",
                      filter === item.value && item.className,
                      filter === item.value && "",
                    )}
                    onClick={() => setFilter(item.value)}
                  >
                    {item.label}
                  </Badge>
                ))}
              </div>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button3DV2 label={"Signaler"} />
                </DialogTrigger>
                <DialogContent className="p-0 border-0 ring-0">
                  <DialogTitle className="hidden" />
                  <SignalForm onClose={() => setOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
              <CardEvent />
            </div>
          </div>
        </div>
      </div>
    );
}
