import Control from "react-leaflet-custom-control";
import secondsToTime from "../Utils/Functions/secondsToTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StraightenIcon from "@mui/icons-material/Straighten";
import "./Style/RouteStats.css";

interface Props {
  routeStats: {
    totalDistance: number;
    totalTime: number;
  };
}

export default function RouteStats({ routeStats }: Props): JSX.Element {
  return (
    <Control
      position="topright"
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <div className="DistanceContainer">
        <StraightenIcon /> {(routeStats.totalDistance / 1000).toFixed(1)} km.
      </div>
      <div className="TimeContainer">
        <AccessTimeIcon /> {secondsToTime(routeStats.totalTime)}
      </div>
    </Control>
  );
}
