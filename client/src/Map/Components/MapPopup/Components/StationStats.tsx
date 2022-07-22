import { useMap } from "react-leaflet";
import Station from "../../../../Utils/Interfaces/station.interface";
import "../Style/StationStats.css";
import Loading from "../../../../Loading/Loading";
import { Typography } from "@mui/material";

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

const headersStyle = { marginBottom: "1vh" };

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
            <Typography align="left" variant="subtitle2" style={headersStyle}>
              Total number of trips departed from this station:
              {totalNumberOfDepartureTrips}
            </Typography>
            <Typography align="left" variant="subtitle2" style={headersStyle}>
              Average length of trips departed from this stations:
              {(averageDistanceDepartures / 1000).toFixed(2)} km.
            </Typography>
            <Typography align="left" variant="subtitle2" style={headersStyle}>
              Most popular arrival stations for trips started at this station:
            </Typography>

            {mostPopularDepartures.map((e, i) => (
              <Typography
                align="left"
                fontSize="small"
                key={e._id}
                className="StationsName"
                onClick={(i) =>
                  handleClickOnStationName(i, e.Location.coordinates)
                }
              >
                {i + 1 + ". " + e.Name}
              </Typography>
            ))}
          </div>
          <div className="MostPopularReturnsContainer" style={{ width: "90%" }}>
            <Typography align="left" variant="subtitle2" style={headersStyle}>
              Total number of trips returned to this station:
              {totalNumberOfReturnTrips}
            </Typography>
            <Typography align="left" variant="subtitle2" style={headersStyle}>
              Average length of trips returned to this station:
              {(averageDistanceReturns / 1000).toFixed(2)} km.
            </Typography>
            <Typography align="left" variant="subtitle2" style={headersStyle}>
              Most popular departure stations for trips that arrived at this
              station:
            </Typography>
            {mostPopularReturns.map((e, i) => (
              <Typography
                align="left"
                fontSize="small"
                key={e._id}
                className="StationsName"
                onClick={(i) =>
                  handleClickOnStationName(i, e.Location.coordinates)
                }
              >
                {i + 1 + ". " + e.Name}
              </Typography>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
