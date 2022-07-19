import stationModel from "../resources/station/station.model";
import mongoose from "mongoose";
import csv from "csv-parser";
import fs from "fs";
import { config } from "dotenv";
import addMissingStation from "./insertMissingStation";
config({ path: "../../.env" });

//To execute the file use "node insertStation.js" command, first you will need to point MONGO_DB_PATH to your MongoDB connection. Reading and saving the stations doesn't requre too much time. The process will exit automaticlly from the script when it ends.

const mongoDbPath = process.env.MONGO_DB_PATH;
let stations: any = [];
let path = "../../../csv-files/stations.csv";

fs.createReadStream(path)
  .pipe(
    csv({
      skipLines: 1,
      headers: [
        "FID",
        "ID",
        "Nimi",
        "Namn",
        "Name",
        "Osoite",
        "Adress",
        "Kaupunki",
        "Stad",
        "Operaattor",
        "Kapasiteet",
        "x",
        "y",
      ],
    })
  )
  .on("data", (data) => stations.push(data))
  .on("end", async () => {
    try {
      let start = new Date().getTime();
      for (let e of stations) {
        const newStation = new stationModel({
          _id: e.ID,
          Nimi: e.Nimi,
          Namn: e.Namn,
          Name: e.Name,
          Osoite: e.Osoite,
          Adress: e.Adress,
          Kaupunki: e.Kaupunki,
          Stad: e.Stad,
          Operaattor: e.Operaattor,
          Kapasiteet: e.Kapasiteet,
        });
        newStation.Location.coordinates.push(+e.x, +e.y);
        await newStation.save();
      }
      let end = new Date().getTime();
      console.log("It took:", ((end - start) / 60000).toFixed(2), "minutes.");
      process.exit();
    } catch (e) {
      console.log("Something went wrong:", e);
    }
  });

addMissingStation();

mongoose.connect(`${mongoDbPath}`);
