import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import Station from "../../Utils/Interfaces/station.interface";
import "../Style/Modal.css";
import StationSearch from "./StationSearch";
import saveTrip from "../../Utils/Functions/saveTrip";
import axios from "axios";
import Context from "../../context/context";
import Buttons from "../Buttons";
import Inputs from "./Inputs";

interface Props {
  isAddTripOpen: boolean;
  setIsAddTripOpen: (isAddTripOpen: boolean) => void;
}

const style = { marginTop: "1vh" };

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
        setPopup("The trip has beeen saved successfully", "success");
      })
      .catch((e) => setPopup(e.response.data.message, "error"));
  }

  useEffect(() => {
    axios
      .get("/api/station")
      .then((data) => {
        setStations(data.data);
        setChosenDepartureStation(data.data[0].Name);
        setChosenReturnStation(data.data[0].Name);
      })
      .catch((e) => setPopup(e.response.data.message, "error"));
  }, [setPopup]);

  return (
    <Dialog open={isAddTripOpen} scroll="paper">
      <DialogTitle>
        <Typography variant="button">Add trip</Typography>
      </DialogTitle>
      <DialogContent>
        <StationSearch
          style={style}
          stations={stations}
          chosenStation={chosenDepartureStation}
          setChosenStation={setChosenDepartureStation}
          label="Search departure station"
        />
        <StationSearch
          style={style}
          stations={stations}
          chosenStation={chosenReturnStation}
          setChosenStation={setChosenReturnStation}
          label="Search return station"
        />
        <Inputs
          coveredDistance={coveredDistance}
          setCoveredDistance={setCoveredDistance}
          departureTime={departureTime}
          setDepartureTime={setDepartureTime}
          returnTime={returnTime}
          setReturnTime={setReturnTime}
          style={style}
        />

        <Buttons
          handleSave={saveTripHandler}
          setIsModalOpen={setIsAddTripOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
