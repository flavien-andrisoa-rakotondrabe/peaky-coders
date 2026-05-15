"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { geoIdentity, geoPath } from "d3-geo";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CATEGORIES, TEST_DATA } from "@/lib/constants";
import HoverCards from "../utils/HoverCard";

type HoverState = {
  event: any;
  x: number;
  y: number;
} | null;

export default function MadagascarMapEngine() {
  const router = useRouter();
  const { events } = useSelector((state: RootState) => state.event);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const [geoData, setGeoData] = useState<any>(null);
  const [size, setSize] = useState({ width: 400, height: 500 });

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const [hover, setHover] = useState<HoverState>(null);

  // 📏 Resize engine
  useEffect(() => {
    if (!containerRef.current) return;

    const obs = new ResizeObserver(([entry]) => {
      setSize(entry.contentRect);
    });

    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // 📦 Geo data
  useEffect(() => {
    fetch("/data/madagascar.geojson")
      .then((r) => r.json())
      .then(setGeoData);
  }, []);

  // 🗺️ Projection engine
  const { projection, path } = useMemo(() => {
    if (!geoData) return { projection: null, path: null };

    const proj = geoIdentity()
      .reflectY(true)
      .fitSize([size.width, size.height], geoData);

    return {
      projection: proj,
      path: geoPath(proj),
    };
  }, [geoData, size]);

  // 🧠 SVG → SCREEN (engine core)
  const toScreen = useCallback((x: number, y: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };

    const pt = svgRef.current.createSVGPoint();
    pt.x = x;
    pt.y = y;

    const ctm = svgRef.current.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };

    const res = pt.matrixTransform(ctm);

    return { x: res.x, y: res.y };
  }, []);

  // 🧠 hover engine (anti-flicker + intent)
  const openHover = useCallback(
    (event: any, x: number, y: number) => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);

      const screen = toScreen(x, y);

      setHover({
        event,
        x: screen.x,
        y: screen.y,
      });
    },
    [toScreen],
  );

  const closeHover = useCallback(() => {
    hoverTimeout.current = setTimeout(() => {
      setHover(null);
    }, 120);
  }, []);

  if (!geoData || !projection || !path) {
    return <div>Loading map...</div>;
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* 🧾 OVERLAY CARD ENGINE */}
      {hover && (
        <div
          className="fixed z-50"
          style={{
            left: hover.x,
            top: hover.y,
            transform: "translate(-50%, -120%)",
          }}
          onMouseEnter={() => {
            if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
          }}
          onMouseLeave={closeHover}
        >
          <HoverCards item={hover.event} />
        </div>
      )}

      {/* 🗺️ SVG ENGINE */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${size.width} ${size.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* REGIONS LAYER */}
        {geoData.features.map((f: any) => {
          const id = f.properties.shapeID;

          return (
            <path
              key={id}
              d={path(f) || ""}
              fill={
                selectedRegion === id
                  ? "#dbeafe"
                  : hoveredRegion === id
                    ? "#ff42a5"
                    : "#f1f5f9"
              }
              stroke="#cbd5e1"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedRegion(id);
                router.push(`/region/${id}`);
              }}
              onMouseEnter={() => setHoveredRegion(id)}
              onMouseLeave={() => setHoveredRegion(null)}
            />
          );
        })}

        {/* MARKERS LAYER */}
        {TEST_DATA.map((pt) => {
          const coords = projection([pt.lng, pt.lat]);
          if (!coords) return null;

          const [x, y] = coords;

          const color =
            CATEGORIES[pt.cat as keyof typeof CATEGORIES]?.color || "#000";

          return (
            <g
              key={pt.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => openHover(pt, x, y)}
              onMouseLeave={closeHover}
            >
              {/* pulse */}
              <circle
                cx={x}
                cy={y}
                r={5}
                fill={color}
                className="animate-ping"
              />

              {/* pin */}
              <circle cx={x} cy={y} r={6} fill={color} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
