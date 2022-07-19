import { useState } from "react";
import { Button, Typography } from "@mui/material";
import "./Style/Navbar.css";
import AddTrip from "../AddData/AddTrip";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

export default function Navbar(): JSX.Element {
  return (
    <div className="Navbar">
      <div className="Navbar-logo" onClick={() => window.location.reload()}>
        <span id="LogoText">Cycle Helsinki</span>
      </div>
      <div className="Navbar-links">
        {/* <Button
          onClick={() => setIsAddTripOpen(true)}
          variant="contained"
          color="primary"
        >
          Add Trip
        </Button> */}
        <Button variant="contained" color="primary">
          Add Station
        </Button>
      </div>
    
    </div>
  );
}
