import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { setupPopupHandler } from "../utils/popup";
import { setupPointerHandler } from "../utils/pointer";
import { onMapLoad } from "../utils/onMapLoad";
import { LegendItem } from "../utils/LegendItem";

const PLATE_LAYER_ID = "plate";

const MapView = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [plateVisible, setPlateVisible] = useState(false);

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: "styles/style.json",
      center: [139.21, 37.18],
      zoom: 1,
      minZoom: 1,
      hash: true,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => onMapLoad(map));

    setupPopupHandler(map);
    setupPointerHandler(map);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (map.getLayer(PLATE_LAYER_ID)) {
      map.setLayoutProperty(
        PLATE_LAYER_ID,
        "visibility",
        plateVisible ? "visible" : "none"
      );
    }
  }, [plateVisible]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          background: "rgba(255,255,255,0.8)",
          padding: "6px 12px",
          borderRadius: "4px",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={plateVisible}
            onChange={(e) => setPlateVisible(e.target.checked)}
          />
          plateレイヤ表示
        </label>
      </div>
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          zIndex: 1,
          background: "rgba(255,255,255,0.85)",
          padding: "8px 14px",
          borderRadius: "4px",
          fontSize: "14px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 4 }}>震源の深さ凡例</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <LegendItem color="red" label="0–24 km" />
          <LegendItem color="orange" label="25–49 km" />
          <LegendItem color="yellow" label="50–74 km" />
          <LegendItem color="limegreen" label="75–99 km" />
          <LegendItem color="green" label="100–199 km" />
          <LegendItem color="blue" label="200+ km" />
        </div>
      </div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
    </>
  );
};

export default MapView;
