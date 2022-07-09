import tripModel from "../resources/trip/trip.model";
import stationModel from "../resources/station/station.model";
import Trip from "../resources/trip/trip.interface";
import mongoose, { mongo } from "mongoose";
import csv from "csv-parser";
import fs from "fs";
import { config } from "dotenv";
config({ path: "../../.env" });

//To execute the file use "node insertStation.js" command, first you will need to point MONGO_DB_PATH to your MongoDB connection. Reading and saving the trips will require much of time time. The process will log in the console every newTrip that will make and will exit automaticlly from the script when it ends. The process will save 100.000 trips at a time, and whatever of newTrips are made and not save, will save them before exit of the process.

const mongoDbPath = process.env.MONGO_DB_PATH;

const firstTrips: any = [];

fs.createReadStream("../../csv-files/2021-07.csv")
  .pipe(
    csv({
      skipLines: 1,
      headers: [
        "Departure",
        "Return",
        "DepartureStationId",
        "DepartureStationName",
        "ReturnStationId",
        "ReturnStationName",
        "CoveredDistance",
        "Duration",
      ],
    })
  )
  .on("data", (data) => firstTrips.push(data))
  .on("end", async () => {
    let allTrips: Trip[] = [];
    let start = new Date().getTime();
    for (let i of firstTrips) {
      if (i.CoveredDistance > 9 && i.Duration > 9) {
        const stationDepartedFrom = await stationModel.findOne({
          OldID: parseInt(i.DepartureStationId),
        });
        const stationReturnedTo = await stationModel.findOne({
          OldID: parseInt(i.ReturnStationId),
        });

        let departureDateAndTime = new Date(i.Departure);
        let returnDateAndTime = new Date(i.Return);
        const newTrip = new tripModel({
          Departure: departureDateAndTime.getTime(),
          Return: returnDateAndTime.getTime(),
          CoveredDistance: parseInt(i.CoveredDistance),
          Duration: parseInt(i.Duration),

          ReturnedStation: stationReturnedTo && stationReturnedTo._id,
          DeparturedStation: stationDepartedFrom && stationDepartedFrom._id,
        });
        allTrips.push(newTrip);

        if (stationDepartedFrom) {
          stationDepartedFrom.TripsDepartedFrom.push(newTrip._id);
          await stationDepartedFrom.save();
        }
        if (stationReturnedTo) {
          stationReturnedTo.TripReturnedTo.push(newTrip._id);
          await stationReturnedTo?.save();
        }
        if (allTrips.length === 100000) {
          await tripModel.insertMany(allTrips);
          allTrips = [];
        }
        console.log("Created new trip:", newTrip);
      }
    }
    await tripModel.insertMany(allTrips);
    let end = new Date().getTime();
    console.log("It took:", ((end - start) / 60000).toFixed(2), "minutes.");
    process.exit();
  });

mongoose.connect(`${mongoDbPath}`);
