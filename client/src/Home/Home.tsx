import { useState } from "react";
import Map from "../Map/Components/Map";
import Trips from "../Trips/Components/Trips";
import "./Style/Home.css";
import Navbar from "../Navbar/Navbar";
import ErrorModal from "./ErrorModal/ErrorModal";
import Context from "../context/context";
import AddTrip from "../AddData/AddTrip";
import AddStation from "../AddData/AddStation";
export default function Home(): JSX.Element {
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState<boolean>(false);
  const [isAddStationModalOpen, setIsAddStationModalOpen] =
    useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>("");

  function setPopup(text: string): void {
    setPopupText(text);
    setIsErrorModalOpen(true);
  }
  return (
    <Context.Provider value={{ setPopup }}>
      <div className="Home">
        <Navbar />
        <div className="MapAndTrips">
          <Trips setIsAddTripModalOpen={setIsAddTripModalOpen} />
          <Map setIsAddStationOpen={setIsAddStationModalOpen} />
        </div>
        <ErrorModal
          isModalOpen={isErrorModalOpen}
          setIsModalOpen={setIsErrorModalOpen}
          text={popupText}
        />
        <AddTrip
          isAddTripOpen={isAddTripModalOpen}
          setIsAddTripOpen={setIsAddTripModalOpen}
        />
        <AddStation
          isAddStationModalOpen={isAddStationModalOpen}
          setIsAddStationModalOpen={setIsAddStationModalOpen}
        />
      </div>
    </Context.Provider>
  );
}
