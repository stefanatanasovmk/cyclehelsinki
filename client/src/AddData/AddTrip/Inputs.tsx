import { TextField } from "@mui/material";

interface Props {
  coveredDistance: number;
  setCoveredDistance: (coveredDistance: number) => void;
  departureTime: string;
  setDepartureTime: (departureTime: string) => void;
  returnTime: string;
  setReturnTime: (returnTime: string) => void;
  style: object;
}

export default function Inputs({
  coveredDistance,
  setCoveredDistance,
  departureTime,
  setDepartureTime,
  returnTime,
  setReturnTime,
  style,
}: Props): JSX.Element {
  return (
    <>
      <TextField
        style={style}
        color="primary"
        fullWidth
        type="number"
        helperText="Covered distance(in meters)"
        value={coveredDistance}
        onChange={(e) => setCoveredDistance(+e.target.value)}
      />
      <TextField
        style={style}
        fullWidth
        variant="outlined"
        color="primary"
        helperText="Departure time"
        type="datetime-local"
        value={departureTime}
        onChange={(e) => setDepartureTime(e.target.value)}
      />

      <TextField
        style={style}
        fullWidth
        variant="outlined"
        color="primary"
        helperText="Return time"
        type="datetime-local"
        value={returnTime}
        onChange={(e) => setReturnTime(e.target.value)}
      />
    </>
  );
}
