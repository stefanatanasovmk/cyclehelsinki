import "./Style/Loading.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
export default function Loading(): JSX.Element {
  return (
    <div className="Loading">
      <Typography style={{ fontSize: "1.3rem" }} variant="button">
        Please wait a bit, very complicated computation is going on...
      </Typography>
      <CircularProgress />
    </div>
  );
}
