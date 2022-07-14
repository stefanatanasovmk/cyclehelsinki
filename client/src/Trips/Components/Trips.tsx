import React, { useState, useEffect, useRef } from "react";
import Trip from "../../Utils/Interfaces/trip.interface";
import { v4 as uuidv4 } from "uuid";
import getTrips from "../../Utils/Functions/getTrips";
import TripCard from "./TripCard";
import "./Style/Trips.css";
import { Button } from "@mui/material";
import axios from "axios";
const length = 10;

export default function Trips(): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [trips, setTrips] = useState<Trip[]>([]);

  function getTripsHandler(): void {
    getTrips(length, page + 1).then((data) =>
      setTrips((pre) => [...pre, ...data.data])
    );
    setPage((pre) => pre + 1);
  }

  useEffect(() => {
    getTrips(10, 1)
      .then((data) => setTrips(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="Trips">
      {trips.map((e) => (
        <TripCard
          key={e._id}
          Departure={e.Departure}
          Return={e.Return}
          DeparturedStationId={e.DeparturedStationId}
          ReturnedStationId={e.ReturnedStationId}
          CoveredDistance={e.CoveredDistance}
          Duration={e.Duration}
        />
      ))}

      <Button
        fullWidth
        onClick={getTripsHandler}
        variant="outlined"
        color="error"
      >
        More trips
      </Button>
    </div>
  );
}
