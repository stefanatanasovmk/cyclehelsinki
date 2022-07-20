import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface Props {
  howCoordinatesAreEntered: string;
  setHowCoordinatesAreEntered: (howCoordinatesAreEntered: string) => void;
}

export default function RadioButtons({
  howCoordinatesAreEntered,
  setHowCoordinatesAreEntered,
}: Props): JSX.Element {
  return (
    <FormControl>
      <RadioGroup
        value={howCoordinatesAreEntered}
        onChange={(e) => setHowCoordinatesAreEntered(e.target.value)}
        sx={{ flexDirection: "row" }}
      >
        <FormControlLabel
          value="addressSearch"
          control={<Radio />}
          label="Find address"
        />
        <FormControlLabel
          value="customAddress"
          control={<Radio />}
          label="Custom address"
        />
      </RadioGroup>
    </FormControl>
  );
}
