import { useCallback, useState } from "react";
import Map from "../Map/Components/Map";
import Trips from "../Trips/Components/Trips";
import "./Style/Home.css";
import Navbar from "../Navbar/Navbar";
import Popup from "./Popup/Popup";
import Context from "../context/context";
import AddTrip from "../AddData/AddTrip/AddTrip";
import AddStation from "../AddData/AddStation/AddStation";
export default function Home(): JSX.Element {
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState<boolean>(false);
  const [isAddStationModalOpen, setIsAddStationModalOpen] =
    useState<boolean>(false);

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>("");
  const [popupSeverity, setPopupSeverity] = useState<string>("");

  const setPopup = useCallback((text: string, severity: string): void => {
    setPopupText(text);
    setIsPopupOpen(true);
    setPopupSeverity(severity);
  }, []);
  return (
    <Context.Provider value={{ setPopup }}>
      <div className="Home">
        <Navbar />
        <div className="MapAndTrips">
          <Trips setIsAddTripModalOpen={setIsAddTripModalOpen} />
          <Map setIsAddStationOpen={setIsAddStationModalOpen} />
        </div>
        <Popup
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          text={popupText}
          severity={popupSeverity}
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
