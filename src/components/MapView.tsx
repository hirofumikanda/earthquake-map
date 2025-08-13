import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { setupPopupHandler } from "../utils/popup";
import { setupPointerHandler } from "../utils/pointer";
import { onMapLoad } from "../utils/onMapLoad";

const PLATE_LAYER_ID = "plate"; // plateレイヤのID（style.jsonで定義されているIDに合わせてください）

const MapView = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [plateVisible, setPlateVisible] = useState(true);

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

  // plateVisibleが変わったときにplateレイヤの表示/非表示を切り替える
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // plateレイヤが存在する場合のみ
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
      {/* チェックボックスUI */}
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
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
    </>
  );
};

export default MapView;
