import { useMap } from "react-leaflet";
import Station from "../../../../Utils/Interfaces/station.interface";
import "../Style/StationStats.css";
import Loading from "../../../../Loading/Loading";
interface Props {
  mostPopularDepartures: Station[];
  mostPopularReturns: Station[];
  setValue: (value: number) => void;
  averageDistanceDepartures: number;
  averageDistanceReturns: number;
  isLoading: boolean;
  totalNumberOfDepartureTrips: number;
  totalNumberOfReturnTrips: number;
}

export default function StationStats({
  mostPopularDepartures,
  mostPopularReturns,
  setValue,
  averageDistanceDepartures,
  averageDistanceReturns,
  isLoading,
  totalNumberOfDepartureTrips,
  totalNumberOfReturnTrips,
}: Props): JSX.Element {
  const map = useMap();
  function handleClickOnStationName(i: any, coordinates: [number, number]) {
    i.stopPropagation();
    map
      .setView([coordinates[1], coordinates[0]], 16)
      .closePopup()
      .openTooltip(`<h6>Click on the marker for more station info</h6>`, [
        coordinates[1] + 0.0002,
        coordinates[0] - 0.0001,
      ]);

    setValue(0);
  }
  return (
    <div className="StationStats">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="MostPopularDeparturesContainer"
            style={{ width: "90%" }}
          >
            <div className="StatsHeadersText">
              Total number of trips departed from this station:
              {totalNumberOfDepartureTrips}
            </div>
            <div className="StatsHeadersText">
              Average length of trips departed from this stations:
              {(averageDistanceDepartures / 1000).toFixed(2)} km.
            </div>
            <div className="StatsHeadersText">
              Most popular arrival stations for trips started at this station:
            </div>
            <ol>
              {mostPopularDepartures.map((e) => (
                <li
                  key={e._id}
                  className="StationsName"
                  onClick={(i) =>
                    handleClickOnStationName(i, e.Location.coordinates)
                  }
                >
                  {e.Name}
                </li>
              ))}
            </ol>
          </div>
          <div className="MostPopularReturnsContainer" style={{ width: "90%" }}>
            <div className="StatsHeadersText">
              Total number of trips returned to this station:
              {totalNumberOfReturnTrips}
            </div>
            <div className="StatsHeadersText">
              Average length of trips returned to this station:
              {(averageDistanceReturns / 1000).toFixed(2)} km.
            </div>
            <div className="StatsHeadersText">
              Most popular departure stations for trips that arrived at this
              station:
            </div>
            <ol>
              {mostPopularReturns.map((e) => (
                <li
                  key={e._id}
                  className="StationsName"
                  onClick={(i) =>
                    handleClickOnStationName(i, e.Location.coordinates)
                  }
                >
                  {e.Name}
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
}
