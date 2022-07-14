import React, { useCallback } from "react";
import Map from "../Map/Components/Map";
import Trips from "../Trips/Components/Trips";
import "./Style/Home.css";
import Navbar from "../Navbar/Navbar";
import ErrorModal from "./ErrorModal/ErrorModal";
import AppContext from "../context/context";
export default function Home(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [errorText, setErrorText] = React.useState<string>("");

  function setError(text: string): void {
    setErrorText(text);
    setIsModalOpen(true);
  }

  return (
    <AppContext.Provider value={{ setError }}>
      <div className="Home">
        <Navbar />
        <div className="MapAndTrips">
          <Trips />
          <Map />
        </div>
        <ErrorModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          text={errorText}
        />
      </div>
    </AppContext.Provider>
  );
}
