"use client";

import { useEffect, useState, useMemo } from "react";
import { geoIdentity, geoPath } from "d3-geo";
import { CATEGORIES, TEST_DATA } from "@/lib/constants";

export default function Dashboard() {
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedID, setSelectedID] = useState<string | null>(null);

  // État pour le popup au survol
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);

  useEffect(() => {
    fetch("/data/madagascar.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  const { projection, globalPath } = useMemo(() => {
    if (!geoData) return { projection: null, globalPath: null };
    const proj = geoIdentity().reflectY(true).fitSize([400, 500], geoData);
    return { projection: proj, globalPath: geoPath(proj) };
  }, [geoData]);

  if (!geoData || !globalPath || !projection) return <div>Chargement...</div>;

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* TOOLTIP FLOOTTANT */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y - 40,
            left: tooltip.x + 10,
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {tooltip.content}
        </div>
      )}

      {/* CARTE GLOBALE */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          borderRadius: 12,
          border: "1px solid #eee",
        }}
      >
        <svg viewBox="0 0 400 500" style={{ width: "100%" }}>
          {/* Dessin des régions */}
          {geoData.features.map((f: any) => (
            <path
              key={f.properties.shapeID}
              d={globalPath(f) || ""}
              fillRule="evenodd"
              fill={selectedID === f.properties.shapeID ? "#dbeafe" : "#f1f5f9"}
              stroke="#cbd5e1"
              onClick={() => setSelectedID(f.properties.shapeID)}
              onMouseEnter={() =>
                setTooltip((prev) =>
                  prev ? { ...prev, content: f.properties.shapeName } : null,
                )
              }
              onMouseMove={(e) =>
                setTooltip({
                  x: e.clientX,
                  y: e.clientY,
                  content: f.properties.shapeName,
                })
              }
              onMouseLeave={() => setTooltip(null)}
              style={{ cursor: "pointer", transition: "fill 0.2s" }}
            />
          ))}

          {/* Dessin des points par catégorie */}
          {TEST_DATA.map((pt) => {
            const coords = projection([pt.lng, pt.lat]);
            if (!coords) return null;
            const [x, y] = coords;
            const color =
              CATEGORIES[pt.cat as keyof typeof CATEGORIES]?.color || "#000";

            return (
              <g
                key={pt.id}
                onMouseEnter={(e) =>
                  setTooltip({ x: e.clientX, y: e.clientY, content: pt.title })
                }
                onMouseMove={(e) =>
                  setTooltip({ x: e.clientX, y: e.clientY, content: pt.title })
                }
                onMouseLeave={() => setTooltip(null)}
                style={{ cursor: "pointer" }}
              >
                {/* 1. L'ANIMATION (Plus petite et plus discrète) */}
                <circle
                  cx={x}
                  cy={y}
                  r="4" // Réduit de 6 à 4
                  fill={color}
                  className="animate-ping"
                  style={{ pointerEvents: "none" }}
                />

                {/* 2. LE MARQUEUR PIN (Scale réduit à 0.5 pour plus de finesse) */}
                {/* On ajuste le translate : x-6 (car 12*0.5) et y-11.5 pour la pointe */}
                <g transform={`translate(${x - 6}, ${y - 12}) scale(0.5)`}>
                  <path
                    d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                    fill={color}
                    stroke="#fff"
                    strokeWidth="1.5" // Un peu plus épais pour rester visible malgré la petite taille
                  />
                </g>

                {/* 3. POINT CENTRAL (Optionnel - à retirer si tu veux encore plus épuré) */}
                <circle
                  cx={x}
                  cy={y - 8.5} // Ajusté pour le scale 0.5
                  r="1.2"
                  fill="#fff"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
