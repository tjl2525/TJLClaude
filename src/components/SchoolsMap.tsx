"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import type { School } from "@/data/schoolsData";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue in Next.js
import L from "leaflet";
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "",
  iconUrl: "",
  shadowUrl: "",
});

const MAP_DIV_COLORS: Record<string, string> = {
  "Power 4": "#1e3a5f",
  "Group of 5": "#14532d",
  FCS: "#c2410c",
  D2: "#6b7280",
  D3: "#6b7280",
  NAIA: "#6b7280",
  JUCO: "#6b7280",
};

const VISITED_COLOR = "#16a34a";

const LEGEND_ITEMS = [
  { label: "Power 4", color: "#1e3a5f" },
  { label: "Group of 5", color: "#14532d" },
  { label: "FCS", color: "#c2410c" },
  { label: "D2/D3/NAIA/JUCO", color: "#6b7280" },
  { label: "Visited", color: VISITED_COLOR },
];

function Legend() {
  const map = useMap();

  useEffect(() => {
    const legend = new L.Control({ position: "bottomright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div");
      div.style.background = "white";
      div.style.padding = "8px 12px";
      div.style.borderRadius = "8px";
      div.style.boxShadow = "0 1px 4px rgba(0,0,0,0.2)";
      div.style.fontSize = "12px";
      div.style.lineHeight = "1.8";
      div.innerHTML = LEGEND_ITEMS.map(
        (item) =>
          `<div style="display:flex;align-items:center;gap:6px">` +
          `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${item.color};border:${item.label === "Visited" ? "2px solid #15803d" : "none"}"></span>` +
          `<span>${item.label}</span></div>`
      ).join("");
      return div;
    };
    legend.addTo(map);
    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}

interface SchoolsMapProps {
  schools: School[];
  visited: number[];
  visibleDivisions: Set<string>;
  onToggleVisited: (id: number) => void;
}

export default function SchoolsMap({
  schools,
  visited,
  visibleDivisions,
  onToggleVisited,
}: SchoolsMapProps) {
  const filteredSchools = schools.filter((s) => visibleDivisions.has(s.div));

  return (
    <MapContainer
      center={[39.5, -98.35]}
      zoom={4}
      style={{ height: "600px", width: "100%", borderRadius: "12px" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Legend />
      {filteredSchools.map((school) => {
        const isVisited = visited.includes(school.id);
        const baseColor = MAP_DIV_COLORS[school.div] || "#6b7280";
        const fillColor = isVisited ? VISITED_COLOR : baseColor;

        return (
          <CircleMarker
            key={school.id}
            center={[school.lat, school.lng]}
            radius={isVisited ? 8 : 6}
            pathOptions={{
              color: isVisited ? "#15803d" : baseColor,
              fillColor,
              fillOpacity: isVisited ? 0.9 : 0.75,
              weight: isVisited ? 2.5 : 1.5,
            }}
          >
            <Popup>
              <div style={{ minWidth: "180px", fontFamily: "system-ui" }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "4px",
                  }}
                >
                  {isVisited ? "\u2705 " : ""}
                  {school.name}
                </div>
                <div style={{ fontSize: "12px", color: "#555", lineHeight: "1.6" }}>
                  <div>
                    <strong>Conference:</strong> {school.conf}
                  </div>
                  <div>
                    <strong>Division:</strong> {school.div}
                  </div>
                  <div>
                    <strong>Location:</strong> {school.city}, {school.state}
                  </div>
                  <div>
                    <strong>Stadium:</strong> {school.stadium}
                  </div>
                  {school.capacity > 0 && (
                    <div>
                      <strong>Capacity:</strong>{" "}
                      {school.capacity.toLocaleString()}
                    </div>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisited(school.id);
                  }}
                  style={{
                    marginTop: "8px",
                    width: "100%",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "white",
                    background: isVisited ? "#dc2626" : "#16a34a",
                  }}
                >
                  {isVisited ? "Unmark Visited" : "\u2713 Mark Visited"}
                </button>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
