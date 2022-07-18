import { useState, useEffect, useContext } from "react";
import Trip from "../../Utils/Interfaces/trip.interface";
import getTrips from "../../Utils/Functions/getTrips";
import TripCard from "./TripCard";
import "./Style/Trips.css";
import { Button, CircularProgress } from "@mui/material";
import Context from "../../context/context";

const length = 10;

export default function Trips(): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setPopup } = useContext(Context);

  function getTripsHandler(): void {
    setIsLoading(true);
    getTrips(length, page + 1)
      .then((data) => setTrips((pre) => [...pre, ...data.data]))
      .then(() => setIsLoading(false))
      .catch((e) => setPopup(e.response.data.message));
    setPage((pre) => pre + 1);
  }

  useEffect(() => {
    getTrips(10, 1)
      .then((data) => setTrips(data.data))
      .then(() => setIsLoading(false))
      .catch((e) => setPopup(e.response.data.message));
  }, [setPopup]);

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
        style={{ height: "40px", marginBottom: "10px" }}
      >
        {isLoading ? (
          <CircularProgress style={{ width: "20px", height: "20px" }} />
        ) : (
          "Load more trips"
        )}
      </Button>
    </div>
  );
}
