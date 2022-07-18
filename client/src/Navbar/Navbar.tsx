import { useState } from "react";
import { Button, Typography } from "@mui/material";
import "./Style/Navbar.css";
import AddTrip from "../AddData/AddTrip";

export default function Navbar(): JSX.Element {
  const [isAddTripOpen, setIsAddTripOpen] = useState<boolean>(false);
  return (
    <div className="Navbar">
      <div className="Navbar-logo">
        <Typography style={{ fontSize: "1em" }} variant="button">
          cycle helsinki
        </Typography>
      </div>
      <div className="Navbar-links">
        <Button
          style={{ height: "4vh" }}
          onClick={() => setIsAddTripOpen(true)}
          variant="contained"
          color="primary"
        >
          Add Trip
        </Button>
        {/* <Button variant="contained" color="primary">
          Add Station
        </Button> */}
      </div>
      <AddTrip
        isAddTripOpen={isAddTripOpen}
        setIsAddTripOpen={setIsAddTripOpen}
      />
    </div>
  );
}
