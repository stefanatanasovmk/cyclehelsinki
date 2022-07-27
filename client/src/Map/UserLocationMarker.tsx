import { Marker, LayerGroup } from "react-leaflet";
import { userIcon } from "./Icons/StationIcon.config";
import MarkerCircles from "./MarkerCircles";

interface Props {
  coordinates: [number, number];
}

export default function UserLocationMarker({
  coordinates,
}: Props): JSX.Element {
  return (
    <LayerGroup>
      <Marker icon={userIcon} position={coordinates} />
      <MarkerCircles coordinates={coordinates} />
    </LayerGroup>
  );
}
