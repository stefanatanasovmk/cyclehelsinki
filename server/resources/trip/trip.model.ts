import { Schema, model } from "mongoose";
import Trip from "./trip.interface";

const TripSchema = new Schema({
  Departure: {
    type: Number,
  },
  Return: {
    type: Number,
  },
  DeparturedStationId: {
    type: String,
  },
  ReturnedStationId: {
    type: String,
  },
  CoveredDistance: Number,
  Duration: Number,
});

export default model<Trip>("Trip", TripSchema);
