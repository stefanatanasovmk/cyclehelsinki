import StationMarker from "./StationMarker";
import Station from "../Utils/Interfaces/station.interface";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface Props {
  stations: Station[];
  searchedStation: Station[];
  isSearched: boolean;
  getDirections: (toLong: number, toLat: number) => void;
}

export default function Stations({
  stations,
  isSearched,
  searchedStation,
  getDirections,
}: Props): JSX.Element {
  const map = useMap();
  const [foundStation] = searchedStation;
  //For when user searches for a specific station in the search bar on the map. It locate the station on the map, zoom in and open Tooltip next to the searched station marker.
  useEffect(() => {
    isSearched &&
      map
        .setView(
          [
            foundStation.Location.coordinates[1],
            foundStation.Location.coordinates[0],
          ],
          16
        )
        .closePopup()
        .openTooltip(`<h6>Click on the marker for more station info</h6>`, [
          foundStation.Location.coordinates[1] + 0.0001,
          foundStation.Location.coordinates[0] - 0.00000099,
        ]);
  }, [isSearched, map, searchedStation, foundStation]);
  return (
    <div>
      {stations.map((e: Station) => (
        <StationMarker
          id={e._id}
          key={e._id}
          Name={e.Name}
          Osoite={e.Adress}
          Kapasiteet={e.Kapasiteet}
          coordinates={[e.Location.coordinates[1], e.Location.coordinates[0]]}
          getDirections={getDirections}
        />
      ))}
    </div>
  );
}
