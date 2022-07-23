import L from "leaflet";
import greenPin from "./images/map-location-green.png";
import redPin from "./images/map-location-red.png";
import userPin from "./images/user-location.png";

export function StationIcon(isBikeAvailable: boolean) {
  const icon = L.icon({
    iconUrl: isBikeAvailable ? greenPin : redPin,
    iconSize: [20, 18],
    iconAnchor: [10, 20],
    popupAnchor: [0, -25],
  });
  return icon;
}

export const userIcon = new L.Icon({
  iconUrl: userPin,
  iconSize: [40, 40],
  iconAnchor: [20, 35],
  // popupAnchor: [-3, -76], this icon doesn't have a popup
});
