import { useState, useContext } from "react";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import AddressSearch from "./AddressSearch";
import AddCoordinates from "./AddCoordinates";
import RadioButtons from "./RadioButtons";
import saveStation from "../../Utils/Functions/saveStation";
import Context from "../../Utils/context/context";
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
  //State for keeping the address if the user choose a address from the searchbar
  const [selectedAddress, setSelectedAddress] = useState<string | object>("");

  //For following how the user chose the address, custom or from the searchbar
  const [howCoordinatesAreEntered, setHowCoordinatesAreEntered] =
    useState<string>("addressSearch");

  //Chosen latitude and logitude
  const [lat, setLat] = useState<string>("");
  const [long, setLong] = useState<string>("");

  //State for custom address
  const [customAddress, setCustomAddress] = useState<string>("");

  const [city, setCity] = useState("");
  const [stationName, setStationName] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");

  const { setPopup } = useContext(Context);

  //Function for saving the data in the database
  async function handleSave() {
    //if condition to make sure that the user have chosen an address
    if (
      howCoordinatesAreEntered === "addressSearch" &&
      selectedAddress === ""
    ) {
      setPopup("Please select an address", "error");
    } else {
      saveStation(
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
  //Function for cleaning up the states after the user has saved the data
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
          />
        )}
        {howCoordinatesAreEntered === "customAddress" && (
          <>
            <AddCoordinates
              long={long}
              lat={lat}
              setLong={setLong}
              setLat={setLat}
            />
            <TextField
              style={style}
              fullWidth
              label="Address"
              variant="outlined"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
            />
          </>
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
