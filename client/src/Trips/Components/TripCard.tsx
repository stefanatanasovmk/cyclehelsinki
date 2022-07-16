import { useEffect, useState, useContext } from "react";
import getStation from "../../Utils/Functions/getStation";
import secondsToTime from "../../Utils/Functions/secondsToTime";
import "./Style/TripCard.css";
import { Card, CardContent, Typography } from "@mui/material";
import parseDate from "../../Utils/Functions/parseDate";
import TripModal from "./TripModal";
import Context from "../../context/context";
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
  const [backgroundColor, setBackgroundColor] = useState<string>("#02b2b8");
  const { setPopup } = useContext(Context);

  useEffect(() => {
    getStation(DeparturedStationId)
      .then((data) => setDepartureStation(data.Name))
      .catch((e) => setPopup(e.response.data.message));
    getStation(ReturnedStationId)
      .then((data) => setArrivalStation(data.Name))
      .catch((e) => setPopup(e.response.data.message));
  }, [DeparturedStationId, ReturnedStationId, setPopup]);
  return (
    <div className="TripCard">
      <Card
        onMouseEnter={() => setBackgroundColor("#039ba1")}
        onMouseLeave={() => setBackgroundColor("#02b2b8")}
        variant="outlined"
        style={{
          backgroundColor: backgroundColor,
          cursor: "pointer",
          boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        }}
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
