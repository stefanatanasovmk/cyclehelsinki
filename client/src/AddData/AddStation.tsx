import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { v4 as uuidv4 } from "uuid";
import "./Style/Modal.css";
interface Props {
  setIsAddStationModalOpen: (isErrorModalOpen: boolean) => void;
  isAddStationModalOpen: boolean;
}

export default function AddStation({
  setIsAddStationModalOpen,
  isAddStationModalOpen,
}: Props): JSX.Element {
  const [addressInput, setAddressInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<object[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<
    object | undefined | any
  >(undefined);
  const [loading, setLoading] = useState(false);
  const addressProvider = new OpenStreetMapProvider();
  async function handleInput(e: any) {
    e.stopPropagation();
    setSelectedSuggestion(undefined);
    setLoading(true);
    setAddressInput(e.target.value);
    addressProvider
      .search({
        query: addressInput,
      })
      .then((res) => setSuggestions([...res]))
      .then(() => setLoading(false));
  }

  return (
    <Modal open={isAddStationModalOpen}>
      <div className="Modal">
        <TextField fullWidth label="Station name" variant="outlined" />
        <Autocomplete
          // value={selectedSuggestion && selectedSuggestion}
          onInputChange={handleInput}
          freeSolo
          id="combo-box-demo"
          options={suggestions}
          sx={{ width: 300 }}
          getOptionLabel={(option: any) => option.label}
          loading={true}
          renderOption={(props: any, options: any) => {
            return (
              <li {...props} key={uuidv4()}>
                {options.label}
              </li>
            );
          }}
          renderInput={(params: any) => (
            <TextField
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
              setSelectedSuggestion([value]);
            } else {
              //     setSuggestions([]);
              setSelectedSuggestion(undefined);
            }
            setAddressInput("");
            setLoading(false);
          }}
        />
        <TextField fullWidth label="Operator" variant="outlined" />
        <TextField fullWidth label="Capacity" variant="outlined" />
        <Button
          style={{ marginTop: "1vh" }}
          fullWidth
          variant="contained"
          color="success"
          onClick={() => console.log("add station")}
        >
          Save
        </Button>
        <Button
          style={{ marginTop: "1vh" }}
          fullWidth
          variant="contained"
          color="warning"
          onClick={() => setIsAddStationModalOpen(false)}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
