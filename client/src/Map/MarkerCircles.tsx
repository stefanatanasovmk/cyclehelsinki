import { Circle, LayerGroup, Tooltip } from "react-leaflet";
interface Props {
  coordinates: [number, number];
}

export default function MarkerCircles({ coordinates }: Props): JSX.Element {
  return (
    <LayerGroup>
      <Circle
        center={coordinates}
        radius={100}
        pathOptions={{ fillColor: "red", color: "red" }}
      />

      <Circle
        center={coordinates}
        radius={200}
        pathOptions={{ fillColor: "green", color: "green" }}
      />

      <Circle
        center={coordinates}
        radius={300}
        pathOptions={{ fillColor: "blue", color: "blue" }}
      >
        <Tooltip direction="bottom" offset={[0, 20]} opacity={1}>
          <div>Red: 100m</div>
          <div>Green: 200m</div>
          <div>Blue: 300m</div>
        </Tooltip>
      </Circle>
    </LayerGroup>
  );
}
