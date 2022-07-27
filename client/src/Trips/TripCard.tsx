import { useEffect, useState, useContext } from "react";
import getStation from "../Utils/Functions/getStation";
import secondsToTime from "../Utils/Functions/secondsToTime";
import "./Style/TripCard.css";
import { Card, CardContent, Typography } from "@mui/material";
import parseDate from "../Utils/Functions/parseDate";
import Context from "../Utils/context/context";

interface Props {
  Departure: number;
  Return: number;
  DeparturedStationId: string;
  ReturnedStationId: string;
  CoveredDistance: number;
  Duration: number;
}

export default function TripCard({
  Departure,
  Return,
  DeparturedStationId,
  ReturnedStationId,
  CoveredDistance,
  Duration,
}: Props): JSX.Element {
  const [departureStation, setDepartureStation] = useState<string>("");
  const [arrivalStation, setArrivalStation] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#e8e8e8");
  const { setPopup } = useContext(Context);

  useEffect(() => {
    getStation(DeparturedStationId)
      .then((data) => setDepartureStation(data.Name))
      .catch((e) => setPopup(e.response.data.message, "error"));
    getStation(ReturnedStationId)
      .then((data) => setArrivalStation(data.Name))
      .catch((e) => setPopup(e.response.data.message, "error"));
  }, [DeparturedStationId, ReturnedStationId, setPopup]);
  return (
    <div className="TripCard">
      <Card
        onMouseEnter={() => setBackgroundColor("#bab8b8")}
        onMouseLeave={() => setBackgroundColor("#e8e8e8")}
        variant="outlined"
        style={{
          backgroundColor: backgroundColor,
          boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        }}
      >
        <CardContent>
          <Typography variant="subtitle2">
            Departured: {parseDate(Departure)}
          </Typography>
          <Typography variant="subtitle2">
            Returned: {parseDate(Return)}
          </Typography>
          <Typography variant="subtitle2">
            Departure station: {departureStation}
          </Typography>
          <Typography variant="subtitle2">
            Return station: {arrivalStation}
          </Typography>
          <Typography variant="subtitle2">
            Covered distance: {(CoveredDistance / 1000).toFixed(2)} km.
          </Typography>
          <Typography variant="subtitle2">
            Duration: {secondsToTime(Duration)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
