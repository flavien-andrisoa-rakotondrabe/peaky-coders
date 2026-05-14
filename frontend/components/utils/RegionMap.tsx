"use client";

import { useMemo, useState } from "react";
import { geoIdentity, geoPath } from "d3-geo";
import { CATEGORIES, TEST_DATA } from "@/lib/constants";

export default function RegionMap({ geoData, shapeID }: any) {
  const [hoverPoint, setHoverPoint] = useState<string | null>(null);

  const regionFeature = useMemo(() => {
    if (!geoData || !shapeID) return null;
    return geoData.features.find((f: any) => f.properties.shapeID === shapeID);
  }, [geoData, shapeID]);

  const { projection, pathGen } = useMemo(() => {
    if (!regionFeature) return { projection: null, pathGen: null };
    const proj = geoIdentity()
      .reflectY(true)
      .fitSize([400, 400], regionFeature);
    return { projection: proj, pathGen: geoPath(proj) };
  }, [regionFeature]);

  // Points spécifiques à cette région
  const localPoints = useMemo(() => {
    if (!regionFeature) return [];
    return TEST_DATA.filter(
      (p) => p.region === regionFeature.properties.shapeName,
    );
  }, [regionFeature]);

  if (!regionFeature || !pathGen || !projection) {
    return (
      <div
        style={{
          height: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #ccc",
          borderRadius: 12,
          color: "#999",
        }}
      >
        Sélectionnez une région
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      <h3 style={{ textAlign: "center", color: "#3b82f6" }}>
        {regionFeature.properties.shapeName}
      </h3>

      <svg viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
        <path
          d={pathGen(regionFeature) || ""}
          fillRule="evenodd"
          fill="#f8fafc"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {localPoints.map((pt) => {
          const coords = projection([pt.lng, pt.lat]);
          if (!coords) return null;
          const color =
            CATEGORIES[pt.cat as keyof typeof CATEGORIES]?.color || "#000";

          return (
            <g
              key={pt.id}
              onMouseEnter={() => setHoverPoint(pt.title)}
              onMouseLeave={() => setHoverPoint(null)}
            >
              <circle
                cx={coords[0]}
                cy={coords[1]}
                r="8"
                fill={color}
                className="animate-ping"
                style={{ opacity: 0.4 }}
              />
              <path
                d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                fill={color}
                transform={`translate(${coords[0] - 10}, ${coords[1] - 25}) scale(0.8)`}
                stroke="#fff"
                strokeWidth="1"
              />
              {hoverPoint === pt.title && (
                <text
                  x={coords[0]}
                  y={coords[1] - 30}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#333"
                >
                  {pt.title}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
