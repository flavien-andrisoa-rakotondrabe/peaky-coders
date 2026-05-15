"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { geoIdentity, geoPath } from "d3-geo";
import { CATEGORIES } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function RegionMap({ id }: { id: string }) {
  const router = useRouter();
  const { events } = useSelector((state: RootState) => state.event);

  const [geoData, setGeoData] = useState<any>(null);
  const [hoveredEvent, setHoveredEvent] = useState<any | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [size, setSize] = useState({
    width: 500,
    height: 500,
  });

  // 📦 GeoJSON load
  useEffect(() => {
    fetch("/data/madagascar.geojson")
      .then((res) => res.json())
      .then(setGeoData);
  }, []);

  // 📐 responsive
  useEffect(() => {
    const update = () => {
      setSize({
        width: window.innerWidth * 0.65,
        height: window.innerHeight * 0.75,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // 🎯 region feature
  const regionFeature = useMemo(() => {
    if (!geoData) return null;

    return geoData.features.find((f: any) => f.properties.shapeID === id);
  }, [geoData, id]);

  // 🗺️ projection engine
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

  // 📍 FILTER EVENTS (region + category)
  const localEvents = useMemo(() => {
    if (!regionFeature) return [];

    return events.filter((e) => {
      const inRegion = e.region === regionFeature.properties.shapeName;

      const matchCategory =
        selectedCategory === "all" || e.cat === selectedCategory;

      return inRegion && matchCategory;
    });
  }, [events, regionFeature, selectedCategory]);

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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/home"
            className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </Link>

          <h1 className="text-2xl font-bold text-blue-600">
            {regionFeature.properties.shapeName}
          </h1>
        </div>
      </div>

      {/* MAP */}
      <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden">
        <svg
          viewBox={`0 0 ${size.width} ${size.height}`}
          width="100%"
          height="100%"
        >
          {/* REGION */}
          <path
            d={pathGen(regionFeature) || ""}
            fill="#f8fafc"
            stroke="#3b82f6"
            strokeWidth={2}
          />

          {/* EVENTS MARKERS */}
          {localEvents.map((e) => {
            const coords = projection([e.lng, e.lat]);
            if (!coords) return null;

            const [x, y] = coords;

            const color =
              CATEGORIES[e.cat as keyof typeof CATEGORIES]?.color || "#000";

            return (
              <g
                key={e.id}
                onMouseEnter={() => setHoveredEvent(e)}
                onMouseLeave={() => setHoveredEvent(null)}
                style={{ cursor: "pointer" }}
              >
                {/* pulse */}
                <circle cx={x} cy={y} r={10} fill={color} opacity={0.2} />

                {/* PIN (Google Maps style) */}
                <g transform={`translate(${x - 10}, ${y - 20})`}>
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
                    fill={color}
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                </g>

                {/* center dot */}
                <circle cx={x} cy={y} r={2} fill="#fff" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* HOVER CARD */}
      {hoveredEvent && (
        <div
          className="fixed z-50 pointer-events-none bg-white shadow-lg border rounded-lg px-3 py-2 text-sm"
          style={{
            left: "50%",
            top: "20%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="font-bold">{hoveredEvent.title}</div>
          <div className="text-gray-500">{hoveredEvent.cat}</div>
        </div>
      )}
    </div>
  );
}
