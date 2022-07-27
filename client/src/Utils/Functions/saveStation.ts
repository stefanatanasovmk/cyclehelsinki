import axios from "axios";

export default async function saveStation(
  howCoordinatesAreEntered: string,
  stationName: string,
  customAddress: string,
  city: string,
  operator: string,
  capacity: string,
  long: string,
  lat: string,
  selectedAddress: any
) {
  if (howCoordinatesAreEntered === "addressSearch") {
    const { label, x, y } = selectedAddress;
    return axios.post("/api/station/addstation", {
      Nimi: stationName,
      Namn: stationName,
      Name: stationName,
      Osoite: label.split(",")[0],
      Adress: label.split(",")[0],
      Kaupunki: city,
      Stad: city,
      Operaattor: operator,
      Kapasiteet: capacity,
      Location: {
        type: "Point",
        coordinates: [x, y],
      },
    });
  } else if (howCoordinatesAreEntered === "customAddress") {
    return axios.post("/api/station/addstation", {
      Nimi: stationName,
      Namn: stationName,
      Name: stationName,
      Osoite: customAddress,
      Adress: customAddress,
      Kaupunki: city,
      Stad: city,
      Operaattor: operator,
      Kapasiteet: capacity,
      Location: {
        type: "Point",
        coordinates: [+lat.replace(/,/, "."), +long.replace(/,/, ".")],
      },
    });
  }
}
