import { TextField } from "@mui/material";

interface Props {
  city: string;
  setCity: (city: string) => void;
  operator: string;
  setOperator: (operator: string) => void;
  capacity: string;
  setCapacity: (capacity: string) => void;
  style: object;
}

export default function TextInputs({
  city,
  setCity,
  operator,
  setOperator,
  capacity,
  setCapacity,
  style,
}: Props): JSX.Element {
  return (
    <>
      <TextField
        style={style}
        fullWidth
        label="City"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <TextField
        style={style}
        fullWidth
        label="Operator"
        variant="outlined"
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
      />
      <TextField
        style={style}
        fullWidth
        label="Capacity"
        variant="outlined"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />
    </>
  );
}
