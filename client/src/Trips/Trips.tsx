import { useState, useEffect, useContext, useCallback } from "react";
import Trip from "../Utils/Interfaces/trip.interface";
import getTrips from "../Utils/Functions/getTrips";
import TripCard from "./TripCard";
import "./Style/Trips.css";
import { Button, CircularProgress } from "@mui/material";
import Context from "../Utils/context/context";
import FilterByTime from "./FilterByTime";
import SwitchComponent from "./SwitchComponent";
import Loading from "../Loading/Loading";

interface Props {
  setIsAddTripModalOpen: (isErrorModalOpen: boolean) => void;
}

export default function Trips({ setIsAddTripModalOpen }: Props): JSX.Element {
  // Page and length of the page of trips, it's necessary for pagination
  const [page, setPage] = useState<number>(1);
  const length = 10;

  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // From which date to search for trips
  const [from, setFrom] = useState(
    new Date("May 01 2021 03:01:01 GMT+0300 (Eastern European Summer Time)")
      .toISOString()
      .slice(-0, -8)
  );

  //Date.now().toIsoString() returns a time that is 3 timezones behind Helsinki time, that's why + 10800000 miliseconds are added
  // Until which date to search for trips
  const [until, setUntil] = useState(
    new Date(Date.now() + 10800000).toISOString().slice(-0, -8)
  );
  //By what to search the dates for trips, by "return" or "departure"
  const [filterBy, setFilterBy] = useState("return");
  //Following the state of the switch component, are filration inputs open or closed
  const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);

  const { setPopup } = useContext(Context);

  //This is for the search buttons in FilterByTime component, it's a useCallback hook to avoid unnecessary rerenders
  const getTripsHandler = useCallback(() => {
    setIsLoading(true);
    getTrips(length, 1, from, until, filterBy)
      .then((data) => setTrips(data.data))
      .catch((e) => setPopup(e.response.data.message, "error"))
      .finally(() => {
        setPage(1);
        setIsLoading(false);
      });
  }, [filterBy, from, setPopup, until]);

  //For loading more trips button at the end of this component
  function getMoreTripsHandler() {
    setIsLoading(true);
    getTrips(length, page + 1, from, until, filterBy)
      .then((data) => setTrips((pre) => [...pre, ...data.data]))
      .catch((e) => setPopup(e.response.data.message, "error"))
      .finally(() => setIsLoading(false));
    setPage((pre) => pre + 1);
  }

  //Fetching the trips from the server on the component mount
  useEffect(() => {
    getTrips(
      10,
      1,
      "2021-05-01T00:01",
      new Date(Date.now() + 10800000).toISOString().slice(-0, -8),
      "return"
    )
      .then((data) => setTrips(data.data))
      .catch((e) => setPopup(e.response.data.message, "error"))
      .finally(() => setIsLoading(false));
  }, [setPopup]);

  return (
    <div className="Trips">
      {/* Add trip Button which opens AddTrip Modal */}
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
      {/* Switch button for opening the filtering date inputs */}
      <SwitchComponent
        label="Filter trips by time"
        value={areFiltersOpen}
        setValue={setAreFiltersOpen}
        labelPlacement={"end"}
        style={{ marginRight: "0px" }}
      />
      {/* Date inputs which are open when areFiltersOpen is true */}
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

      {/* The trip card */}
      {isLoading ? (
        <Loading />
      ) : (
        trips.map((e) => (
          <TripCard
            key={e._id}
            Departure={e.Departure}
            Return={e.Return}
            DeparturedStationId={e.DeparturedStationId}
            ReturnedStationId={e.ReturnedStationId}
            CoveredDistance={e.CoveredDistance}
            Duration={e.Duration}
          />
        ))
      )}
      
      {/* Load more trips button, it's only shown if there is trips in trips array */}
      {trips.length !== 0 && (
        <Button
          fullWidth
          onClick={getMoreTripsHandler}
          variant="outlined"
          color="error"
          style={{ height: "40px", marginBottom: "6vh", marginTop: "1vh" }}
        >
          {isLoading ? (
            <CircularProgress style={{ width: "20px", height: "20px" }} />
          ) : (
            "Load more trips"
          )}
        </Button>
      )}
    </div>
  );
}
