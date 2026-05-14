import Logo from "@/components/utils/Logo";
import React from "react";
import MadagascarMap from "@/components/maps/MadagascarMap";
import CardEvent from "@/components/utils/CardEvent";
import Button3DV2 from "@/components/utils/Button3DV2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddEventForm from "@/components/utils/AddEventForm";

export default function HomePage() {
  return (
    <div className="p-8">
      <Logo />
      <div className="relative flex gap-8 p-8 h-dvh">
        <div className="flex-1">
          <MadagascarMap />
        </div>
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold">Actualités</h1>
          </div>

          <Dialog open={true}>
            <DialogTrigger asChild>
              <Button3DV2 label={"Publier"} />
            </DialogTrigger>
            <DialogContent className="p-0 border-0 ring-0">
              <AddEventForm />
            </DialogContent>
          </Dialog>

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
