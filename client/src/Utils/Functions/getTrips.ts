import axios from "axios";

export default async function getTrips(
  length: number,
  page: number,
  from: string,
  until: string,
  filterBy: string
) {
  const fromDate = new Date(from).getTime();
  const untilDate = new Date(until).getTime();
  return await axios.get(
    `/api/trip?length=${length}&page=${page}&from=${fromDate}&until=${untilDate}&filterby=${filterBy}`
  );
}

//This function accept length- how much trips you want to get, page- which page you want to get, from- from date, until- until date, filterBy- filter by- "return" or "departure" so it can look from-until departure or return time of the trip.