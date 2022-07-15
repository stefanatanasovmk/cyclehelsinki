import { Modal, Button, TextField } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import Station from "../Utils/Interfaces/station.interface";
import "./Style/Modal.css";
import StationSearch from "./StationSearch";
import saveTrip from "../Utils/Functions/saveTrip";
import axios from "axios";
import Context from "../context/context";

interface Props {
  isAddTripOpen: boolean;
  setIsAddTripOpen: (isAddTripOpen: boolean) => void;
}
export default function AddTrip({
  isAddTripOpen,
  setIsAddTripOpen,
}: Props): JSX.Element {
  const [departureTime, setDepartureTime] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");
  const [stations, setStations] = useState<Station[]>([]);
  const [chosenDepartureStation, setChosenDepartureStation] =
    useState<string>(" ");
  const [chosenReturnStation, setChosenReturnStation] = useState<string>(" ");

  const [coveredDistance, setCoveredDistance] = useState<number>(1);

  const { setPopup } = useContext(Context);

  async function saveTripHandler(): Promise<void> {
    await saveTrip(
      chosenDepartureStation,
      chosenReturnStation,
      coveredDistance,
      departureTime,
      returnTime
    )
      .then(() => {
        setIsAddTripOpen(false);
        setPopup("The trip has beeen saved successfully");
      })
      .catch((e) => setPopup(e.response.data.message));
  }

  useEffect(() => {
    axios
      .get("/api/station")
      .then((data) => {
        setStations(data.data);
        setChosenDepartureStation(data.data[0].Name);
        setChosenReturnStation(data.data[0].Name);
      })
      .catch((e) => setPopup(e.response.data.message));
  }, [setPopup]);

  return (
    <Modal open={isAddTripOpen}>
      <div className="Modal">
        <StationSearch
          stations={stations}
          chosenStation={chosenDepartureStation}
          setChosenStation={setChosenDepartureStation}
          label="Search departure station"
        />
        <StationSearch
          stations={stations}
          chosenStation={chosenReturnStation}
          setChosenStation={setChosenReturnStation}
          label="Search return station"
        />
        <TextField
          color="primary"
          fullWidth
          type="number"
          helperText="Covered distance(in meters)"
          value={coveredDistance}
          onChange={(e) => setCoveredDistance(+e.target.value)}
        />
        <TextField
          fullWidth
          variant="outlined"
          color="primary"
          helperText="Departure time"
          type="datetime-local"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
        />

        <TextField
          fullWidth
          variant="outlined"
          color="primary"
          helperText="Return time"
          type="datetime-local"
          value={returnTime}
          onChange={(e) => setReturnTime(e.target.value)}
        />
        <Button
          style={{ marginTop: "1vh" }}
          fullWidth
          variant="contained"
          color="success"
          onClick={saveTripHandler}
        >
          Save
        </Button>
        <Button
          style={{ marginTop: "1vh" }}
          fullWidth
          variant="contained"
          color="warning"
          onClick={() => setIsAddTripOpen(false)}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
