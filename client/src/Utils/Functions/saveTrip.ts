import axios from "axios";

export default async function saveTrip(
  departureStation: string | undefined,
  returnStation: string | undefined,
  coveredDistance: number,
  departureTime: string,
  returnTime: string
): Promise<string> {
  const parsedDeparture = new Date(departureTime).getTime();
  const parsedReturn = new Date(returnTime).getTime();
  const duration = parsedReturn - parsedDeparture;

  return await axios.post("/api/trip/addtrip", {
    Departure: parsedDeparture,
    Return: parsedReturn,
    DeparturedStation: departureStation,
    ReturnedStation: returnStation,
    CoveredDistance: coveredDistance,
    Duration: duration,
  });
}
