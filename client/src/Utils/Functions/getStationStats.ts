import axios from "axios";
import Station from "../Interfaces/station.interface";

interface Response {
  data: {
    averageDistance: number;
    stations: Station[];
  };
}

export async function getMostPopularDepartures(
  stationId: string
): Promise<Response> {
  const data = await axios.get(
    `/api/station/getmostpopulardepartures/${stationId}`
  );
  return data;
}

export async function getMostPopularReturns(stationId: string) {
  const data = await axios.get(
    `/api/station/getmostpopularreturns/${stationId}`
  );
  return data;
}
