import { TextField } from "@mui/material";

interface Props {
  long: string;
  lat: string;
  setLong: (long: string) => void;
  setLat: (lat: string) => void;
}
export default function AddCoordinates({
  long,
  lat,
  setLong,
  setLat,
}: Props): JSX.Element {
  return (
    <div
      className="AddCoordinates"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <TextField
        style={{ marginBottom: "1vh", marginRight: "1vh" }}
        fullWidth
        label="Latitude"
        variant="outlined"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <TextField
        style={{ marginBottom: "1vh", marginLeft: "1vh" }}
        fullWidth
        label="Longitude"
        variant="outlined"
        value={long}
        onChange={(e) => setLong(e.target.value)}
      />
    </div>
  );
}
