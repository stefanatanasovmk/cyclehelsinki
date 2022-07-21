import stationModel from "../resources/station/station.model";

export default async function addMissingStation() {
  try {
    const newStation = new stationModel({
      _id: "997",
      Nimi: "Workshop Helsinki",
      Namn: "Workshop Helsinki",
      Name: "Workshop Helsinki",
    });
    newStation.Location.coordinates.push(24.960005, 60.275813);
    await newStation.save();
    const newStation2 = new stationModel({
      _id: "754",
      Nimi: "Lintumetsä",
      Namn: "Lintumetsä",
      Name: "Lintumetsä",
      Osoite: "Lintulaaksontie 10",
      Adress: "Lintulaaksontie 10",
      Kaupunki: "Espoo",
      Stad: "Esbo",
    });
    newStation2.Location.coordinates.push(24.82354, 60.23584);
    await newStation2.save();
  } catch (e) {
    console.log("Something went wrong:", e);
  }
}
