import Control from "react-leaflet-custom-control";
import secondsToTime from "../Utils/Functions/secondsToTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StraightenIcon from "@mui/icons-material/Straighten";
import "./Style/RouteStats.css";
import { Typography } from "@mui/material";

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
        marginTop: "0px",
        border: "0px",
        cursor: "default",
      }}
    >
      <div className="DistanceContainer">
        <StraightenIcon style={{ color: "white" }} />
        <Typography variant="body2" style={{ color: "white" }}>
          {(routeStats.totalDistance / 1000).toFixed(1)} km.
        </Typography>
      </div>
      <div className="TimeContainer">
        <AccessTimeIcon style={{ color: "white" }} />
        <Typography variant="body2" style={{ color: "white" }}>
          {" "}
          {secondsToTime(routeStats.totalTime)}
        </Typography>
      </div>
    </Control>
  );
}
