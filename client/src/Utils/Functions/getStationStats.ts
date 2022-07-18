import axios from "axios";
import Station from "../Interfaces/station.interface";

interface Response {
  data: {
    averageDistance: number;
    stations: Station[];
  };
}

export default async function getMostPopular(
  stationId: string,
  type: string
): Promise<Response> {
  const data = await axios.get(
    `/api/station/getmostpopular/${stationId}/${type}`
  );
  return data;
}


