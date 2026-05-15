"use client";

import Logo from "@/components/utils/Logo";
import React, { useEffect, useState } from "react";
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
import { api } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { setEventsReducer } from "@/redux/slices/event.slice";
import { RootState } from "@/redux/store";

export default function HomePage() {
  const { events } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await api.get("/api/news");

      if (res.data) {
        dispatch(setEventsReducer(res.data[0]));
      }
    })();
  }, []);

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

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button3DV2 label={"Publier"} />
              </DialogTrigger>
              <DialogContent className="p-0 border-0 ring-0">
                <AddEventForm onClose={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {events.map((item) => (
              <CardEvent key={`event-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
