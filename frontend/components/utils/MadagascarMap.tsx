"use client";

import { useEffect, useState, useMemo } from "react";
import { geoIdentity, geoPath } from "d3-geo";

export default function MadagascarMap() {
  const [geoData, setGeoData] = useState<any>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/madagascar.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Erreur chargement:", err));
  }, []);

  const { pathGenerator } = useMemo(() => {
    if (!geoData) return { pathGenerator: null };

    // geoIdentity au lieu de geoMercator :
    // On traite les coordonnées comme des points X/Y simples.
    const projection = geoIdentity()
      .reflectY(true) // Les latitudes sont inversées par rapport aux pixels Y
      .fitSize([600, 800], geoData);

    return { pathGenerator: geoPath(projection) };
  }, [geoData]);

  if (!geoData) return <div>Chargement...</div>;

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        {hoveredName || "Carte de Madagascar"}
      </h2>

      <svg
        viewBox="0 0 600 800"
        style={{
          width: "100%",
          height: "auto",
          background: "#f0f0f0",
          border: "1px solid #ccc",
        }}
      >
        {geoData.features.map((f: any, i: number) => (
          <path
            key={i}
            d={pathGenerator?.(f) || ""}
            // ASTUCE : On utilise "evenodd" pour ignorer les erreurs de sens des points
            fillRule="evenodd"
            fill={
              hoveredName === f.properties.shapeName ? "#3b82f6" : "#ffffff"
            }
            stroke="#000"
            strokeWidth="0.5"
            onMouseEnter={() => setHoveredName(f.properties.shapeName)}
            onMouseLeave={() => setHoveredName(null)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </svg>
    </div>
  );
}
