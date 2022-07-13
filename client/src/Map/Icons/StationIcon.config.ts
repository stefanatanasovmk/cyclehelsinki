import L from "leaflet";
import greenPin from "./images/map-location-green.png";
import redPin from "./images/map-location-red.png";
import userPin from "./images/user-location.png";

export function StationIcon(isBikeAvailable: boolean) {
  const icon = L.icon({
    iconUrl: isBikeAvailable ? greenPin : redPin,

    iconSize: [38, 35],
    iconAnchor: [25, 35],
    popupAnchor: [-5, -40],
  });
  return icon;
}

export const userIcon = new L.Icon({
  iconUrl: userPin,

  iconSize: [80, 80],
  iconAnchor: [40, 80],
  popupAnchor: [-3, -76],
});
