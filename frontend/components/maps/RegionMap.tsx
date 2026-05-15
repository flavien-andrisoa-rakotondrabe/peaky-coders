"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { geoIdentity, geoPath } from "d3-geo";
import { CATEGORIES, TEST_DATA } from "@/lib/constants";

export default function RegionMap({ id }: { id: string }) {
  const router = useRouter();

  const [geoData, setGeoData] = useState<any>(null);
  const [hoverPoint, setHoverPoint] = useState<string | null>(null);

  const [size, setSize] = useState({
    width: 500,
    height: 500,
  });

  // 📦 load GeoJSON
  useEffect(() => {
    fetch("/data/madagascar.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  // 📐 responsive simple (sans ResizeObserver ici pour garder clean)
  useEffect(() => {
    const update = () => {
      setSize({
        width: window.innerWidth * 0.6,
        height: window.innerHeight * 0.7,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // 🎯 region sélectionnée
  const regionFeature = useMemo(() => {
    if (!geoData || !id) return null;

    return geoData.features.find((f: any) => f.properties.shapeID === id);
  }, [geoData, id]);

  // 🗺️ projection centrée sur la région
  const { projection, pathGen } = useMemo(() => {
    if (!regionFeature) return { projection: null, pathGen: null };

    const proj = geoIdentity()
      .reflectY(true)
      .fitSize([size.width, size.height], regionFeature);

    return {
      projection: proj,
      pathGen: geoPath(proj),
    };
  }, [regionFeature, size]);

  // 📍 points filtrés région
  const localPoints = useMemo(() => {
    if (!regionFeature) return [];

    return TEST_DATA.filter(
      (p) => p.region === regionFeature.properties.shapeName,
    );
  }, [regionFeature]);

  // ⏳ loading
  if (!geoData || !regionFeature || !projection || !pathGen) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Chargement de la région...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-6">
      {/* HEADER */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">
          {regionFeature.properties.shapeName}
        </h1>
      </div>

      {/* MAP */}
      <div className="w-full max-w-4xl h-dvh bg-gray-50">
        <svg
          viewBox={`0 0 ${size.width} ${size.height}`}
          width="100%"
          height="auto"
        >
          {/* REGION */}
          <path
            d={pathGen(regionFeature) || ""}
            fill="#f8fafc"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* POINTS */}
          {localPoints.map((pt) => {
            const coords = projection([pt.lng, pt.lat]);
            if (!coords) return null;

            const [x, y] = coords;

            const color =
              CATEGORIES[pt.cat as keyof typeof CATEGORIES]?.color || "#000";

            return (
              <g
                key={pt.id}
                onMouseEnter={() => setHoverPoint(pt.title)}
                onMouseLeave={() => setHoverPoint(null)}
                style={{ cursor: "pointer" }}
              >
                {/* pulse */}
                <circle cx={x} cy={y} r={10} fill={color} opacity={0.2} />

                {/* marker */}
                <circle cx={x} cy={y} r={5} fill={color} />

                {/* tooltip */}
                {hoverPoint === pt.title && (
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#111"
                  >
                    {pt.title}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
