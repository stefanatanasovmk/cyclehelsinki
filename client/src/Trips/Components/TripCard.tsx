import { useEffect, useState } from "react";
import getStation from "../../Utils/Functions/getStation";
import secondsToTime from "../../Utils/Functions/secondsToTime";
import "./Style/TripCard.css";
import { Card, CardContent, Typography, Modal } from "@mui/material";
import parseDate from "../../Utils/Functions/parseDate";
import TripModal from "./TripModal";
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    getStation(DeparturedStationId)
      .then((data) => setDepartureStation(data.Name))
      .catch((err) => setDepartureStation("We could not find the station"));
    getStation(ReturnedStationId)
      .then((data) => setArrivalStation(data.Name))
      .catch((err) => setArrivalStation("We could not find the station"));
  }, [DeparturedStationId, ReturnedStationId]);
  return (
    <div className="TripCard">
      <Card
        variant="outlined"
        style={{ backgroundColor: "#94B4F3", cursor: "pointer" }}
        onClick={() =>
          isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)
        }
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
            Covered distance: {CoveredDistance} m.
          </Typography>
          <Typography variant="subtitle2">
            Duration: {secondsToTime(Duration)}
          </Typography>
        </CardContent>
      </Card>
      <TripModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        departureTime={parseDate(Departure)}
        returnTime={parseDate(Return)}
        departureStation={departureStation}
        arrivalStation={arrivalStation}
        CoveredDistance={CoveredDistance}
        Duration={Duration}
      />
    </div>
  );
}
