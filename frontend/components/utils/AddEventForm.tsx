"use client";

import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CAT } from "@/components/utils/CardEvent";
import { FormRadioGroup } from "@/components/utils/FormRadioGroup";
import { FormInput } from "@/components/utils/FormInput";
import { FormTextArea } from "./FormTextarea";
import { Star, Trash2, Upload } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import MadagascarLeaflet from "@/components/maps/MadagascarLeaflet";
import { MAX_SIZE } from "@/lib/photos";
import Button3DV2 from "./Button3DV2";
import { api } from "@/lib/api";
import { toast } from "sonner";

const CATEGORIES = [
  {
    value: "event",
    label: "Evénement",
    date: true,
  },
  {
    value: "divers",
    label: "Divers",
    date: false,
  },
];

type Photo = {
  id: string;
  file: File;
  url: string;
  order: number;
};

const eventSchema = z.object({
  type: z.string(),
  title: z.string().min(2, "Titre requis"),
  description: z.string().min(5, "Description requise"),
  date: z.string(),
  location: z.object({ lat: z.string(), lng: z.string() }),
});

type EventFormValues = z.infer<typeof eventSchema>;

function SortablePhoto({
  photo,
  onDelete,
  isCover,
}: {
  photo: Photo;
  onDelete: (id: string) => void;
  isCover: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative overflow-hidden rounded-xl border bg-muted"
      {...attributes}
      {...listeners}
    >
      {/* image */}
      <img src={photo.url} className="h-28 w-full object-cover" alt="" />

      {/* COVER badge */}
      {isCover && (
        <div className="absolute top-2 left-2 flex items-center gap-1 rounded-sm bg-primary px-2 py-1 text-xs text-white">
          <Star size={12} /> Cover
        </div>
      )}

      {/* ACTIONS */}
      <button
        onClick={() => onDelete(photo.id)}
        className="absolute top-2 right-2 cursor-pointer rounded-full bg-red-500 p-2 text-white opacity-0 transition group-hover:opacity-100"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────
export default function AddEventForm({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState(CATEGORIES[0].value);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      type: "event",
      title: "",
      description: "",
      date: "",
      location: {
        lat: "",
        lng: "",
      },
    },
  });

  const handleFiles = (files: FileList | null) => {
    if (!files) {
      return;
    }

    setPhotos((prev) => {
      const startIndex = prev.length;

      const newPhotos: Photo[] = Array.from(files)
        .filter((file) => file.size <= MAX_SIZE)
        .map((file, index) => ({
          id: crypto.randomUUID(),
          file,
          url: URL.createObjectURL(file),
          order: startIndex + index,
        }));

      return [...prev, ...newPhotos];
    });
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setPhotos((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      return newItems.map((item, index) => ({
        ...item,
        order: index,
      }));
    });
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const onSubmit = async (values: EventFormValues) => {
    if (values.type === "event" && !values.date) {
      setError("date", { message: "Date requise" });
      return;
    }

    if (values.type === "event" && (!location?.lat || !location.lng)) {
      setLocationError("Localisation requise");
      return;
    }

    if (photos.length === 0 || !type || !location?.lat || !location.lng) {
      return;
    }

    const formData = new FormData();

    formData.append("type", values.type);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("date", values.date);
    formData.append("location[lat]", (location?.lat).toString());
    formData.append("location[lng]", (location?.lng).toString());

    const sortedPhotos = [...photos].sort((a, b) => a.order - b.order);
    sortedPhotos.forEach((photo) => {
      if (photo.file instanceof File) {
        formData.append("images[]", photo.file);
      }
    });

    try {
      await api.get("/sanctum/csrf-cookie");

      const res = await api.post("/api/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201 || res.status === 200) {
      }

      toast.success("Evénement créé !");
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        toast.error("Echec de création :", error.response.data.errors);
      } else {
        toast.error("Une erreur inattendue est survenue.");
      }
    } finally {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-[560px] ring-0 rounded-2xl bg-white p-0 gap-0 overflow-hidden">
        {/* ── Header ── */}
        <CardHeader className="px-6 py-5 pb-4 flex flex-row items-center justify-between gap-4 bg-white">
          <div className="flex flex-col gap-2">
            <div>
              <span
                className={`
                inline-flex items-center gap-1.5 px-2 py-[3px]
                rounded-full border text-[10px] font-bold tracking-widest
                ${CAT["actu"].className}
              `}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${CAT["actu"].dot}`}
                />
                Actualité
              </span>
            </div>

            <h2 className="text-[18px] font-bold tracking-tight text-gray-900">
              Actualité / divers
            </h2>
          </div>
        </CardHeader>

        <Separator />

        {/* ── Body ── */}
        <CardContent className="px-6 py-5 flex flex-col gap-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Catégorie */}

          <FormRadioGroup
            label="Type"
            name="type"
            options={CATEGORIES}
            value={type}
            onValueChange={(val) => setType(val)}
            error={errors.type?.message}
            className="grid-cols-2"
          />

          <FormInput
            label={"Titre*"}
            type="text"
            placeholder="Titre de l'annonce"
            required
            {...register("title")}
          />

          <FormTextArea
            label={"Description*"}
            placeholder="Description..."
            className="min-h-20"
            {...register("description")}
          />

          {/* Date + Niveau */}
          {type === "event" && (
            <FormInput
              label={"Date*"}
              type="date"
              required
              {...register("date")}
            />
          )}

          {/* Upload image */}

          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="file"
                className={cn(
                  "font-body text-xs font-semibold tracking-wide text-muted-foreground uppercase",
                )}
              >
                Photos
              </FieldLabel>
              <label
                htmlFor="file"
                className={cn(
                  "mt-1.5 cursor-pointer rounded-xl border-2 border-dashed border-border p-6 text-center transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50",
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFiles(e.dataTransfer.files);
                }}
              >
                <Upload className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
                <p className="font-body text-sm text-muted-foreground">
                  Glissez vos photos ici ou{" "}
                  <span className="font-semibold text-primary">parcourir</span>
                </p>
                <p className="font-body mt-1 text-xs text-muted-foreground">
                  PNG, JPG, WEBP jusqu'à 10 Mo
                </p>
                <input
                  id="file"
                  type="file"
                  multiple
                  accept=".png,.jpg,.webp"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
            </Field>

            {/* GRID */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={photos.map((p) => p.id)}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-2 gap-2">
                  {photos.map((photo, index) => (
                    <SortablePhoto
                      key={photo.id}
                      photo={photo}
                      isCover={index === 0}
                      onDelete={removePhoto}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </FieldGroup>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="date"
              className="font-body text-xs font-semibold tracking-wide text-muted-foreground uppercase"
            >
              Localisation
            </Label>

            <div className="rounded-xl overflow-hidden">
              <MadagascarLeaflet
                onChange={(lat, lng) => setLocation({ lat, lng })}
              />
            </div>

            {locationError && (
              <FieldError className="text-red-500 text-xs font-semibold">
                {locationError}
              </FieldError>
            )}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              type="reset"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-10 rounded-full text-[13px] font-medium border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Annuler
            </Button>

            <Button3DV2
              type="submit"
              label={"Publier l'événement"}
              fullWidth
              breakpoints={[{ tw: "sm", width: 80, height: 42, fontSize: 12 }]}
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
