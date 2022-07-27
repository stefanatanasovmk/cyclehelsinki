import { useState, useContext } from "react";
import { Popup } from "react-leaflet";
import "./Style/MapPopup.css";
import Buttons from "./Buttons";
import StationInfo from "./StationInfo";
import StationStats from "./StationStats";
import getStationStats from "../../Utils/Functions/getStationStats";
import Station from "../../Utils/Interfaces/station.interface";
import Context from "../../Utils/context/context";

interface Props {
  id: string;
  Name: string;
  Osoite: string;
  Kapasiteet: string;
  bikesAvailable: string;
  getDirections: () => void;
}

export default function MapPopup({
  id,
  Name,
  Osoite,
  Kapasiteet,
  bikesAvailable,
  getDirections,
}: Props): JSX.Element {
  //Value is representing which of, StationInfo or StationStats is visible. 0 is StationInfo, 1 is StationStats.
  const [value, setValue] = useState(0);

  //Array of the most popular departure stations for trips that arrived at the the station which popup is currently open.
  const [mostPopularDepartures, setMostPopularDepartures] = useState<Station[]>(
    []
  );
  //Average distance of all the departures from the station which popup is currently open.
  const [averageDistanceDepartures, setAverageDistanceDepartures] =
    useState<number>(0);
  //Total number of departures from the station which popup is currently open.
  const [totalNumberOfDepartureTrips, setTotalNumberOfDepartureTrips] =
    useState<number>(0);
  //Array of most popular return stations for trips that departure from the station which popup is currently open.
  const [mostPopularReturns, setMostPopularReturns] = useState<Station[]>([]);
  //Average distance of all the returns from the station which popup is currently open.
  const [averageDistanceReturns, setAverageDistanceReturns] =
    useState<number>(0);
  //Total number of returns from the station which popup is currently open.
  const [totalNumberOfReturnTrips, setTotalNumberOfReturnTrips] =
    useState<number>(0);

  const [isLoading, setIsLoading] = useState(true);

  const { setPopup } = useContext(Context);

  //Function that is called when the user click on "STATS" button on the popup.
  function getMostPopularStations() {
    getStationStats(id, "departures")
      .then((data) => {
        setMostPopularDepartures(data.data.stations);
        setAverageDistanceDepartures(data.data.averageDistance);
        setTotalNumberOfDepartureTrips(data.data.totalNumberOfTrips);
      })
      .then(() => setIsLoading(false))
      .catch((e) => setPopup(e.response.data.message, "error"));

    getStationStats(id, "returns")
      .then((data) => {
        setMostPopularReturns(data.data.stations);
        setAverageDistanceReturns(data.data.averageDistance);
        setTotalNumberOfReturnTrips(data.data.totalNumberOfTrips);
      })
      .then(() => setIsLoading(false))
      .catch((e) => setPopup(e.response.data.message, "error"));
  }

  return (
    <Popup>
      <Buttons
        getDirections={getDirections}
        value={value}
        setValue={setValue}
        getMostPopularStations={getMostPopularStations}
        bikesAvailable={bikesAvailable}
      />
      {value === 0 ? (
        <StationInfo
          getDirections={getDirections}
          Name={Name}
          Osoite={Osoite}
          Kapasiteet={Kapasiteet}
          bikesAvailable={bikesAvailable}
        />
      ) : (
        <StationStats
          mostPopularDepartures={mostPopularDepartures}
          mostPopularReturns={mostPopularReturns}
          setValue={setValue}
          averageDistanceDepartures={averageDistanceDepartures}
          averageDistanceReturns={averageDistanceReturns}
          isLoading={isLoading}
          totalNumberOfDepartureTrips={totalNumberOfDepartureTrips}
          totalNumberOfReturnTrips={totalNumberOfReturnTrips}
        />
      )}
    </Popup>
  );
}
