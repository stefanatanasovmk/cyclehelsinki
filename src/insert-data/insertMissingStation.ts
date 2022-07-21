import stationModel from "../resources/station/station.model";

export default async function addMissingStation() {
  try {
    const newStation = new stationModel({
      _id: "997",
      Nimi: "Workshop Helsinki",
      Namn: "Workshop Helsinki",
      Name: "Workshop Helsinki",
    });
    newStation.Location.coordinates.push(24.830319, 60.15582);
    await newStation.save();
  } catch (e) {
    console.log("Something went wrong:", e);
  }
}

