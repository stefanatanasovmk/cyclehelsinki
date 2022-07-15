import { Marker, useMap } from "react-leaflet";
import PopUp from "./PopUp";
import { StationIcon } from ".././Icons/StationIcon.config";

interface Props {
  Name: string;
  Osoite: string;
  Kapasiteet: string;
  coordinates: [number, number];
  bikesAvailable: string;
}

export default function StationMarker({
  
  Name,
  Osoite,
  Kapasiteet,
  coordinates,
  bikesAvailable,
}: Props): JSX.Element {
  const map = useMap();
  return (
    <Marker
      icon={StationIcon(+bikesAvailable > 0 ? true : false)}
      position={coordinates}
      eventHandlers={{
        click: () => {
          map.setView(coordinates, 16);
        },
      }}
    >
      <PopUp
        Name={Name}
        Osoite={Osoite}
        Kapasiteet={Kapasiteet}
        bikesAvailable={bikesAvailable}
      />
    </Marker>
  );
}
