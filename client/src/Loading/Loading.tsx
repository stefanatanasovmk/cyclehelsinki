import { CircularProgress } from "@mui/material";
import "./Style/Loading.css";
export default function Loading(): JSX.Element {
  return (
    <div className="Loading">
      <CircularProgress />;
    </div>
  );
}
