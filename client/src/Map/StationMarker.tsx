import { Marker, useMap } from "react-leaflet";
import MapPopup from "./MapPopup/MapPopup";
import { StationIcon } from "./Icons/StationIcon.config";
import { useEffect, useState } from "react";
import getAvailableBikes from "../Utils/Functions/getAvailableBikes";

interface Props {
  id: string;
  Name: string;
  Osoite: string;
  Kapasiteet: string;
  coordinates: [number, number];
  getDirections: (toLong: number, toLat: number) => void;
}

export default function StationMarker({
  id,
  Name,
  Osoite,
  Kapasiteet,
  coordinates,
  getDirections,
}: Props): JSX.Element {
  const map = useMap();
  const [bikesAvailable, setBikesAvailable] = useState<string>("0");

  //For handling when user ask for directions.
  function handleGetDirections(): void {
    getDirections(coordinates[1], coordinates[0]);
    map.closePopup();
  }
  //For getting the number of bikes available at the station from HSL API.
  useEffect(() => {
    getAvailableBikes(id)
      .then((res) => {
        if (res !== null && res !== undefined) {
          setBikesAvailable(res.data.bikeRentalStation.bikesAvailable);
        } else {
          setBikesAvailable("0");
        }
      })
      .catch((e) => setBikesAvailable("0"));
  }, [id]);

  return (
    <Marker
      icon={StationIcon(+bikesAvailable > 0 ? true : false)}
      position={coordinates}
      eventHandlers={{
        click: () => {
          map.setView(coordinates, 14);
        },
      }}
    >
      <MapPopup
        id={id}
        Name={Name}
        Osoite={Osoite}
        Kapasiteet={Kapasiteet}
        bikesAvailable={bikesAvailable}
        getDirections={handleGetDirections}
      />
    </Marker>
  );
}
