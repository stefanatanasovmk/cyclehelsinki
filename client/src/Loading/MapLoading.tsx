import "./Style/MapLoading.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function MapLoading(): JSX.Element {
  return (
    <div className="MapLoading">
      <CircularProgress />
    </div>
  );
}
