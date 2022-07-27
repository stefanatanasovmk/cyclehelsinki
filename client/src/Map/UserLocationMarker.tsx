import { Marker, useMap, LayerGroup } from "react-leaflet";
import { userIcon } from "./Icons/StationIcon.config";
import MarkerCircles from "./MarkerCircles";

interface Props {
  coordinates: [number, number];
}

export default function UserLocationMarker({
  coordinates,
}: Props): JSX.Element {
  const map = useMap();
  return (
    <LayerGroup>
      <Marker
        icon={userIcon}
        position={coordinates}
        eventHandlers={{
          click: () => {
            map.setView(coordinates, 16);
          },
        }}
      />
      <MarkerCircles coordinates={coordinates} />
    </LayerGroup>
  );
}
