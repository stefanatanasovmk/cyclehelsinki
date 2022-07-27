import { Button } from "@mui/material";
import "./Style/Buttons.css";
import DirectionsIcon from "@mui/icons-material/Directions";

interface Props {
  value: number;
  setValue: (value: number) => void;
  getMostPopularStations: () => void;
  getDirections: () => void;
  bikesAvailable: string;
}

export default function Buttons({
  value,
  setValue,
  getMostPopularStations,
  getDirections,
  bikesAvailable,
}: Props): JSX.Element {
  return (
    <div className="ButtonsContainer">
      <div className="ChangeContentButtons">
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
      <Button
        fullWidth
        disabled={bikesAvailable === "0" ? true : false}
        color="info"
        style={{
          maxHeight: "5vh",
          borderRadius: "0px",
        }}
        variant="contained"
        startIcon={<DirectionsIcon />}
        onClick={getDirections}
      >
        directions
      </Button>
    </div>
  );
}
