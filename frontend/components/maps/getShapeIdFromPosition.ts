import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point, polygon } from "@turf/helpers";
import { FeatureCollection, Polygon, MultiPolygon } from "geojson";

export function getShapeIdFromPosition(
  lat: number,
  lng: number,
  geojson: FeatureCollection,
): string | null {
  const pt = point([lng, lat]);

  for (const feature of geojson.features) {
    const geometry = feature.geometry;

    if (!geometry) continue;

    // 👉 handle Polygon
    if (geometry.type === "Polygon") {
      const poly = polygon(geometry.coordinates);

      if (booleanPointInPolygon(pt, poly)) {
        return feature.properties?.shapeId ?? null;
      }
    }

    // 👉 handle MultiPolygon
    if (geometry.type === "MultiPolygon") {
      const poly = polygon(geometry.coordinates[0]); // ou loop si besoin

      if (booleanPointInPolygon(pt, poly)) {
        return feature.properties?.shapeId ?? null;
      }
    }
  }

  return null;
}
