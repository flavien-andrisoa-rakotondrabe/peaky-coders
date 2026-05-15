"use client";

import { useEffect } from "react";
import L from "leaflet";

export default function LeafletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    });
  }, []);

  return <>{children}</>;
}
