export interface EventsInterface {
  value: "actu" | "signal";
  label: string;
}

export const EVENTS_TYPE: {} = [
  {
    value: "actu",
    label: "Actualité / Divers",
    category: false,
    title: true,
    description: true,
    location: true,
    date: true,
  },
  {
    value: "signal",
    label: "Signaler / Avertir",
    category: true,
    title: true,
    description: true,
    location: true,
    date: true,
  },
];
