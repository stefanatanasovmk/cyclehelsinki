import { useEffect, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { v4 as uuidv4 } from "uuid";
interface Props {
  selectedAddress: object | undefined;
  setSelectedAddress: (selectedAddress: object | undefined) => void;
}

export default function AddressSearch({
  setSelectedAddress,
  selectedAddress,
}: Props): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [addressInput, setAddressInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<object[]>([]);
  const addressProvider = new OpenStreetMapProvider();
  //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  async function handleInput(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setAddressInput(e.target.value);
    //     setIsDropdownOpen(true);

    if (e.nativeEvent.data === " ") {
      setLoading(true);
      addressProvider
        .search({
          query: addressInput,
        })
        .then((res: any) => setSuggestions([...res]))
        .then(() => setLoading(false));
    }
  }
  return (
    <Autocomplete
      //  open={isDropdownOpen}
      onInputChange={handleInput}
      freeSolo={true}
      id="combo-box-demo"
      options={suggestions}
      sx={{ width: 300 }}
      getOptionLabel={(option: any) => option.label}
      //  loading={true}
      renderOption={(props: any, options: any) => {
        return (
          <li {...props} key={uuidv4()}>
            {options.label}
          </li>
        );
      }}
      renderInput={(params: any) => (
        <TextField
          helperText="Add a coma after the address, city, zipcode, to get the suggestions"
          {...params}
          label="Address"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      onChange={(e, value) => {
        if (value) {
          setSelectedAddress([value]);
        } else {
          setSelectedAddress(undefined);
        }
        setAddressInput("");
        setLoading(false);
        //    setIsDropdownOpen(false);
      }}
    />
  );
}
