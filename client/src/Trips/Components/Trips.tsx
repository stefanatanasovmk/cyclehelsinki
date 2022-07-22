import { useState, useEffect, useContext, useCallback } from "react";
import Trip from "../../Utils/Interfaces/trip.interface";
import getTrips from "../../Utils/Functions/getTrips";
import TripCard from "./TripCard";
import "./Style/Trips.css";
import { Button, CircularProgress } from "@mui/material";
import Context from "../../Utils/context/context";
import FilterByTime from "./FilterByTime";
import SwitchComponent from "./SwitchComponent";

interface Props {
  setIsAddTripModalOpen: (isErrorModalOpen: boolean) => void;
}

const length = 10;

export default function Trips({ setIsAddTripModalOpen }: Props): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [from, setFrom] = useState(
    new Date("May 01 2021 03:01:01 GMT+0300 (Eastern European Summer Time)")
      .toISOString()
      .slice(-0, -8)
  );

  //Date.now().toIsoString() returns a time that is 3 timezones behind Helsinki time, that's why + 10800000 miliseconds are added
  const [until, setUntil] = useState(
    new Date(Date.now() + 10800000).toISOString().slice(-0, -8)
  );
  const [filterBy, setFilterBy] = useState("return");
  const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);

  const { setPopup } = useContext(Context);

  const getTripsHandler = useCallback(() => {
    setIsLoading(true);
    getTrips(length, 1, from, until, filterBy)
      .then((data) => setTrips(data.data))
      .then(() => setIsLoading(false))
      .catch((e) => setPopup(e.response.data.message, "error"));
  }, [filterBy, from, setPopup, until]);

  function getMoreTripsHandler(): void {
    setIsLoading(true);
    getTrips(length, page + 1, from, until, filterBy)
      .then((data) => setTrips((pre) => [...pre, ...data.data]))
      .then(() => setIsLoading(false))
      .catch((e) => setPopup(e.response.data.message, "error"));
    setPage((pre) => pre + 1);
  }

  useEffect(() => {
    function getTripsOnMount() {
      getTrips(
        10,
        1,
        "2021-05-01T00:01",
        new Date(Date.now() + 10800000).toISOString().slice(-0, -8),
        "return"
      )
        .then((data) => setTrips(data.data))
        .then(() => setIsLoading(false))
        .catch((e) => setPopup(e.response.data.message, "error"));
    }
    getTripsOnMount();
  }, [setPopup]);

  return (
    <div className="Trips">
      <Button
        fullWidth
        onClick={() => setIsAddTripModalOpen(true)}
        style={{
          height: "40px",
          marginBottom: "1vh",
        }}
        variant="contained"
        color="primary"
      >
        Add Trip
      </Button>
      <SwitchComponent
        label="Filter trips by time"
        value={areFiltersOpen}
        setValue={setAreFiltersOpen}
        labelPlacement={"end"}
        style={{ marginRight: "0px" }}
      />
      {areFiltersOpen && (
        <FilterByTime
          from={from}
          setFrom={setFrom}
          until={until}
          setUntil={setUntil}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          getTripsHandler={getTripsHandler}
          isLoading={isLoading}
        />
      )}

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
        onClick={getMoreTripsHandler}
        variant="outlined"
        color="error"
        style={{ height: "40px", marginBottom: "6vh" }}
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
