import Control from "react-leaflet-custom-control";
import { useMap } from "react-leaflet";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Station from "../Utils/Interfaces/station.interface";
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

  //For responsivness
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 380px)").matches
  );

  function handleOnSearch(e: any): void {
    e.stopPropagation();
    e.preventDefault();
    onSearch(e.target.innerText);
  }
  //Handling responsiveness of the search bar.
  useEffect(() => {
    window
      .matchMedia("(min-width: 380px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  return (
    <Control
      position="bottomright"
      style={{
        border: "0px",
        filter: "drop-shadow(1px 1px 2px #0202026c)",
      }}
    >
      <Autocomplete
        placeholder="Search station"
        value={value}
        style={{ backgroundColor: "white", borderRadius: "5px" }}
        disablePortal
        id="search-stations"
        options={[...stations.map((e) => e.Name)]}
        renderOption={(props: any, options: any) => {
          return (
            <li id={props.id} {...props} key={props.id}>
              {options}
            </li>
          );
        }}
        sx={{ width: matches ? "300px" : "230px" }}
        renderInput={(params) => <TextField {...params} />}
        onChange={(e) => {
          handleOnSearch(e);
          map.scrollWheelZoom.enable();
        }}
        onOpen={(e) => {
          e.stopPropagation();
          map.scrollWheelZoom.disable();
        }}
        onClose={(e) => {
          e.stopPropagation();
          map.scrollWheelZoom.enable();
        }}
      />
    </Control>
  );
}
