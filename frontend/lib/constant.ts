// ============================================================
// CARTE.MG — Central data & configuration
// Edit this file to update content across the entire site
// ============================================================

export const SITE_CONFIG = {
  name: "Carte",
  domain: ".mg",
  version: "v1.0.0",
  status: "Opérationnel",
  tagline: "Plateforme civique pour Madagascar",
  description:
    "Carte est la plateforme cartographique citoyenne du projet Smart City : actualités, infrastructures, urgences et déchets, géolocalisés sur les 6 provinces.",
  mapAppUrl: "Smart City Madagascar.html",
};

// ---------- STATS (Hero) ----------
export const HERO_STATS = [
  { value: "1 248", label: "Signalements" },
  { value: "6 / 6", label: "Provinces couvertes" },
  { value: "~4 min", label: "Délai moyen de prise en compte" },
];

// ---------- FLOATING EVENTS (Hero) ----------
export const FLOATING_EVENTS = [
  {
    id: "fc1",
    title: "Inondation Mahavatse II",
    meta: "Toliara · il y a 8 min",
    tag: "Urgence",
    color: "urg",
  },
  {
    id: "fc2",
    title: "Collecte exceptionnelle",
    meta: "Toamasina · 2 h",
    tag: "Déchets",
    color: "waste",
  },
  {
    id: "fc3",
    title: "RN4 — déviation 4 km",
    meta: "Mahajanga · ce matin",
    tag: "Infrastructure",
    color: "infra",
  },
];

// ---------- CATEGORIES ----------
export const CATEGORIES = [
  {
    id: "news",
    dot: "bg-cat-news",
    label: "Actualité",
    title: "Actualités & vie de la cité",
    description:
      "Festivals, conseils municipaux, ouvertures, manifestations culturelles ou sportives. Tout ce qui anime la province.",
    code: "CODE · BLEU",
    count: 312,
    color: "news",
  },
  {
    id: "infra",
    dot: "bg-cat-infra",
    label: "Infrastructure",
    title: "Travaux & réseaux",
    description:
      "Voirie, eau, électricité, ponts, télécoms. Les chantiers en cours, les coupures planifiées, les déviations.",
    code: "CODE · JAUNE",
    count: 486,
    color: "infra",
  },
  {
    id: "urg",
    dot: "bg-cat-urg",
    label: "Urgence",
    title: "Incidents & accidents",
    description:
      "Sinistres, accidents de la route, inondations, sécurité. Remontés en priorité aux services concernés.",
    code: "CODE · ROUGE",
    count: 154,
    color: "urg",
  },
  {
    id: "waste",
    dot: "bg-cat-waste",
    label: "Déchets",
    title: "Propreté urbaine",
    description:
      "Collecte, tri sélectif, points d'apport volontaire, dépôts sauvages. Pour une ville plus propre.",
    code: "CODE · VIOLET",
    count: 296,
    color: "waste",
  },
];

// ---------- HOW IT WORKS ----------
export const STEPS = [
  {
    num: "1",
    title: "Signaler en un clic",
    description:
      "Choisissez la catégorie, posez un point sur la carte ou laissez la géolocalisation s'en charger. Une photo, un titre, c'est parti.",
    icon: "pin",
  },
  {
    num: "2",
    title: "Voir s'afficher en temps réel",
    description:
      "Le marqueur apparaît immédiatement sur la carte des 6 provinces, visible par tout le monde, modérable par les services publics.",
    icon: "globe",
  },
  {
    num: "3",
    title: "Suivre la résolution",
    description:
      "Statut, intervenants, délais, photos après intervention. Chaque signalement raconte son histoire complète jusqu'à clôture.",
    icon: "chart",
  },
];

// ---------- PROVINCES ----------
export const PROVINCES = [
  { name: "Antsiranana", sub: "N°1 · Nord", count: 142, color: "#f3ead9" },
  { name: "Mahajanga", sub: "N°2 · Nord-Ouest", count: 203, color: "#ebe3d1" },
  { name: "Toamasina", sub: "N°3 · Est", count: 231, color: "#e6dec9" },
  { name: "Antananarivo", sub: "N°4 · Capitale", count: 412, color: "#ddd4be" },
  { name: "Fianarantsoa", sub: "N°5 · Centre-Sud", count: 156, color: "#e3dac4" },
  { name: "Toliara", sub: "N°6 · Sud-Ouest", count: 104, color: "#efe6d2" },
];

// ---------- FEATURES ----------
export const FEATURES = [
  {
    icon: "globe",
    title: "Carte interactive",
    description:
      "Zoom, filtres par catégorie, popup au survol, recherche plein-texte sur les 6 provinces.",
  },
  {
    icon: "form",
    title: "Formulaires d'ajout",
    description:
      "Catégorie, lieu, photo, niveau de gravité. Conçus pour être remplis sur mobile en moins d'une minute.",
  },
  {
    icon: "chart",
    title: "Tableaux de bord",
    description:
      "Volume, délais de résolution, hotspots par province. Données ouvertes pour les services techniques.",
  },
  {
    icon: "chat",
    title: "Notifications",
    description:
      "Alertes SMS et push pour les urgences dans votre fokontany. Désabonnement en un clic.",
  },
  {
    icon: "pin",
    title: "Modération par les communes",
    description:
      "Un compte par fokontany. Validation, fusion de doublons, statuts d'avancement publics.",
  },
  {
    icon: "api",
    title: "Export & API",
    description:
      "CSV, GeoJSON, API publique. Les données civiques appartiennent aux citoyens et aux institutions.",
  },
];

// ---------- TESTIMONIAL ----------
export const TESTIMONIAL = {
  quote:
    "Une seule carte partagée pour intervenir plus vite.",
  highlight: "intervenir",
  author: "Rivo Rakotomalala",
  role: "Adjoint au maire · Fokontany Analakely, Antananarivo",
  initials: "RR",
};

// ---------- CTA ROLES ----------
export const CTA_ROLES = [
  { color: "news", label: "Citoyen", desc: "signaler, suivre, recevoir" },
  { color: "infra", label: "Commune", desc: "modérer, intervenir, communiquer" },
  { color: "urg", label: "Secours", desc: "priorité aux urgences géolocalisées" },
  { color: "waste", label: "Régies", desc: "collecte, propreté, tri sélectif" },
];

// ---------- NAV LINKS ----------
export const NAV_LINKS = [
  { href: "#cats", label: "Catégories" },
  { href: "#how", label: "Comment ça marche" },
  { href: "#temoin", label: "temoinage" },
  { href: "#func", label: "Fonctionnalités" },
];

// ---------- FOOTER LINKS ----------
export const FOOTER_LINKS = [
  {
    title: "Produit",
    links: [
      { href: "/carte", label: "Carte" },
      { href: "#cats", label: "Catégories" },
      { href: "#feat", label: "Fonctionnalités" },
      { href: "/dashboard", label: "Tableau de bord" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/api", label: "API publique" },
      { href: "/data", label: "Données ouvertes" },
      { href: "/guide", label: "Guide commune" },
    ],
  },
  {
    title: "Projet",
    links: [
      { href: "/about", label: "À propos" },
      { href: "/partners", label: "Partenaires" },
      { href: "/press", label: "Presse" },
      { href: "/contact", label: "Contact" },
    ],
  },
];