# Earthquake Map - AI Coding Agent Instructions

## Project Overview
Japanese earthquake visualization web app using MapLibre GL JS + React + PMTiles. Displays M6+ earthquakes (2005-2025) color-coded by depth, with optional tectonic plate overlay. Uses Natural Earth 2 background and bathymetry data.

## Architecture Pattern
- **Single-component React app**: `App.tsx` → `MapView.tsx` (main map container)
- **Utility-based organization**: Map logic split into `/utils/` modules by function
- **PMTiles data strategy**: All geographic data served as PMTiles files from `/public/data/`
- **MapLibre style-driven**: Map styling entirely defined in `/public/styles/style.json`

## Key Components & Data Flow

### Map Initialization (`MapView.tsx`)
```tsx
// PMTiles protocol registration (required before map creation)
const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

// Map uses local style.json with PMTiles sources
style: "styles/style.json"
```

### Data Layer Architecture
- **6 PMTiles sources**: bathymetry, earthquake, land_cover, plate, gebco (DEM), geoid
- **Earthquake symbology**: Depth-based icons (red 0-24km → blue 200+km) defined in style.json
- **Layer visibility**: Plate layer toggled via React state + MapLibre visibility property

### Utility Modules Pattern
Each map behavior isolated in `/utils/`:
- `onMapLoad.ts` - Preloads earthquake depth color icons (red.png, orange.png, etc.)
- `popup.ts` - Click handlers for feature property display
- `pointer.ts` - Cursor changes on feature hover
- `LegendItem.tsx` - Reusable legend components

## Development Workflows

### Local Development
```bash
npm run dev         # Vite dev server
npm run build       # TypeScript compile + Vite build
npm run preview     # Preview production build
```

### Deployment
```bash
npm run deploy      # Builds and deploys to GitHub Pages
```
**Note**: `vite.config.ts` sets `base: "/earthquake-map/"` for GitHub Pages deployment.

## Project-Specific Conventions

### PMTiles Integration
- All geographic data stored as `.pmtiles` files in `/public/data/`
- Style.json references PMTiles via `"url": "pmtiles:///earthquake-map/data/filename.pmtiles"`
- Protocol registration required before map instantiation

### Icon Loading Pattern
- Earthquake symbols use PNG icons (not built-in symbols)
- Icons preloaded in `onMapLoad.ts` via `map.loadImage()` then `map.addImage()`
- Style.json references loaded icons by name in earthquake layer

### Layer Management
- Interactive layers defined in `ALLOW_LAYERS` constants in popup.ts and pointer.ts
- Layer visibility controlled via MapLibre's `setLayoutProperty()` not React state

### Japanese Localization
- UI text in Japanese (e.g., "plateレイヤ表示", "震源の深さ凡例")
- Depth units automatically converted: bathymetry (m), earthquakes (km)

## Common Integration Points
- **Font handling**: Custom fonts via `/public/font/` directory, referenced in style.json `glyphs` property
- **Color scheme**: Earthquake depth colors match legend colors exactly (LegendItem.tsx ↔ style.json)
- **Data attribution**: Each PMTiles source includes attribution in style.json

## When Adding Features
1. **New data layers**: Add PMTiles to `/public/data/`, update style.json sources/layers
2. **Map interactions**: Create new utility module in `/utils/`, import to MapView.tsx
3. **UI controls**: Add to MapView.tsx return JSX with absolute positioning (follow existing checkbox pattern)
4. **Layer toggles**: Use React state + useEffect + `setLayoutProperty()` pattern from plate layer
