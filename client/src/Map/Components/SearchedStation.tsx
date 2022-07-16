import { useEffect } from "react";
import { useMap } from "react-leaflet";
import Station from "../../Utils/Interfaces/station.interface";
import StationMarker from "./StationMarker";
interface Props {
  station: Station[];
}

export default function SearchedStation({ station }: Props): JSX.Element {
  const map = useMap();
  const [searchedStation] = station;
  useEffect(() => {
    map.setView(
      [
        searchedStation.Location.coordinates[1],
        searchedStation.Location.coordinates[0],
      ],
      16
    );
  }, [station, map, searchedStation.Location.coordinates]);
  return (
    <StationMarker
      id={searchedStation._id}
      Name={searchedStation.Name}
      Osoite={searchedStation.Osoite}
      Kapasiteet={searchedStation.Kapasiteet}
      coordinates={[
        searchedStation.Location.coordinates[1],
        searchedStation.Location.coordinates[0],
      ]}
      bikesAvailable={
        searchedStation.bikesAvailable !== undefined
          ? searchedStation.bikesAvailable
          : "0"
      }
    />
  );
}
