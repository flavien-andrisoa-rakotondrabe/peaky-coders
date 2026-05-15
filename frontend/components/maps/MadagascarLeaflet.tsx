"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

const MADAGASCAR_BOUNDS: L.LatLngBoundsExpression = [
  [-26.5, 43], // sud-ouest
  [-11.5, 50], // nord-est
];

const MADAGASCAR_CENTER: L.LatLngExpression = [-18.8792, 47.5079];

function LocationMarker({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      onSelect(lat, lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MadagascarLeaflet({
  onChange,
}: {
  onChange: (lat: number, lng: number) => void;
}) {
  return (
    <MapContainer
      center={MADAGASCAR_CENTER}
      zoom={6}
      minZoom={5}
      maxZoom={10}
      maxBounds={MADAGASCAR_BOUNDS}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker onSelect={onChange} />
    </MapContainer>
  );
}
