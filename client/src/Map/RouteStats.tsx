import Control from "react-leaflet-custom-control";
import secondsToTime from "../Utils/Functions/secondsToTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StraightenIcon from "@mui/icons-material/Straighten";

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
      <div
        style={{
          backgroundColor: "#2E7D32",
          padding: "1vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "50%",
        }}
      >
        <StraightenIcon /> {(routeStats.totalDistance / 1000).toFixed(1)} km.
      </div>
      <div
        style={{
          backgroundColor: "#D32F2F",
          padding: "1vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "50%",
        }}
      >
        <AccessTimeIcon /> {secondsToTime(routeStats.totalTime)}
      </div>
    </Control>
  );
}
