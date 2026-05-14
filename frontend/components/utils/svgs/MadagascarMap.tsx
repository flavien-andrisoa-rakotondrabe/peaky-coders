"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MadagascarSVG from "@/assets/madagascar.svg";

export default function MadagascarMap() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;

    const paths = svg.querySelectorAll("path");

    paths.forEach((path) => {
      const id = path.id;

      path.classList.add("map-region");

      // 🎯 CLICK GROUP (support multi highlight logique)
      path.addEventListener("click", () => {
        setActive(id);
        // router.push(`/region/${id.toLowerCase()}`);
      });

      // 🧠 GROUP hover logic (multi zones possibles)
      path.addEventListener("mouseenter", () => {
        const group = path.getAttribute("data-group");

        paths.forEach((p) => {
          if (p.id === id || p.getAttribute("data-group") === group) {
            console.log("p:", p.id);

            p.classList.add("hover-linked");
          }
        });
      });

      path.addEventListener("mouseleave", () => {
        paths.forEach((p) => {
          p.classList.remove("hover-linked");
        });
      });
    });
  }, []);

  return (
    <div ref={ref} className="w-full h-screen">
      <MadagascarSVG />
    </div>
  );
}
