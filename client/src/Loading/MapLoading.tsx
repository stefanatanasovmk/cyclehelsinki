import "./Style/MapLoading.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
export default function MapLoading(): JSX.Element {
  return (
    <div className="MapLoading">
      <Typography style={{ fontSize: "1.3rem" }} variant="button">
        This can take a minute...
      </Typography>
      <CircularProgress />
    </div>
  );
}
