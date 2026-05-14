// components/ui/MadagascarMap.tsx
// ──────────────────────────────────────────────────────────
// Carte SVG de Madagascar réutilisable
// Props: showPins (boolean), size (small | large), animated
// ──────────────────────────────────────────────────────────

import { cn } from "@/lib/utils";

const PROVINCE_COLORS = {
  ants: "#f3ead9",
  maha: "#ebe3d1",
  toam: "#e6dec9",
  anta: "#ddd4be",
  fian: "#e3dac4",
  toli: "#efe6d2",
};

const MAP_PINS = [
  { cx: 215, cy: 95, color: "var(--c-news, #3b7fff)", delay: "0s" },
  { cx: 150, cy: 250, color: "var(--c-infra, #d97706)", delay: "-0.5s" },
  { cx: 180, cy: 330, color: "var(--c-urg, #dc2626)", delay: "-1s" },
  { cx: 275, cy: 370, color: "var(--c-waste, #7c3aed)", delay: "-1.2s" },
  { cx: 175, cy: 440, color: "var(--c-news, #3b7fff)", delay: "-0.8s" },
  { cx: 210, cy: 585, color: "var(--c-infra, #d97706)", delay: "-1.6s" },
  { cx: 215, cy: 705, color: "var(--c-urg, #dc2626)", delay: "-2s" },
];

// The Madagascar island outline path
const OUTLINE =
  "M 200 30 L 260 90 L 290 200 L 315 320 L 310 450 L 280 580 L 235 700 L 200 760 L 165 720 L 130 600 L 95 470 L 95 340 L 115 220 L 165 100 Z";

interface MadagascarMapProps {
  showPins?: boolean;
  showLabels?: boolean;
  animated?: boolean;
  className?: string;
}

export default function MadagascarMap({
  showPins = true,
  showLabels = false,
  animated = true,
  className,
}: MadagascarMapProps) {
  const clipId = `map-clip-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <svg
      viewBox="0 0 400 800"
      preserveAspectRatio="xMidYMid meet"
      className={cn("w-full h-full", className)}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={OUTLINE} />
        </clipPath>

        {/* Orange glow filter for pins */}
        <filter id="pin-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Province fills */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="40" y="0" width="320" height="180" fill={PROVINCE_COLORS.ants} />
        <rect x="40" y="180" width="190" height="200" fill={PROVINCE_COLORS.maha} />
        <rect x="230" y="180" width="130" height="330" fill={PROVINCE_COLORS.toam} />
        <rect x="40" y="380" width="190" height="130" fill={PROVINCE_COLORS.anta} />
        <rect x="40" y="510" width="320" height="140" fill={PROVINCE_COLORS.fian} />
        <rect x="40" y="650" width="320" height="160" fill={PROVINCE_COLORS.toli} />

        {/* Province dividers */}
        <g stroke="#a8997a" strokeWidth="0.6" strokeDasharray="3 3" fill="none" opacity="0.55">
          <path d="M40 180 L 360 180" />
          <path d="M230 180 L 230 510" />
          <path d="M40 380 L 230 380" />
          <path d="M40 510 L 360 510" />
          <path d="M40 650 L 360 650" />
        </g>
      </g>

      {/* Outline border */}
      <path
        d={OUTLINE}
        fill="none"
        stroke="#3a2f1c"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Province labels */}
      {showLabels && (
        <g>
          {[
            { x: 220, y: 98, main: "Antsiranana", sub: "N°1 · Nord" },
            { x: 155, y: 280, main: "Mahajanga", sub: "N°2 · Nord-Ouest" },
            { x: 275, y: 335, main: "Toamasina", sub: "N°3 · Est" },
            { x: 155, y: 445, main: "Antananarivo", sub: "N°4 · Capitale" },
            { x: 200, y: 580, main: "Fianarantsoa", sub: "N°5 · Centre-Sud" },
            { x: 200, y: 710, main: "Toliara", sub: "N°6 · Sud-Ouest" },
          ].map((l) => (
            <g key={l.main}>
              <text
                x={l.x}
                y={l.y}
                fontSize="6.5"
                fontWeight="600"
                letterSpacing="0.1em"
                textAnchor="middle"
                fill="#6b5b3a"
                fontFamily="sans-serif"
                style={{ textTransform: "uppercase" }}
              >
                {l.main}
              </text>
              <text
                x={l.x}
                y={l.y + 12}
                fontSize="5"
                textAnchor="middle"
                fill="#8a7855"
                fontFamily="sans-serif"
              >
                {l.sub}
              </text>
            </g>
          ))}
        </g>
      )}

      {/* Pins */}
      {showPins && (
        <g>
          {MAP_PINS.map((pin, i) => (
            <g
              key={i}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: animated
                  ? `beat 2.4s ease-in-out ${pin.delay} infinite`
                  : undefined,
              }}
              transform={`translate(${pin.cx}, ${pin.cy})`}
            >
              <circle r="9" fill="white" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
              <circle r="4.5" fill={pin.color} />
            </g>
          ))}
        </g>
      )}

      {/* beat keyframe injected inline */}
      {animated && (
        <style>{`
          @keyframes beat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
        `}</style>
      )}
    </svg>
  );
}