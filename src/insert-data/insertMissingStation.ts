// import mongoose from "mongoose";
// import { config } from "dotenv";
import stationModel from "../resources/station/station.model";
// config({ path: "../../.env" });
// const mongoDbPath = process.env.MONGO_DB_PATH;

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

// mongoose.connect(`${mongoDbPath}`);
