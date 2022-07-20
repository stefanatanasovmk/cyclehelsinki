import { useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { OpenStreetMapProvider } from "leaflet-geosearch";

interface Props {
  selectedAddress: object | string;
  setSelectedAddress: (selectedAddress: string | object) => void;
  style: object;
}

export default function AddressSearch({
  setSelectedAddress,
  selectedAddress,
  style,
}: Props): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [addressInput, setAddressInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<object[]>([]);
  const addressProvider = new OpenStreetMapProvider();

  async function handleInput(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setAddressInput(e.target.value);

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
      onInputChange={handleInput}
      options={suggestions}
      noOptionsText={"We coudn't find anu address matching your search"}
      getOptionLabel={(option: any) => option.label}
      renderOption={(props: any, options: any) => {
        return (
          <li {...props} key={options.raw.place_id}>
            {options.label}
          </li>
        );
      }}
      renderInput={(params: any) => (
        <TextField
          style={style}
          fullWidth
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
          setSelectedAddress(value);
        } else {
          setSelectedAddress("");
        }
        setAddressInput("");
        setLoading(false);
      }}
    />
  );
}
