import tripModel from "../resources/trip/trip.model";
import stationModel from "../resources/station/station.model";
import Trip from "../resources/trip/trip.interface";
import csv from "csv-parser";
import fs from "fs";

//This is the function that is extracted and executed in insertTrips.js. It require a path string to the trip csv file which you want to save in the database

export default function insertTrip(filePath: string) {
  const firstTrips: any = [];

  fs.createReadStream(filePath)
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
          let departureDateAndTime = new Date(i.Departure);
          let returnDateAndTime = new Date(i.Return);
          const newTrip = new tripModel({
            Departure: departureDateAndTime.getTime(),
            Return: returnDateAndTime.getTime(),
            CoveredDistance: parseInt(i.CoveredDistance),
            Duration: parseInt(i.Duration),
            ReturnedStationId: i.ReturnStationId,
            DeparturedStationId: i.DepartureStationId,
          });
          allTrips.push(newTrip);
          console.log("Created new trip:", newTrip);
          if (allTrips.length === 10000) {
            await tripModel.insertMany(allTrips);
            allTrips = [];
          }
        }
      }
      await tripModel.insertMany(allTrips);
      let end = new Date().getTime();
      console.log(
        "To read an save ",
        filePath,
        " it took: ",
        ((end - start) / 60000).toFixed(2),
        " minutes. Press Ctrl + C to exit."
      );
    });
}
