import { Autocomplete, TextField } from "@mui/material";
import Station from "../../Utils/Interfaces/station.interface";

interface Props {
  stations: Station[];
  chosenStation: string;
  setChosenStation: (chosenStation: string) => void;
  label: string;
  style: object;
}

export default function StationSearchBar({
  stations,
  chosenStation,
  setChosenStation,
  label,
  style,
}: Props): JSX.Element {
  return (
    <Autocomplete
      value={chosenStation}
      style={{ backgroundColor: "white", borderRadius: "5px", ...style }}
      disablePortal
      fullWidth
      renderOption={(props: any, options: any) => {
        return (
          <li id={props.id} {...props} key={props.id}>
            {options._id} {options}
          </li>
        );
      }}
      options={[...stations.map((e) => e.Name)]}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(e: any) =>
        e.target.innerText !== undefined
          ? setChosenStation(e.target.innerText)
          : chosenStation
      }
    />
  );
}
