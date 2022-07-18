import { Marker, useMap } from "react-leaflet";
import MapPopup from "./MapPopup/Components/MapPopup";
import { StationIcon } from ".././Icons/StationIcon.config";

interface Props {
  id: string;
  Name: string;
  Osoite: string;
  Kapasiteet: string;
  coordinates: [number, number];
  bikesAvailable: string;
}

export default function StationMarker({
  id,
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
      />
    </Marker>
  );
}
