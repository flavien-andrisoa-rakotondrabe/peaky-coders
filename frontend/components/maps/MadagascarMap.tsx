"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { geoIdentity, geoPath } from "d3-geo";
import { CATEGORIES, TEST_DATA } from "@/lib/constants";

export default function MadagascarMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [geoData, setGeoData] = useState<any>(null);
  const [selectedID, setSelectedID] = useState<string | null>(null);

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);

  const [size, setSize] = useState({
    width: 400,
    height: 500,
  });

  // 🌍 ResizeObserver → taille dynamique du parent
  useEffect(() => {
    if (!containerRef.current) return;

    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    obs.observe(containerRef.current);

    return () => obs.disconnect();
  }, []);

  // 📦 load GeoJSON
  useEffect(() => {
    fetch("/data/madagascar.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  // 🗺️ projection dynamique (responsive)
  const { projection, globalPath } = useMemo(() => {
    if (!geoData) return { projection: null, globalPath: null };

    const proj = geoIdentity()
      .reflectY(true)
      .fitSize([size.width, size.height], geoData);

    return {
      projection: proj,
      globalPath: geoPath(proj),
    };
  }, [geoData, size]);

  if (!geoData || !globalPath || !projection) {
    return <div>Chargement...</div>;
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* TOOLTIP */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y - 40,
            left: tooltip.x + 10,
            zIndex: 1000,
          }}
          className="text-foreground text-xl uppercase pointer-events-none"
        >
          {tooltip.content}
        </div>
      )}

      {/* SVG RESPONSIVE */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size.width} ${size.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* REGIONS */}
        {geoData.features.map((f: any) => (
          <path
            key={f.properties.shapeID}
            d={globalPath(f) || ""}
            fillRule="evenodd"
            fill={selectedID === f.properties.shapeID ? "#dbeafe" : "#f1f5f9"}
            stroke="#cbd5e1"
            onClick={() => setSelectedID(f.properties.shapeID)}
            onMouseEnter={(e) =>
              setTooltip({
                x: e.clientX,
                y: e.clientY,
                content: f.properties.shapeName,
              })
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

        {/* POINTS */}
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
                setTooltip({
                  x: e.clientX,
                  y: e.clientY,
                  content: pt.title,
                })
              }
              onMouseMove={(e) =>
                setTooltip({
                  x: e.clientX,
                  y: e.clientY,
                  content: pt.title,
                })
              }
              onMouseLeave={() => setTooltip(null)}
              style={{ cursor: "pointer" }}
            >
              {/* animation ping */}
              <circle
                cx={x}
                cy={y}
                r={4}
                fill={color}
                className="animate-ping"
                style={{ pointerEvents: "none" }}
              />

              {/* pin */}
              <g transform={`translate(${x - 6}, ${y - 12}) scale(0.5)`}>
                <path
                  d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                  fill={color}
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              </g>

              {/* center dot */}
              <circle cx={x} cy={y - 8.5} r={1.2} fill="#fff" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
