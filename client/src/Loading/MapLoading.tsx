import "./Style/MapLoading.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
export default function MapLoading(): JSX.Element {
  return (
    <div className="MapLoading">
      <Typography style={{ fontSize: "1.3rem" }} variant="button">
        Please wait a bit, very complicated computation is going on...
      </Typography>
      <CircularProgress />
    </div>
  );
}
