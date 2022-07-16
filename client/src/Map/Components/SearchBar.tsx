import Control from "react-leaflet-custom-control";
import { useMap } from "react-leaflet";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Station from "../../Utils/Interfaces/station.interface";
import { v4 as uuid } from "uuid";
import { disableMap, enableMap } from "../../Utils/Functions/mapStatus";
import { useEffect, useState } from "react";

interface Props {
  value: string | undefined;
  stations: Station[];
  onSearch(arg: string): void;
}

export default function SearchBar({
  value,
  stations,
  onSearch,
}: Props): JSX.Element {
  const map = useMap();
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 380px)").matches
  );
  function handleOnSearch(e: any): void {
    e.stopPropagation();
    onSearch(e.target.innerText);
  }
  useEffect(() => {
    window
      .matchMedia("(min-width: 380px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  return (
    <Control position="bottomright">
      <Autocomplete
        placeholder="Search station"
        value={value}
        style={{ backgroundColor: "white", borderRadius: "5px" }}
        disablePortal
        id="search-stations"
        renderOption={(props: any, options: any) => {
          return (
            <li id={props._id} {...props} key={uuid()}>
              {options._id} {options}
            </li>
          );
        }}
        options={[...stations.map((e) => e.Name)]}
        sx={{ width: matches ? "300px" : "230px" }}
        renderInput={(params) => <TextField {...params} />}
        onChange={(e) => handleOnSearch(e)}
        onOpen={() => disableMap(map)}
        onClose={() => enableMap(map)}
      />
    </Control>
  );
}
