import { useState, useContext } from "react";
import { Popup } from "react-leaflet";
import "../Style/MapPopup.css";
import Buttons from "./Buttons";
import StationInfo from "./StationInfo";
import StationStats from "./StationStats";
import getMostPopular from "../../../../Utils/Functions/getStationStats";
// import {
//   getMostPopularDepartures,
//   getMostPopularReturns,
// } from "../../../../Utils/Functions/getStationStats";
import Station from "../../../../Utils/Interfaces/station.interface";
import Context from "../../../../context/context";
interface Props {
  id: string;
  Name: string;
  Osoite: string;
  Kapasiteet: string;
  bikesAvailable: string;
}

export default function MapPopup({
  id,
  Name,
  Osoite,
  Kapasiteet,
  bikesAvailable,
}: Props): JSX.Element {
  const [value, setValue] = useState(0);
  const [mostPopularDepartures, setMostPopularDepartures] = useState<Station[]>(
    []
  );
  const [averageDistanceDepartures, setAverageDistanceDepartures] =
    useState<number>(0);
  const [mostPopularReturns, setMostPopularReturns] = useState<Station[]>([]);
  const [averageDistanceReturns, setAverageDistanceReturns] =
    useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const { setPopup } = useContext(Context);

  function getMostPopularStations() {
    getMostPopular(id, "departures")
      .then((data) => {
        setMostPopularDepartures(data.data.stations);
        setAverageDistanceDepartures(data.data.averageDistance);
      })
      .then(() => setIsLoading(false))
      .catch((e) => setPopup(e.response.data.message));
    getMostPopular(id, "returns")
      .then((data) => {
        setMostPopularReturns(data.data.stations);
        setAverageDistanceReturns(data.data.averageDistance);
      })
      .then(() => setIsLoading(false))
      .catch((e) => setPopup(e.response.data.message));
  }

  return (
    <Popup>
      <Buttons
        setValue={setValue}
        getMostPopularStations={getMostPopularStations}
      />
      {value === 0 ? (
        <StationInfo
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
        />
      )}
    </Popup>
  );
}
