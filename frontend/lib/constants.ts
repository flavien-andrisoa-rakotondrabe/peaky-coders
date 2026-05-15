export const CATEGORIES = {
  URGENT: { color: "#ef4444", label: "Urgent", icon: "🚨" },
  INFRA: { color: "#eab308", label: "Infra", icon: "🏗️" },
  SANTE: { color: "#a855f7", label: "Santé", icon: "🏥" },
  EVENT: { color: "#a855f7", label: "Event", icon: "✨" },
};

export const TEST_DATA = [
  {
    id: 1,
    cat: "URGENT",
    lat: -18.879,
    lng: 47.508,
    title: "Alerte Eau",
    region: "Analamanga",
  },
  {
    id: 2,
    cat: "INFRA",
    lat: -12.278,
    lng: 49.291,
    title: "Nouveau Pont",
    region: "Diana",
  },
  {
    id: 3,
    cat: "SANTE",
    lat: -23.355,
    lng: 43.667,
    title: "Hôpital Mobile",
    region: "Atsimo-Andrefana",
  },
  {
    id: 4,
    cat: "EVENT",
    lat: -21.452,
    lng: 47.085,
    title: "Foire Tech",
    region: "Haute Matsiatra",
  },
];
