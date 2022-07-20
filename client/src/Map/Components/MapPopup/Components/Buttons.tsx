import { Button } from "@mui/material";
import "../Style/Buttons.css";

interface Props {
  value: number;
  setValue: (value: number) => void;
  getMostPopularStations: () => void;
}

export default function Buttons({
  value,
  setValue,
  getMostPopularStations,
}: Props): JSX.Element {
  return (
    <div className="ButtonContainer">
      <Button
        fullWidth
        color={value === 0 ? "success" : "error"}
        variant="contained"
        style={{
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
        onClick={() => setValue(0)}
      >
        Info
      </Button>
      <Button
        fullWidth
        color={value === 1 ? "success" : "error"}
        variant="contained"
        style={{
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
        onClick={() => {
          setValue(1);
          getMostPopularStations();
        }}
      >
        Stats
      </Button>
    </div>
  );
}
