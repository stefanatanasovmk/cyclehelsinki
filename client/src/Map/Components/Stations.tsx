import StationMarker from "./StationMarker";
import Station from "../../Utils/Interfaces/station.interface";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface Props {
  stations: Station[];
  searchedStation: Station[];
  isSearched: boolean;
}

export default function Stations({
  stations,
  isSearched,
  searchedStation,
}: Props): JSX.Element {
  const map = useMap();
  const [foundStation] = searchedStation;
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
          foundStation.Location.coordinates[1] + 0.0002,
          foundStation.Location.coordinates[0] - 0.0001,
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
          bikesAvailable={
            e.bikesAvailable !== undefined ? e.bikesAvailable : "0"
          }
        />
      ))}
    </div>
  );
}
