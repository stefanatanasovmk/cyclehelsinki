import React, { useCallback } from "react";
import Map from "../Map/Components/Map";
import Trips from "../Trips/Components/Trips";
import "./Style/Home.css";
import Navbar from "../Navbar/Navbar";
import ErrorModal from "./ErrorModal/ErrorModal";
import Context from "../context/context";
export default function Home(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [errorText, setErrorText] = React.useState<string>("");

  function setError(text: string): void {
    setErrorText(text);
    setIsModalOpen(true);
  }

  return (
    <Context.Provider value={{ setError }}>
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
    </Context.Provider>
  );
}
