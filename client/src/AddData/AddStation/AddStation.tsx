import { useState, useContext } from "react";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import "../Style/Modal.css";
import AddressSearch from "./AddressSearch";
import AddCoordinates from "./AddCoordinates";
import RadioButtons from "./RadioButtons";
import addStation from "../../Utils/Functions/addStation";
import Context from "../../context/context";
import TextInputs from "./TextInputs";
import Buttons from "../Buttons";
interface Props {
  setIsAddStationModalOpen: (isErrorModalOpen: boolean) => void;
  isAddStationModalOpen: boolean;
}

const style = { marginTop: "1vh" };

export default function AddStation({
  setIsAddStationModalOpen,
  isAddStationModalOpen,
}: Props): JSX.Element {
  const [selectedAddress, setSelectedAddress] = useState<string | object>("");
  const [howCoordinatesAreEntered, setHowCoordinatesAreEntered] =
    useState<string>("addressSearch");

  const [lat, setLat] = useState<string>("");
  const [long, setLong] = useState<string>("");
  const [customAddress, setCustomAddress] = useState<string>("");

  const [city, setCity] = useState("");
  const [stationName, setStationName] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");

  const { setPopup } = useContext(Context);

  async function handleSave() {
    if (
      howCoordinatesAreEntered === "addressSearch" &&
      selectedAddress === ""
    ) {
      setPopup("Please select an address", "error");
    } else {
      addStation(
        howCoordinatesAreEntered,
        stationName,
        customAddress,
        city,
        operator,
        capacity,
        long,
        lat,
        selectedAddress
      )
        .then((res) => {
          if (res) {
            setPopup("The station has been saved successfully", "success");
            handleCleanup();
            setIsAddStationModalOpen(false);
          }
        })
        .catch((e) => setPopup(e.response.data.message, "error"));
    }
  }
  function handleCleanup() {
    setSelectedAddress("");
    setHowCoordinatesAreEntered("addressSearch");
    setLat("");
    setLong("");
    setCustomAddress("");
    setCity("");
    setStationName("");
    setOperator("");
    setCapacity("");
  }
  return (
    <Dialog open={isAddStationModalOpen} scroll="paper">
      <DialogTitle>
        <Typography variant="button">Add station</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          style={style}
          fullWidth
          label="Station name"
          variant="outlined"
          value={stationName}
          onChange={(e) => setStationName(e.target.value)}
        />
        <RadioButtons
          howCoordinatesAreEntered={howCoordinatesAreEntered}
          setHowCoordinatesAreEntered={setHowCoordinatesAreEntered}
        />
        {howCoordinatesAreEntered === "addressSearch" && (
          <AddressSearch
            style={style}
            setSelectedAddress={setSelectedAddress}
            selectedAddress={selectedAddress}
          />
        )}
        {howCoordinatesAreEntered === "customAddress" && (
          <AddCoordinates
            long={long}
            lat={lat}
            setLong={setLong}
            setLat={setLat}
          />
        )}
        {howCoordinatesAreEntered === "customAddress" && (
          <TextField
            style={style}
            fullWidth
            label="Address"
            variant="outlined"
            value={customAddress}
            onChange={(e) => setCustomAddress(e.target.value)}
          />
        )}

        <TextInputs
          city={city}
          setCity={setCity}
          operator={operator}
          setOperator={setOperator}
          capacity={capacity}
          setCapacity={setCapacity}
          style={style}
        />
        <Buttons
          handleSave={handleSave}
          setIsModalOpen={setIsAddStationModalOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
