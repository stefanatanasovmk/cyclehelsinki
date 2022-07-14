// useEffect(() => {
//   fetch("/api/station")
//     .then((res) => res.json())
//     .then((res) => setStations(res))
//     .then(() => setLoading(false))
//     .catch((e) => console.log(e));
// }, []);

import axios from "axios";

export default async function getStations() {
  return axios.get("/api/station");
}
