import { Button } from "@mui/material";
import "../Style/Buttons.css";

interface Props {
  setValue: (value: number) => void;
  getMostPopularStations: () => void;
}

export default function Buttons({
  setValue,
  getMostPopularStations,
}: Props): JSX.Element {
  return (
    <div className="ButtonContainer">
      <Button
        fullWidth
        variant="contained"
        color="success"
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
        variant="contained"
        color="success"
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
