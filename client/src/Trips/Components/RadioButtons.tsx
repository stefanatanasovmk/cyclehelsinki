import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface Props {
  filterBy: string;
  setFilterBy: (value: string) => void;
}

export default function RadioButtons({
  filterBy,
  setFilterBy,
}: Props): JSX.Element {
  return (
    <FormControl>
      <RadioGroup
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
        sx={{ flexDirection: "row" }}
      >
        <FormControlLabel value="return" control={<Radio />} label="Return" />
        <FormControlLabel
          value="departure"
          control={<Radio />}
          label="Departure"
        />
      </RadioGroup>
    </FormControl>
  );
}
