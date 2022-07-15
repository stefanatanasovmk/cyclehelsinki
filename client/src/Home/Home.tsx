import { useState } from "react";
import Map from "../Map/Components/Map";
import Trips from "../Trips/Components/Trips";
import "./Style/Home.css";
import Navbar from "../Navbar/Navbar";
import ErrorModal from "./ErrorModal/ErrorModal";
import Context from "../context/context";
export default function Home(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>("");

  function setPopup(text: string): void {
    setPopupText(text);
    setIsModalOpen(true);
  }
  return (
    <Context.Provider value={{ setPopup }}>
      <div className="Home">
        <Navbar />
        <div className="MapAndTrips">
          <Trips />
          <Map />
        </div>
        <ErrorModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          text={popupText}
        />
      </div>
    </Context.Provider>
  );
}
