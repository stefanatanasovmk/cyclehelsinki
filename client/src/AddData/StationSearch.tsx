import { v4 as uuidv4 } from "uuid";
import { Autocomplete, TextField } from "@mui/material";
import Station from "../Utils/Interfaces/station.interface";
import { useEffect, useState } from "react";

interface Props {
  stations: Station[];
  chosenStation: string;
  setChosenStation: (chosenStation: string) => void;
  label: string;
}

export default function StationSearchBar({
  stations,
  chosenStation,
  setChosenStation,
  label,
}: Props): JSX.Element {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 380px)").matches
  );
  useEffect(() => {
    window
      .matchMedia("(min-width: 380px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  return (
    <Autocomplete
      value={chosenStation}
      style={{ backgroundColor: "white", borderRadius: "5px" }}
      disablePortal
      id="search-stations"
      renderOption={(props: any, options: any) => {
        return (
          <li id={props._id} {...props} key={uuidv4()}>
            {options._id} {options}
          </li>
        );
      }}
      options={[...stations.map((e) => e.Name)]}
      sx={{ width: matches ? "300px" : "230px" }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(e: any) =>
        e.target.innerText !== undefined
          ? setChosenStation(e.target.innerText)
          : chosenStation
      }
    />
  );
}
