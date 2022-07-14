import axios from "axios";
export default async function getTrips(length: number, page: number) {
  return await axios.get(`/api/trip?length=${length}&page=${page}`);
}
