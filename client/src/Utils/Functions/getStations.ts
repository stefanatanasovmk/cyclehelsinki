import axios from "axios";

export default async function getStations() {
  return axios.get("/api/station");
}
