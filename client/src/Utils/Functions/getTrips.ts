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
