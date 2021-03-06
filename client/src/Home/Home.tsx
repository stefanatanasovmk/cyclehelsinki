import { useCallback, useState } from "react";
import Map from "../Map/Map";
import Trips from "../Trips/Trips";
import "./Style/Home.css";
import Navbar from "../Navbar/Navbar";
import Popup from "./Popup/Popup";
import AddTrip from "../AddData/AddTrip/AddTrip";
import AddStation from "../AddData/AddStation/AddStation";
import Footer from "../Footer/Footer";
import Context from "../Utils/context/context";

export default function Home(): JSX.Element {
  //Control for AddTrip and AddStation modals
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState<boolean>(false);
  const [isAddStationModalOpen, setIsAddStationModalOpen] =
    useState<boolean>(false);

  //Control for the popup
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>("");
  const [popupSeverity, setPopupSeverity] = useState<string>("");

  //Popup function that is put into Context, its in useCallback to avoid rerendering
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
        <Footer />
      </div>
    </Context.Provider>
  );
}
