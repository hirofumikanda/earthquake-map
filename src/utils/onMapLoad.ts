import maplibregl from "maplibre-gl";

export async function onMapLoad(map: maplibregl.Map) {
  const dark_red = await map.loadImage("img/dark_red.png");
  map.addImage("dark_red", dark_red.data);
  const red = await map.loadImage("img/red.png");
  map.addImage("red", red.data);
  const orange = await map.loadImage("img/orange.png");
  map.addImage("orange", orange.data);
  const yellow = await map.loadImage("img/yellow.png");
  map.addImage("yellow", yellow.data);
  const lime_green = await map.loadImage("img/lime_green.png");
  map.addImage("lime_green", lime_green.data);
  const green = await map.loadImage("img/green.png");
  map.addImage("green", green.data);
  const blue = await map.loadImage("img/blue.png");
  map.addImage("blue", blue.data);
}
