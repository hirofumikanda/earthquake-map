import maplibregl from "maplibre-gl";

export async function onMapLoad(map: maplibregl.Map) {
  const volcano = await map.loadImage("img/volcano.png");
  map.addImage("volcano", volcano.data);
  const red = await map.loadImage("img/red.png");
  map.addImage("red", red.data);
  const orange = await map.loadImage("img/orange.png");
  map.addImage("orange", orange.data);
  const yellow = await map.loadImage("img/yellow.png");
  map.addImage("yellow", yellow.data);
  const dark_red = await map.loadImage("img/dark_red.png");
  map.addImage("dark_red", dark_red.data);

}
